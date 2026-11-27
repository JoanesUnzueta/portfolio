import { useState, type CSSProperties } from "react";
import { asset } from "../asset";
import { EdgeLabel } from "../components/EdgeLabel";
import { FlowViewer } from "../components/FlowViewer";
import { Photo } from "../components/Photo";
import { ProjectNav } from "../components/ProjectNav";
import { SpecLine } from "../components/SpecLine";
import { flowChairName, projectSpecs } from "../projects";

export function FlowChair() {
  return (
    <>
      <section className="hero-bleed light accent-flow" id="flow">
        <Photo
          className="bleed"
          src="images/web/flow-joint-closeup.webp"
          alt={`Close-up of a curved plywood joint on the ${flowChairName}, showing the layered edge.`}
          width={1615}
          height={1113}
        />
        <div className="bleed-scrim" aria-hidden="true" />
        <div className="hero-copy">
          <div className="bleed-title">
            <p className="num">/01</p>
            <h2>
              <span lang="ja">フロー</span>
              <span className="sr-only"> {flowChairName}</span>
            </h2>
            <div className="bleed-body">
              <p className="aka">{flowChairName}</p>
              <p className="subtitle">Breaking the rules of CNC</p>
              <SpecLine items={projectSpecs.flowChair} />
              <p className="lede">
                Flowing edges, cut on CNC from flat plywood. Sculptural, and still practical to
                make.
              </p>
            </div>
          </div>
        </div>
        <EdgeLabel>{`${flowChairName} | 04`}</EdgeLabel>
      </section>

      <section className="construct sheet accent-flow" id="flow-construction">
        <img className="flow-wave" src={asset("images/flow-wave.svg")} alt="" />
        <div className="sheet-stage">
          <div className="copy sheet-copy">
            <h2>Invisible strength</h2>
            <p className="subtitle">Construction</p>
            <p>
              I adjusted each panel to the millimetre and nested every part on two sheets. Internal
              pegs hold the chair. No fasteners show.
            </p>
            <p className="caption">480 × 480 × 658 mm · 18 mm plywood · two sheets</p>
          </div>
          <Photo
            src="images/web/chair-technical.webp"
            alt={`CAD render of the ${flowChairName} in three-quarter view, plywood frame with a white seat.`}
            width={1366}
            height={1624}
            className="cad"
          />
          <img
            className="sheet-dims"
            src={asset("images/flow-dimensions.svg")}
            alt={`Front, side and top drawings of the ${flowChairName}: 480 wide, 658 tall, 408 seat height, 391 deep.`}
            width={690}
            height={260}
          />
          <img
            className="sheet-nest"
            src={asset("images/flow-nesting.webp")}
            alt={`CNC nesting drawing showing the ${flowChairName} parts laid out on two plywood sheets.`}
            width={1140}
            height={860}
          />
        </div>
        <EdgeLabel>{`${flowChairName} | 05`}</EdgeLabel>
      </section>
      <section className="split render-built accent-flow" id="flow-edges">
        <div className="copy">
          <h2>Seamless edges</h2>
          <p className="subtitle">Design for CNC</p>
          <p>
            I explored seamless, flowing edges designed for CNC manufacturing. Pushing against the
            usual flat planes and sharp junctions, the chair feels continuous and sculptural, while
            still being practical to produce.
          </p>
        </div>
        <div className="pair-built">
          <figure>
            <Photo
              src="images/web/flow-edges-render.webp"
              alt={`Render of the ${flowChairName} in three-quarter view.`}
              width={509}
              height={648}
            />
            <figcaption className="caption">Render</figcaption>
          </figure>
          <figure>
            <Photo
              src="images/web/flow-edges-built.webp"
              alt={`The built ${flowChairName} in plywood, photographed in the studio.`}
              width={677}
              height={770}
            />
            <figcaption className="caption">Built</figcaption>
          </figure>
        </div>
        <EdgeLabel>{`${flowChairName} | 06`}</EdgeLabel>
      </section>

      <section className="final accent-flow" id="flow-final">
        <div className="copy">
          <h2>Final product</h2>
          <p className="subtitle">Result</p>
          <p>
            The finished chair in 3D. Drag to orbit, scroll to zoom, or explode it to see how the
            parts fit together.
          </p>
        </div>
        <FlowViewer />
        <EdgeLabel>{`${flowChairName} | 07`}</EdgeLabel>
      </section>

      <InUse />
      <ProjectNav project="flow" />
    </>
  );
}

