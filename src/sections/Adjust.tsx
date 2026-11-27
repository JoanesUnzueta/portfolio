import { asset } from "../asset";
import { EdgeLabel } from "../components/EdgeLabel";
import { ProjectNav } from "../components/ProjectNav";
import { Photo } from "../components/Photo";
import { SpecLine } from "../components/SpecLine";
import { projectSpecs } from "../projects";

/*
 * Bubbles in the style of the original boards: a thin dark ring around a magnified view,
 * a small ring on the part itself and a leader line between them.
 * All coordinates are pixels of the image they sit on.
 */
const bubbleCls = "zoom-ring";

function leader(
  from: { x: number; y: number; r: number },
  to: { x: number; y: number; r: number },
) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  return {
    x1: from.x + ux * from.r,
    y1: from.y + uy * from.r,
    x2: to.x - ux * to.r,
    y2: to.y - uy * to.r,
  };
}

/* The arm drawing with its base magnified in place: the same image, scaled inside a circle. */
const ARM_W = 1100;
const ARM_H = 1367;
const armSpot = { x: 828, y: 1200, r: 160 };
const armBubble = { x: 318, y: 850, r: 290 };

function ArmWithBubble() {
  const k = armBubble.r / armSpot.r;
  const href = asset("images/web/adjust-arm-schematic.webp");
  const line = leader(armBubble, armSpot);
  return (
    <figure className="arm">
      <svg
        className="zoom-svg"
        viewBox={`0 0 ${ARM_W} ${ARM_H}`}
        role="img"
        aria-label="Drawing of an articulated tablet arm with the black (AD)JUST link at its base, magnified in a circle."
      >
        <defs>
          <clipPath id="arm-bubble-clip">
            <circle cx={armBubble.x} cy={armBubble.y} r={armBubble.r} />
          </clipPath>
        </defs>
        <image href={href} width={ARM_W} height={ARM_H} />
        <line className={bubbleCls} {...line} />
        <circle className={bubbleCls} cx={armSpot.x} cy={armSpot.y} r={armSpot.r} />
        <circle className="zoom-fill" cx={armBubble.x} cy={armBubble.y} r={armBubble.r} />
        <g clipPath="url(#arm-bubble-clip)">
          <image
            href={href}
            width={ARM_W}
            height={ARM_H}
            transform={`translate(${armBubble.x - armSpot.x * k} ${armBubble.y - armSpot.y * k}) scale(${k})`}
          />
        </g>
        <circle className={bubbleCls} cx={armBubble.x} cy={armBubble.y} r={armBubble.r} />
      </svg>
      <figcaption className="caption">The link at the base of the tablet arm</figcaption>
    </figure>
  );
}

/*
 * The clamp is small in the full render, so a bubble shows a high-resolution close-up of it.
 * Coordinates are pixels of adjust-wheelchair-mounted.webp (1506 × 1521).
 */
const IMG_W = 1506;
const IMG_H = 1521;
const clamp = { x: 844, y: 1022, r: 92 };
const bubble = { x: 300, y: 300, r: 250 };

