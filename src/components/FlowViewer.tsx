import { useEffect, useRef, useState } from "react";
import { asset } from "../asset";

const posterPath = "images/web/flow-render-transparent-1.webp";
const alt =
  "Interactive 3D model of the Flow Chair, a plywood armchair. Drag to rotate and scroll to zoom.";

export function FlowViewer() {
  const host = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [spin, setSpin] = useState(true);

  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "480px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    setSpin(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    void import("@google/model-viewer");
  }, [active]);

  const poster = asset(posterPath);

  return (
    <div className="viewer" ref={host}>
      {active ? (
        <model-viewer
          src={asset("models/flow-chair.glb")}
          poster={poster}
          alt={alt}
          camera-controls
          auto-rotate={spin}
          rotation-per-second="20deg"
          interaction-prompt="auto"
          shadow-intensity="0.45"
          exposure="1.05"
          environment-image="neutral"
          camera-orbit="35deg 75deg auto"
          touch-action="pan-y"
          loading="lazy"
          reveal="auto"
        />
      ) : (
        <img src={poster} alt={alt} width={1264} height={1152} />
      )}
    </div>
  );
}
