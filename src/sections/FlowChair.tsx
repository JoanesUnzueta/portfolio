import { asset } from "../asset";
import { EdgeLabel } from "../components/EdgeLabel";
import { FlowViewer } from "../components/FlowViewer";
import { Photo } from "../components/Photo";
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
                Flowing edges, cut on CNC from flat plywood. Continuous and sculptural, and still
                practical to make.
              </p>
            </div>
          </div>
        </div>
        <EdgeLabel>{`${flowChairName} | 07`}</EdgeLabel>
      </section>

      <section className="construct" id="flow-construction">
        <div className="swoosh" aria-hidden="true" />
        <div className="copy">
          <h2>Invisible Strength</h2>
          <p className="subtitle">Chair construction</p>
          <p>
            In the construction phase, I focused on precision and clean assembly. Each plywood panel
            was adjusted down to the millimetre, ensuring efficient CNC cutting and minimal waste —
            all parts are nested on two sheets. The parts are held together with internal pegs,
            creating strong, invisible junctions that preserve the seamless look of the design while
            keeping the structure robust.
          </p>
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
        </div>
        <Photo
          src="images/web/chair-technical.webp"
          alt={`CAD line render of the ${flowChairName}, shown in three-quarter view.`}
          width={1366}
          height={1624}
          className="cad"
        />
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
          <p className="caption">Dimensions and two-sheet nesting</p>
        </div>
        <EdgeLabel>{`${flowChairName} | 08`}</EdgeLabel>
      </section>

      <section className="final" id="flow-final">
        <Photo
          className="final-bg"
          src="images/web/chair-photo.webp"
          alt=""
          width={768}
          height={974}
        />
        <div className="final-scrim" aria-hidden="true" />
        <div className="copy">
          <h2>Final product</h2>
          <p className="subtitle">CNC without borders</p>
          <p>
            The finished chair: continuous, sculptural lines cut entirely on CNC from flat plywood
            sheets. Drag to orbit, scroll to zoom, or pull the pieces apart.
          </p>
        </div>
        <FlowViewer />
        <p className="sr-only">
          Photograph of the finished {flowChairName}, a light plywood armchair, sits behind this
          section.
        </p>
        <EdgeLabel>{`${flowChairName} | 09`}</EdgeLabel>
      </section>

      <section className="gallery" id="flow-in-use">
        <div className="copy">
          <h2>In use</h2>
          <p className="subtitle">{flowChairName} — final product</p>
        </div>
        <div className="shots">
          <Photo
            src="images/web/flow-sitting-1.webp"
            alt={`A person sitting in the ${flowChairName}, seen from the side.`}
            width={2560}
            height={1440}
          />
          <Photo
            src="images/web/flow-sitting-2.webp"
            alt={`A person sitting in the ${flowChairName}, seen from the front.`}
            width={2560}
            height={1440}
          />
          <Photo
            src="images/web/flow-sitting-3.webp"
            alt={`A person sitting in the ${flowChairName}, seen from a three-quarter angle.`}
            width={2560}
            height={1440}
          />
          <Photo
            src="images/web/flow-sitting-4.webp"
            alt={`A person sitting in the ${flowChairName}, another three-quarter view.`}
            width={2560}
            height={1440}
          />
          <Photo
            src="images/web/flow-studio-1.webp"
            alt={`Studio photograph of the empty ${flowChairName}.`}
            width={2560}
            height={1440}
          />
          <Photo
            src="images/web/flow-studio-2.webp"
            alt={`Studio photograph of the ${flowChairName} from the side.`}
            width={2560}
            height={1440}
          />
          <Photo
            src="images/web/flow-studio-3.webp"
            alt={`Studio photograph of the ${flowChairName} from behind.`}
            width={2560}
            height={1440}
          />
          <Photo
            src="images/web/flow-render-transparent-2.webp"
            alt={`Render of the ${flowChairName} on a transparent background, three-quarter view.`}
            width={1008}
            height={738}
          />
        </div>
        <EdgeLabel>{`${flowChairName} | 10`}</EdgeLabel>
      </section>
    </>
  );
}
