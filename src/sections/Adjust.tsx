import { EdgeLabel } from "../components/EdgeLabel";
import { ProjectNav } from "../components/ProjectNav";
import { Photo } from "../components/Photo";
import { SpecLine } from "../components/SpecLine";
import { projectSpecs } from "../projects";

export function Adjust() {
  return (
    <>
      <section className="hero-bleed tone-dark adjust accent-adjust" id="adjust">
        <Photo
          className="bleed crop"
          src="images/web/adjust-cover-tight.webp"
          alt="(AD)JUST clamp bleeding off the right edge: a black link with a steel shaft and knurled knob."
          width={1895}
          height={1421}
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
        <EdgeLabel>(AD)JUST | 11</EdgeLabel>
      </section>

      <section className="split accent-adjust" id="adjust-problem">
        <div className="copy">
          <h2>Within reach</h2>
          <p className="subtitle">Problem</p>
          <p>
            From first-hand experience: some people with special needs use tablets and phones to
            communicate. Those devices need a holder.
          </p>
        </div>
        <Photo
          src="images/web/adjust-research-communication-app.webp"
          alt="Two children using a tablet communication board with picture symbols for food, clothes, and words."
          width={1920}
          height={960}
        />
        <EdgeLabel>(AD)JUST | 12</EdgeLabel>
      </section>

      <section className="split accent-adjust" id="adjust-solution">
        <div className="copy">
          <h2>One link</h2>
          <p className="subtitle">Solution</p>
          <p>
            The brief limited the number of parts, so I designed the wheelchair link only.
            Moodboards, sketches, then 3D models led to the clamp.
          </p>
        </div>
        <Photo
          src="images/web/adjust-ideation-sketches.webp"
          alt="Ideation board for the (AD)JUST link: CAD studies, prototypes, and marker sketches of clamps."
          width={1920}
          height={960}
        />
        <EdgeLabel>(AD)JUST | 13</EdgeLabel>
      </section>

      <section className="slide-text mark-slide accent-adjust" id="adjust-mark">
        <Photo
          src="images/web/adjust-logo.webp"
          alt="(AD)JUST circular mark."
          width={525}
          height={638}
        />
        <EdgeLabel>(AD)JUST | 14</EdgeLabel>
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
        <div className="pair">
          <Photo
            src="images/web/adjust-final-design-assembly.webp"
            alt="Assembly drawing of the (AD)JUST clamp mounted on a wheelchair tray arm."
            width={1425}
            height={1575}
          />
          <Photo
            src="images/web/adjust-grip-mechanism-variants.webp"
            alt="Three views of the (AD)JUST grip: closed clamp, open clamp, and the knob from below."
            width={1762}
            height={1031}
          />
        </div>
        <EdgeLabel>(AD)JUST | 15</EdgeLabel>
      </section>

      <section className="results accent-adjust" id="adjust-renders">
        <div className="copy">
          <h2>Final renders</h2>
          <p className="subtitle">Result</p>
          <p>
            Silicone grip pads on an aluminium frame. Mounted on a wheelchair, ready for a tablet
            holder.
          </p>
        </div>
        <div className="result-grid">
          <Photo
            src="images/web/adjust-wheelchair-mounted.webp"
            alt="The (AD)JUST link mounted on the frame of a wheelchair."
            width={1912}
            height={1875}
            className="hero-shot"
          />
          <Photo
            src="images/web/adjust-render-clamps.webp"
            alt="Two black (AD)JUST clamps shown together, with knobs and steel shafts."
            width={1500}
            height={1462}
          />
          <Photo
            src="images/web/adjust-hero-clamp.webp"
            alt="Hero render of a single (AD)JUST clamp on a light background."
            width={2175}
            height={1612}
          />
        </div>
        <EdgeLabel>(AD)JUST | 16</EdgeLabel>
      </section>
      <ProjectNav project="adjust" />
    </>
  );
}
