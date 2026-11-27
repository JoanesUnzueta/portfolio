import { asset } from "../asset";
import { EdgeLabel } from "../components/EdgeLabel";
import { ProjectNav } from "../components/ProjectNav";
import { Photo } from "../components/Photo";
import { SpecLine } from "../components/SpecLine";
import { projectSpecs } from "../projects";

/*
 * The clamp is small in the full render, so a bubble shows a high-resolution close-up of it in place.
 * Coordinates are pixels of adjust-wheelchair-mounted.webp (1506 × 1521).
 */
const IMG_W = 1506;
const IMG_H = 1521;
const clamp = { x: 837, y: 1025, r: 74 };
const bubble = { x: 300, y: 280, r: 235 };

function MountedDetail() {
  const dx = clamp.x - bubble.x;
  const dy = clamp.y - bubble.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const pct = (value: number, of: number) => `${((value / of) * 100).toFixed(3)}%`;

  return (
    <figure className="mounted">
      <img
        className="mounted-full"
        src={asset("images/web/adjust-wheelchair-mounted.webp")}
        alt="The black (AD)JUST clamp mounted on the frame of a faded light-blue wheelchair."
        width={IMG_W}
        height={IMG_H}
        loading="lazy"
        decoding="async"
      />
      <svg className="mounted-lead" viewBox={`0 0 ${IMG_W} ${IMG_H}`} aria-hidden="true">
        <line
          x1={bubble.x + ux * bubble.r}
          y1={bubble.y + uy * bubble.r}
          x2={clamp.x - ux * clamp.r}
          y2={clamp.y - uy * clamp.r}
        />
        <circle cx={clamp.x} cy={clamp.y} r={clamp.r} />
      </svg>
      <div
        className="mounted-bubble"
        style={{
          left: pct(bubble.x - bubble.r, IMG_W),
          top: pct(bubble.y - bubble.r, IMG_H),
          width: pct(2 * bubble.r, IMG_W),
        }}
      >
        <img
          src={asset("images/web/adjust-blowup.webp")}
          alt="Close-up of the clamp on the wheelchair frame: knob, steel pin and the round mount."
          width={1000}
          height={1000}
          loading="lazy"
          decoding="async"
        />
      </div>
      <figcaption className="caption">The link on the wheelchair frame</figcaption>
    </figure>
  );
}