function MountedDetail() {
  const pct = (value: number, of: number) => `${((value / of) * 100).toFixed(3)}%`;
  const line = leader(bubble, clamp);

  return (
    <figure className="mounted">
      <div className="mounted-stage">
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
          <line className={bubbleCls} {...line} />
          <circle className={bubbleCls} cx={clamp.x} cy={clamp.y} r={clamp.r} />
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
      </div>
      <figcaption className="caption">On the wheelchair frame</figcaption>
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
            <p className="num">/02</p>
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
        <EdgeLabel>(AD)JUST | 09</EdgeLabel>
      </section>

      <section className="split reach accent-adjust" id="adjust-problem">
        <div className="copy">
          <h2>Within reach</h2>
          <p className="subtitle">Problem</p>
          <p>
            The project started with my sister, who needed a better way to clamp her tablet to her
            wheelchair.
          </p>
          <p>
            Many people with disabilities rely on a tablet or phone every day: to speak through
            picture symbols, to learn and to stay in touch. The device has to stay where they can
            see and reach it.
          </p>
        </div>
        <div className="reach-board">
          <figure className="reach-photo">
            <Photo
              src="images/web/adjust-aac-photo.webp"
              alt="Two young people use a communication app on a tablet together."
              width={626}
              height={948}
            />
          </figure>
          <figure className="reach-app">
            <div className="tablet-frame">
              <Photo
                src="images/web/adjust-aac-app.webp"
                alt="A communication app on a tablet: picture symbols for food, drinks, clothes, numbers and the alphabet."
                width={998}
                height={950}
              />
            </div>
            <figcaption className="caption">A communication app: tap a symbol to speak</figcaption>
          </figure>
          <ul className="reach-uses">
            <li>
              <strong>Speak</strong>
              <span>Build sentences from symbols</span>
            </li>
            <li>
              <strong>Everyday needs</strong>
              <span>Food, drinks, clothes</span>
            </li>
            <li>
              <strong>Learn</strong>
              <span>Numbers, letters, colours</span>
            </li>
          </ul>
        </div>
        <EdgeLabel>(AD)JUST | 10</EdgeLabel>
      </section>

      <section className="split split3 accent-adjust" id="adjust-solution">
        <div className="copy">
          <h2>One link</h2>
          <p className="subtitle">Solution</p>
          <p>
            The brief limited the number of parts, so I designed the wheelchair link only: the piece
            that joins an articulated tablet arm to the wheelchair frame.
          </p>
          <p>
            Open the grip, close it around the tube, and turn the knob to lock it. No tools needed.
          </p>
        </div>
        <ArmWithBubble />
        <figure className="variants">
          <Photo
            src="images/web/adjust-grip-mechanism-variants.webp"
            alt="Three renders of the grip from above: open, closed around the tube, and locked with the knob."
            width={1664}
            height={917}
          />
          <figcaption className="caption">Grip mechanism: open, closed, locked</figcaption>
        </figure>
        <EdgeLabel>(AD)JUST | 11</EdgeLabel>
      </section>

      <section className="process accent-adjust" id="adjust-process">
        <div className="copy">
          <h2>From sketch to CAD</h2>
          <p className="subtitle">Process</p>
          <p>
            Pencil studies of the grip ring and of how it closes around the tube, then the part
            modelled in Siemens NX.
          </p>
        </div>
        <div className="sketch-cad">
          <figure className="sketch">
            <Photo
              src="images/web/adjust-sketch-link.webp"
              alt="Pencil sketch of the clamp on a tube: the open grip ring, the threaded pin and the knob."
              width={1400}
              height={1258}
            />
            <figcaption className="caption">Sketch</figcaption>
          </figure>
          <span className="sketch-arrow" aria-hidden="true">
            →
          </span>
          <figure className="cad">
            <Photo
              src="images/web/adjust-cad-nx-cutout.webp"
              alt="The grip ring modelled in Siemens NX."
              width={385}
              height={325}
            />
            <figcaption className="caption">Modelled in Siemens NX</figcaption>
          </figure>
        </div>
        <EdgeLabel>(AD)JUST | 12</EdgeLabel>
      </section>

      <section className="split mechanism accent-adjust" id="adjust-mechanism">
        <div className="copy">
          <h2>Grip</h2>
          <p className="subtitle">Mechanism</p>
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
        <EdgeLabel>(AD)JUST | 13</EdgeLabel>
      </section>

      <section className="split split3 adjust-mounted accent-adjust" id="adjust-renders">
        <div className="copy">
          <h2>Final renders</h2>
          <p className="subtitle">Result</p>
          <p>
            A black anodised aluminium body with silicone grip pads and a stainless-steel pin.
            Mounted on the wheelchair frame, ready for a tablet holder.
          </p>
        </div>
        <MountedDetail />
        <figure className="clamp-pair">
          <Photo
            src="images/web/adjust-render-clamps.webp"
            alt="Two renders of the (AD)JUST link: the round mount with six holes, and the grip with its knob."
            width={1345}
            height={1317}
          />
          <figcaption className="caption">Mount and grip</figcaption>
        </figure>
        <EdgeLabel>(AD)JUST | 14</EdgeLabel>
      </section>

      <section className="details accent-adjust" id="adjust-details">
        <div className="copy">
          <h2>Details</h2>
          <p className="subtitle">Close-ups</p>
        </div>
        <div className="details-row">
          <figure>
            <Photo
              src="images/web/adjust-clamp-front-open.webp"
              alt="The grip from the front: rounded jaws, silver pivot pin and the knob on top."
              width={1236}
              height={1317}
            />
            <figcaption className="caption">Grip</figcaption>
          </figure>
          <figure>
            <Photo
              src="images/web/adjust-clamp-side-knob.webp"
              alt="The clamp from the side: the knurled knob drives a steel pin across the jaws."
              width={1184}
              height={889}
            />
            <figcaption className="caption">Knob and pin</figcaption>
          </figure>
          <figure>
            <Photo
              src="images/web/adjust-clamp-back-mount.webp"
              alt="The round mount face with six holes, where the tablet arm attaches."
              width={1152}
              height={770}
            />
            <figcaption className="caption">Mount face</figcaption>
          </figure>
        </div>
        <EdgeLabel>(AD)JUST | 15</EdgeLabel>
      </section>
      <ProjectNav project="adjust" />
    </>
  );
}
