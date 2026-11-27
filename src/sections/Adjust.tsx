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
          src="images/web/adjust-clamp-side-knob.webp"
          alt="(AD)JUST clamp bleeding off the right edge: a black link with a steel shaft and knurled knob."
          width={1208}
          height={913}
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
        <EdgeLabel>(AD)JUST | 14</EdgeLabel>
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
        <EdgeLabel>(AD)JUST | 15</EdgeLabel>
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
          <Photo
            src="images/web/adjust-clamp-side-knob.webp"
            alt="(AD)JUST clamp from the side, with the knurled knob and steel rod."
            width={1208}
            height={913}
          />
          <Photo
            src="images/web/adjust-clamp-front-open.webp"
            alt="Front view of the open (AD)JUST grip, with the ring, pins, and knob."
            width={1267}
            height={1349}
          />
          <Photo
            src="images/web/adjust-clamp-back-mount.webp"
            alt="Back of the (AD)JUST clamp: the mounting plate with six holes around the centre."
            width={1184}
            height={802}
          />
        </div>
        <EdgeLabel>(AD)JUST | 18</EdgeLabel>
      </section>

      <section className="split adjust-mounted accent-adjust" id="adjust-renders">
        <div className="copy">
          <h2>Final renders</h2>
          <p className="subtitle">Result</p>
          <p>
            Silicone grip pads on an aluminium frame. Mounted on a wheelchair, ready for a tablet
            holder.
          </p>
        </div>
        <Photo
          src="images/web/adjust-wheelchair-mounted.webp"
          alt="The black (AD)JUST clamp mounted on the frame of a faded light-blue wheelchair."
          width={1506}
          height={1521}
          className="hero-shot"
        />
        <EdgeLabel>(AD)JUST | 19</EdgeLabel>
      </section>
      <ProjectNav project="adjust" />
    </>
  );
}