export function Adjust() {
  return (
    <>
      <section className="hero-bleed tone-dark adjust accent-adjust" id="adjust">
        <Photo
          className="bleed crop"
          src="images/web/adjust-hero-rim.webp"
          alt="Close-up of the (AD)JUST clamp: the dark grip ring and its silver pin, filling the right of the frame."
          width={1920}
          height={2160}
        />
        <div className="bleed-scrim" aria-hidden="true" />
        <div className="hero-copy">
          <div className="bleed-title">
            <p className="num">/03</p>
            <h2>(AD)JUST</h2>
            <div className="bleed-body">
              <p className="subtitle">Tablet Holder Link</p>
              <SpecLine items={projectSpecs.adjust} />
              <p className="lede">
                A tool-free clamp for a wheelchair tablet holder. The device stays within reach.
              </p>
            </div>
          </div>
        </div>
        <EdgeLabel>(AD)JUST | 13</EdgeLabel>
      </section>

      <section className="split accent-adjust" id="adjust-problem">
        <div className="copy">
          <h2>Within reach</h2>
          <p className="subtitle">Problem</p>
          <p>
            From first-hand experience: some people with disabilities rely on tablets and phones to
            communicate. Those devices need a holder.
          </p>
        </div>
        <Photo
          src="images/web/adjust-research-communication-app.webp"
          alt="Two children using a tablet communication board with picture symbols for food, clothes, and words."
          width={1920}
          height={960}
        />
        <EdgeLabel>(AD)JUST | 14</EdgeLabel>
      </section>

      <section className="split accent-adjust" id="adjust-solution">
        <div className="copy">
          <h2>One link</h2>
          <p className="subtitle">Solution</p>
          <p>
            The brief limited the number of parts, so I designed the wheelchair link only: the piece
            that joins an articulated tablet arm to the wheelchair frame.
          </p>
        </div>
        <figure className="arm">
          <Photo
            src="images/web/adjust-arm-schematic.webp"
            alt="Drawing of an articulated tablet arm, with the black (AD)JUST link clamped at its base."
            width={1100}
            height={1367}
          />
          <figcaption className="caption">The link at the base of the tablet arm</figcaption>
        </figure>
        <EdgeLabel>(AD)JUST | 15</EdgeLabel>
      </section>

      <section className="process accent-adjust" id="adjust-process">
        <div className="copy">
          <h2>From sketch to CAD</h2>
          <p className="subtitle">Process</p>
          <p>
            Pencil studies of the grip ring and of how the mount meets the tube, then the part
            modelled in Siemens NX.
          </p>
        </div>
        <div className="process-grid">
          <figure className="sketch wide">
            <Photo
              src="images/web/adjust-sketch-clamp.webp"
              alt="Pencil sketches: the clamp with its knob on a tube, the joint to the arm, and the mount block."
              width={1600}
              height={960}
            />
          </figure>
          <figure className="sketch">
            <Photo
              src="images/web/adjust-sketch-mount.webp"
              alt="Pencil sketch of the round mount meeting the tube."
              width={900}
              height={1200}
            />
          </figure>
          <figure className="cad-shot">
            <Photo
              src="images/web/adjust-cad-nx.webp"
              alt="The grip ring modelled in Siemens NX."
              width={700}
              height={460}
            />
            <figcaption className="caption">Modelled in Siemens NX</figcaption>
          </figure>
        </div>
        <EdgeLabel>(AD)JUST | 16</EdgeLabel>
      </section>

      <section className="slide-text mark-slide tone-dark accent-adjust" id="adjust-mark">
        <Photo
          className="official"
          src="images/web/adjust-logo.webp"
          alt="Official (AD)JUST mark: a white open ring in the shape of the clamp."
          width={778}
          height={702}
        />
        <p className="mark-caption">
          <strong>(AD)JUST</strong>
          <span>Tablet Holder Link</span>
        </p>
        <EdgeLabel>(AD)JUST | 17</EdgeLabel>
      </section>

      <section className="split mechanism accent-adjust" id="adjust-mechanism">
        <div className="copy">
          <h2>Grip</h2>
          <p className="subtitle">Result</p>
          <p>
            A firm, one-size-fits-all grip. Made to fit most wheelchairs, and attached with no
            external tools.
          </p>
        </div>
        <div className="clamp-trio">
          <figure>
            <Photo
              src="images/web/adjust-grip-ring.webp"
              alt="The (AD)JUST grip ring: an open, rounded C that closes around the wheelchair tube."
              width={1200}
              height={887}
            />
            <figcaption className="caption">Grip ring</figcaption>
          </figure>
          <figure>
            <Photo
              src="images/web/adjust-knob-pin.webp"
              alt="Side of the clamp: the knurled knob turns a steel pin that closes the grip."
              width={1200}
              height={703}
            />
            <figcaption className="caption">Knob and pin</figcaption>
          </figure>
          <figure>
            <Photo
              src="images/web/adjust-rotation.webp"
              alt="Face of the mount with six holes; a ghosted copy and an arrow show it turning."
              width={1100}
              height={1088}
            />
            <figcaption className="caption">Rotating mount</figcaption>
          </figure>
        </div>
        <EdgeLabel>(AD)JUST | 18</EdgeLabel>
      </section>

      <section className="split adjust-mounted accent-adjust" id="adjust-renders">
        <div className="copy">
          <h2>Final renders</h2>
          <p className="subtitle">Result</p>
          <p>
            A black anodised aluminium body with silicone grip pads and a stainless-steel pin.
            Mounted on the wheelchair frame, ready for a tablet holder.
          </p>
        </div>
        <MountedDetail />
        <EdgeLabel>(AD)JUST | 19</EdgeLabel>
      </section>
      <ProjectNav project="adjust" />
    </>
  );
}
