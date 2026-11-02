import { useEffect, useRef } from "react";
import { asset } from "../asset";
import { flowChairName } from "../projects";

const posterPath = "images/web/flow-render-transparent-1.webp";
const modelPath = "models/flow-chair-bodies.zip.b64";
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
        const { unzipSync } = await import("three/addons/libs/fflate.module.js");
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
        const pieces: {
          object: any;
          origin: any;
          offset: any;
          start: number;
          end: number;
        }[] = [];
        let explode = 0;
        let frame = 0;
        let anim = 0;
        let frameModel: (() => void) | null = null;

        const apply = (value: number) => {
          explode = value;
          if (range.current) range.current.value = String(value);
          for (const piece of pieces) {
            const progress = Math.max(0, Math.min(1, (value - piece.start) / (piece.end - piece.start)));
            const eased = progress * progress * (3 - 2 * progress);
            piece.object.position.copy(piece.origin).addScaledVector(piece.offset, eased);
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
          const duration = 2200;
          const tick = (now: number) => {
            const t = Math.min(1, (now - startTime) / duration);
            const eased = t < 0.5 ? 2 * t * t : 1 - ((-2 * t + 2) ** 2) / 2;
            apply(from + (target - from) * eased);
            if (t < 1) anim = requestAnimationFrame(tick);
          };
          anim = requestAnimationFrame(tick);
        };

        api.current = { setExplode, animateTo };

        const archive = await fetch(asset(modelPath));
        if (!archive.ok) throw new Error(`Could not load chair parts (${archive.status})`);
        const encodedArchive = (await archive.text()).trim();
        const binaryArchive = atob(encodedArchive);
        const archiveBytes = Uint8Array.from(binaryArchive, (character) => character.charCodeAt(0));
        const files = unzipSync(archiveBytes);
        const bodyFiles = Object.entries(files).filter(([name]) => name.toLowerCase().endsWith(".glb"));
        if (bodyFiles.length !== 39) {
          throw new Error(`Expected 39 chair bodies, found ${bodyFiles.length}`);
        }

        const loader = new GLTFLoader();
        const bodies = await Promise.all(
          bodyFiles.map(async ([fileName, bytes]) => {
            const bodyName = fileName.slice(fileName.lastIndexOf(" - ") + 3).replace(/\.glb$/i, "");
            const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
            const gltf = await loader.parseAsync(buffer, "");
            const body = new THREE.Group();
            body.name = bodyName;
            body.add(gltf.scene);
            body.traverse((child: any) => {
              if (!(child instanceof THREE.Mesh)) return;
              const materials = Array.isArray(child.material) ? child.material : [child.material];
              for (const material of materials) {
                material.color?.set(0xc9ad86);
                if ("roughness" in material) material.roughness = 0.92;
                if ("metalness" in material) material.metalness = 0;
              }
            });
            return body;
          }),
        );
        if (stopped) return;
        const root = new THREE.Group();
        root.name = "Flow Chair · 39 bodies";
        for (const body of bodies) root.add(body);
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        root.position.sub(center);
        scene.add(root);

        root.updateMatrixWorld(true);
        const timing = {
          backrestTop: [0, 0.12],
          backrestBottom: [0.12, 0.24],
          armrestOutside: [0.24, 0.38],
          armrestInside: [0.38, 0.52],
          legsOutside: [0.52, 0.67],
          legsInside: [0.67, 0.82],
          seat: [0.82, 1],
        } as const;
        const motionFor = (name: string, center: any) => {
          let group: keyof typeof timing = "seat";
          let direction = new THREE.Vector3(0, 0, 0);
          let travel = 0.006;

          if (name === "Backrest_Top") {
            group = "backrestTop";
            direction.set(0, 1, 0);
            travel = 0.22;
          } else if (name === "Backrest_Bottom") {
            group = "backrestBottom";
            direction.set(0, 1, 0);
            travel = 0.18;
          } else if (name.startsWith("Armrest_") && name.endsWith("_Outside")) {
            group = "armrestOutside";
            direction.set(Math.sign(center.x) || 1, 0, 0);
            travel = 0.19;
          } else if (name.startsWith("Armrest_") && name.endsWith("_Inside")) {
            group = "armrestInside";
            direction.set(Math.sign(center.x) || 1, 0, 0);
            travel = 0.17;
          } else if (name.startsWith("Legs_") && name.endsWith("_Outside")) {
            group = "legsOutside";
            direction.set(0, 0, name.includes("Front") ? 1 : -1);
            travel = 0.2;
          } else if (name.startsWith("Legs_") && name.endsWith("_Inside")) {
            group = "legsInside";
            direction.set(0, 0, name.includes("Front") ? 1 : -1);
            travel = 0.18;
          } else if (name.startsWith("Part ")) {
            const pegNumber = Number(name.slice(5));
            if ((pegNumber >= 11 && pegNumber <= 14) || (pegNumber >= 17 && pegNumber <= 20)) {
              group = "backrestTop";
              direction.set(0, 1, 0);
              travel = 0.22;
            } else {
              const insidePeg = [1, 2, 15, 16].includes(pegNumber);
              group = insidePeg ? "armrestInside" : "armrestOutside";
              direction.set(Math.sign(center.x) || 1, 0, 0);
              travel = insidePeg ? 0.17 : 0.19;
            }
          }

          const [start, end] = timing[group];
          return { start, end, offset: direction.multiplyScalar(travel) };
        };

        root.children.forEach((child: any) => {
          const pieceBox = new THREE.Box3().setFromObject(child);
          const pieceCenter = pieceBox.getCenter(new THREE.Vector3());
          // Each top-level node is one imported Onshape body. Keep the CAD
          // sequence and move each peg with the body it joins.
          const motion = motionFor(child.name, pieceCenter);
          pieces.push({
            object: child,
            origin: child.position.clone(),
            offset: motion.offset,
            start: motion.start,
            end: motion.end,
          });
        });

        const fit = Math.max(size.x, size.y, size.z);
        camera.position.set(fit * 1.3, fit * 0.75, fit * 1.45);
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
            (radius / Math.sin(Math.min(verticalFov, horizontalFov) * 0.5)) * 1.05;
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
      <p className="caption">Exploded view · 39 plywood bodies</p>
    </div>
  );
}

