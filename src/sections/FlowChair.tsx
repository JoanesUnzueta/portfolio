import { useState } from "react";
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
            <p className="num">/02</p>
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
        <EdgeLabel>{`${flowChairName} | 09`}</EdgeLabel>
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
        <EdgeLabel>{`${flowChairName} | 10`}</EdgeLabel>
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
        <EdgeLabel>{`${flowChairName} | 11`}</EdgeLabel>
      </section>

      <InUse />
      <ProjectNav project="flow" />
    </>
  );
}

/** Each empty photo is aligned to its seated photo, so the chair stays put when the person fades in. */
const sitViews = [
  { id: "front", label: "front three-quarter", focus: "50% 60%" },
  { id: "side", label: "side", focus: "52% 60%" },
  { id: "rear", label: "rear three-quarter", focus: "56% 60%" },
] as const;

function InUse() {
  const [seated, setSeated] = useState<string | null>(null);

  return (
    <section className="in-use accent-flow" id="flow-in-use">
      <div className="sit-row">
        {sitViews.map((view) => (
          <button
            key={view.id}
            type="button"
            className="sit"
            aria-pressed={seated === view.id}
            aria-label={`The ${flowChairName}, empty, ${view.label} view. Hover, focus, or tap to see Joanes sitting in it.`}
            onPointerUp={(event) => {
              if (event.pointerType === "touch") {
                setSeated((current) => (current === view.id ? null : view.id));
              }
            }}
          >
            <img
              className="empty"
              src={asset(`images/web/flow-sit-${view.id}-empty.webp`)}
              alt=""
              width={1600}
              height={900}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: view.focus }}
            />
            <img
              className="sat"
              src={asset(`images/web/flow-sit-${view.id}-person.webp`)}
              alt=""
              width={1600}
              height={900}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: view.focus }}
            />
          </button>
        ))}
      </div>
      <p className="sit-hint">
        <span className="hint-hover">Hover to sit</span>
        <span className="hint-touch">Tap to sit</span>
      </p>
      <EdgeLabel>{`${flowChairName} | 12`}</EdgeLabel>
    </section>
  );
}