/**
 * Each empty photo is aligned to its seated photo, so the chair stays put when the person fades in.
 * One large frame at a time; arrows (or a swipe) change the view. fx centres the chair:
 * wide is for the 3:2 desktop frame, tall for the 4:5 phone frame.
 */
const sitViews = [
  { id: "front", label: "front three-quarter", wide: "63%", tall: "54%" },
  { id: "side", label: "side", wide: "74%", tall: "57%" },
  { id: "rear", label: "rear three-quarter", wide: "97%", tall: "64%" },
] as const;

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 48" aria-hidden="true">
      <polyline points={dir === "left" ? "20,4 4,24 20,44" : "4,4 20,24 4,44"} />
    </svg>
  );
}

function InUse() {
  const [index, setIndex] = useState(0);
  const [seated, setSeated] = useState(false);
  const [startX, setStartX] = useState<number | null>(null);
  const count = sitViews.length;
  const go = (step: number) => {
    setSeated(false);
    setIndex((current) => (current + step + count) % count);
  };

  return (
    <section className="in-use accent-flow" id="flow-in-use">
      <div className="sit-carousel">
        <button type="button" className="sit-nav" aria-label="Previous view" onClick={() => go(-1)}>
          <Chevron dir="left" />
        </button>
        <div
          className="sit-stage"
          onPointerDown={(event) => setStartX(event.clientX)}
          onPointerUp={(event) => {
            const dx = startX === null ? 0 : event.clientX - startX;
            setStartX(null);
            if (Math.abs(dx) > 40) {
              go(dx < 0 ? 1 : -1);
            } else if (event.pointerType !== "mouse") {
              setSeated((current) => !current);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") go(-1);
            if (event.key === "ArrowRight") go(1);
          }}
        >
          {sitViews.map((view, i) => {
            const style = { "--fx-wide": view.wide, "--fx-tall": view.tall } as CSSProperties;
            const active = i === index;
            return (
              <button
                key={view.id}
                type="button"
                className={`sit${active ? " is-active" : ""}`}
                style={style}
                tabIndex={active ? 0 : -1}
                aria-hidden={!active}
                aria-pressed={active && seated}
                aria-label={`The ${flowChairName}, ${view.label} view. Hover, focus, or tap to see Joanes sitting in it.`}
              >
                <img
                  className="empty"
                  src={asset(`images/web/flow-sit-v2-${view.id}-empty.webp`)}
                  alt=""
                  width={1600}
                  height={900}
                  loading="lazy"
                  decoding="async"
                />
                <img
                  className="sat"
                  src={asset(`images/web/flow-sit-v2-${view.id}-person.webp`)}
                  alt=""
                  width={1600}
                  height={900}
                  loading="lazy"
                  decoding="async"
                />
              </button>
            );
          })}
          <p className="sit-hint">
            <span className="hint-hover">Hover to sit</span>
            <span className="hint-touch">Tap to sit · swipe to turn</span>
          </p>
        </div>
        <button type="button" className="sit-nav" aria-label="Next view" onClick={() => go(1)}>
          <Chevron dir="right" />
        </button>
      </div>
      <div className="sit-dots" role="group" aria-label="Choose a view">
        {sitViews.map((view, i) => (
          <button
            key={view.id}
            type="button"
            className={i === index ? "is-active" : undefined}
            aria-label={`Show the ${view.label} view`}
            aria-current={i === index}
            onClick={() => {
              setSeated(false);
              setIndex(i);
            }}
          />
        ))}
      </div>
      <EdgeLabel>{`${flowChairName} | 08`}</EdgeLabel>
    </section>
  );
}
