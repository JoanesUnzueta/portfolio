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
      <section className="hero-bleed light" id="flow">
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
        <EdgeLabel>{`${flowChairName} | 07`}</EdgeLabel>
      </section>

      <section className="construct" id="flow-construction">
        <div className="copy">
          <h2>Invisible strength</h2>
          <p className="subtitle">Solution</p>
          <p>
            I adjusted each panel to the millimetre and nested every part on two sheets. Internal
            pegs hold the chair. No fasteners show.
          </p>
        </div>
        <Photo
          src="images/web/chair-technical.webp"
          alt={`CAD line render of the ${flowChairName}, shown in three-quarter view.`}
          width={1366}
          height={1624}
          className="cad"
        />
        <EdgeLabel>{`${flowChairName} | 08`}</EdgeLabel>
      </section>

      <section className="split" id="flow-drawings">
        <div className="copy">
          <h2>Two sheets</h2>
          <p className="subtitle">Result</p>
          <dl className="specs">
            <div>
              <dt>Overall size</dt>
              <dd>Approx. 480 × 480 × 658 mm (W × D × H)</dd>
            </div>
            <div>
              <dt>Seat height</dt>
              <dd>408 mm</dd>
            </div>
            <div>
              <dt>Material</dt>
              <dd>18 mm CNC-cut plywood</dd>
            </div>
            <div>
              <dt>Joinery</dt>
              <dd>Internal pegs, no visible fasteners</dd>
            </div>
            <div>
              <dt>Nesting</dt>
              <dd>2 sheets</dd>
            </div>
          </dl>
          <p className="caption">Dimensions and two-sheet nesting</p>
        </div>
        <div className="drawings">
          <img
            src={asset("images/flow-dimensions.svg")}
            alt={`Dimensioned drawings of the ${flowChairName}. The CAD overall size is about 480 × 480 × 658 mm.`}
            width={690}
            height={260}
          />
          <img
            src={asset("images/flow-nesting.svg")}
            alt={`CNC nesting drawing showing the ${flowChairName} parts laid out on two sheets.`}
            width={570}
            height={430}
          />
        </div>
        <EdgeLabel>{`${flowChairName} | 09`}</EdgeLabel>
      </section>

      <section className="final" id="flow-final">
        <div className="copy">
          <h2>Final product</h2>
          <p className="subtitle">Result</p>
          <p>
            Continuous lines, cut on CNC from flat plywood. Drag to orbit, scroll to zoom, or pull
            the pieces apart.
          </p>
        </div>
        <FlowViewer />
        <EdgeLabel>{`${flowChairName} | 10`}</EdgeLabel>
      </section>

      <InUse />
      <ProjectNav project="flow" />
    </>
  );
}

function InUse() {
  const [seated, setSeated] = useState(false);

  return (
    <section className="in-use" id="flow-in-use">
      <button
        type="button"
        className="sit"
        aria-pressed={seated}
        aria-label={`The ${flowChairName}, empty, in side view. Hover, focus, or tap to see Joanes sitting in it.`}
        onPointerUp={(event) => {
          if (event.pointerType === "touch") setSeated((value) => !value);
        }}
      >
        <img
          src={asset("images/web/flow-sit-empty.webp")}
          alt=""
          width={2560}
          height={1440}
        />
        <img
          className="sat"
          src={asset("images/web/flow-sit-person.webp")}
          alt=""
          width={2560}
          height={1440}
        />
        <span className="sit-hint">
          <span className="hint-hover">Hover to sit</span>
          <span className="hint-touch">Tap</span>
        </span>
      </button>
      <EdgeLabel>{`${flowChairName} | 11`}</EdgeLabel>
    </section>
  );
}
