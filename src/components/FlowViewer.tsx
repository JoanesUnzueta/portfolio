import { useEffect, useRef } from "react";
import { asset } from "../asset";
import { flowChairName } from "../projects";

const posterPath = "images/web/flow-render-transparent-1.webp";
const modelPath = "models/flow-chair-parts.glb";
const alt = `Interactive 3D model of the ${flowChairName}. Drag to orbit, scroll to zoom, or explode the plywood pieces.`;

export function FlowViewer() {
  const host = useRef<HTMLDivElement>(null);
  const range = useRef<HTMLInputElement>(null);
  const api = useRef<{ setExplode: (value: number) => void; animateTo: (value: number) => void } | null>(
    null,
  );

  useEffect(() => {
    const node = host.current;
    if (!node) return;
    let stopped = false;
    let dispose = () => {};

    const start = () => {
      void (async () => {
        const THREE = await import("three");
        const { GLTFLoader } = await import("three/addons/loaders/GLTFLoader.js");
        const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");
        if (stopped) return;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(node.clientWidth, node.clientHeight);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.domElement.style.opacity = "0";
        node.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(34, node.clientWidth / node.clientHeight, 0.01, 20);
        camera.position.set(1.15, 0.72, 1.35);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.target.set(0, 0.05, 0);
        controls.autoRotate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        controls.autoRotateSpeed = 0.7;

        scene.add(new THREE.AmbientLight(0xfff6ec, 0.42));
        scene.add(new THREE.HemisphereLight(0xfff8f0, 0xc8b49a, 0.55));
        const key = new THREE.DirectionalLight(0xfff3e4, 2.4);
        key.position.set(2.4, 4.2, 3.1);
        scene.add(key);
        const fill = new THREE.DirectionalLight(0xdfe7f2, 0.7);
        fill.position.set(-2.6, 1.4, -1.8);
        scene.add(fill);

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const pieces: { object: any; origin: any; offset: any }[] = [];
        let explode = 0;
        let frame = 0;
        let anim = 0;
        let frameModel: (() => void) | null = null;

        const apply = (value: number) => {
          explode = value;
          if (range.current) range.current.value = String(value);
          for (const piece of pieces) {
            piece.object.position.copy(piece.origin).addScaledVector(piece.offset, value);
          }
          frameModel?.();
        };

        const setExplode = (value: number) => {
          cancelAnimationFrame(anim);
          apply(value);
        };

        const animateTo = (target: number) => {
          cancelAnimationFrame(anim);
          if (reduce) {
            apply(target);
            return;
          }
          const from = explode;
          const startTime = performance.now();
          const duration = 900;
          const tick = (now: number) => {
            const t = Math.min(1, (now - startTime) / duration);
            const eased = t < 0.5 ? 2 * t * t : 1 - ((-2 * t + 2) ** 2) / 2;
            apply(from + (target - from) * eased);
            if (t < 1) anim = requestAnimationFrame(tick);
          };
          anim = requestAnimationFrame(tick);
        };

        api.current = { setExplode, animateTo };

        const gltf = await new GLTFLoader().loadAsync(asset(modelPath));
        if (stopped) return;
        const root = gltf.scene;
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        root.position.sub(center);
        scene.add(root);

        root.updateMatrixWorld(true);
        const centeredAxes = [0, 0, 0];
        root.traverse((child: any) => {
          if (!(child instanceof THREE.Mesh)) return;
          const pieceBox = new THREE.Box3().setFromObject(child);
          const pieceCenter = pieceBox.getCenter(new THREE.Vector3());
          const pieceSize = pieceBox.getSize(new THREE.Vector3());
          // Separate each board along its thinnest axis so the exploded view
          // stays organized around the assembled chair instead of scattering radially.
          const thicknessAxis =
            pieceSize.x < pieceSize.y && pieceSize.x < pieceSize.z
              ? 0
              : pieceSize.y < pieceSize.z
                ? 1
                : 2;
          let sign = Math.sign(pieceCenter.getComponent(thicknessAxis));
          if (Math.abs(pieceCenter.getComponent(thicknessAxis)) < 0.035) {
            sign = centeredAxes[thicknessAxis]++ % 2 === 0 ? 1 : -1;
          }
          const direction = new THREE.Vector3();
          direction.setComponent(thicknessAxis, sign || 1);
          direction.y += thicknessAxis === 1 ? 0 : 0.12;
          direction.normalize();
          const travel = Math.min(0.3, Math.max(0.12, pieceSize.length() * 0.3));
          const worldOffset = direction.multiplyScalar(travel);
          const exploded = child.position.clone();
          if (child.parent) {
            const target = child.getWorldPosition(new THREE.Vector3()).add(worldOffset);
            child.parent.worldToLocal(target);
            exploded.copy(target);
          } else {
            exploded.add(worldOffset);
          }
          pieces.push({
            object: child,
            origin: child.position.clone(),
            offset: exploded.sub(child.position),
          });
        });

        const fit = Math.max(size.x, size.y, size.z);
        camera.position.set(fit * 2.4, fit * 1.15, fit * 2.6);
        controls.target.set(0, 0, 0);
        controls.update();
        frameModel = () => {
          root.updateMatrixWorld(true);
          const bounds = new THREE.Box3().setFromObject(root);
          const boundsSize = bounds.getSize(new THREE.Vector3());
          const center = bounds.getCenter(new THREE.Vector3());
          const radius = boundsSize.length() * 0.5;
          const verticalFov = (camera.fov * Math.PI) / 180;
          const horizontalFov = 2 * Math.atan(Math.tan(verticalFov * 0.5) * camera.aspect);
          const requiredDistance =
            (radius / Math.sin(Math.min(verticalFov, horizontalFov) * 0.5)) * 1.2;
          const viewDirection = camera.position.clone().sub(controls.target).normalize();
          const distance = Math.max(camera.position.distanceTo(controls.target), requiredDistance);
          controls.target.copy(center);
          camera.position.copy(center).addScaledVector(viewDirection, distance);
          controls.update();
        };
        apply(explode);
        renderer.domElement.style.opacity = "1";
        node.querySelector("img")?.remove();

        const onResize = () => {
          if (!node.clientWidth || !node.clientHeight) return;
          camera.aspect = node.clientWidth / node.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(node.clientWidth, node.clientHeight);
          frameModel?.();
        };
        const observer = new ResizeObserver(onResize);
        observer.observe(node);
        node.addEventListener("pointerdown", () => {
          controls.autoRotate = false;
        });

        const loop = () => {
          frame = requestAnimationFrame(loop);
          controls.update();
          renderer.render(scene, camera);
        };
        loop();

        dispose = () => {
          cancelAnimationFrame(frame);
          cancelAnimationFrame(anim);
          observer.disconnect();
          controls.dispose();
          renderer.dispose();
          renderer.domElement.remove();
          api.current = null;
        };
      })();
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          start();
          io.disconnect();
        }
      },
      { rootMargin: "480px" },
    );
    io.observe(node);

    return () => {
      stopped = true;
      io.disconnect();
      dispose();
    };
  }, []);

  return (
    <div className="viewer-wrap">
      <div className="viewer" ref={host} role="img" aria-label={alt}>
        <img src={asset(posterPath)} alt="" width={1264} height={1152} />
      </div>
      <div className="explode">
        <button type="button" onClick={() => api.current?.animateTo(1)}>
          Explode
        </button>
        <button type="button" onClick={() => api.current?.animateTo(0)}>
          Assemble
        </button>
        <label>
          <span className="sr-only">Explode the {flowChairName}</span>
          <input
            ref={range}
            type="range"
            min={0}
            max={1}
            step={0.01}
            defaultValue={0}
            onInput={(event) => api.current?.setExplode(Number(event.currentTarget.value))}
          />
        </label>
      </div>
      <p className="caption">Exploded view · plywood parts</p>
    </div>
  );
}

