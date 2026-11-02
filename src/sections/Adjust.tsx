import { EdgeLabel } from "../components/EdgeLabel";
import { Photo } from "../components/Photo";
import { projectContext } from "../projects";

export function Adjust() {
  return (
    <>
      <section className="hero dark adjust" id="adjust">
        <div className="hero-copy">
          <p className="num">/03</p>
          <h2>(AD)JUST</h2>
          <p className="subtitle">Tablet Holder Link</p>
          <p className="project-meta">{projectContext.adjust}</p>
          <p>
            A wheelchair link for tablet holders: a tool-free clamp that helps people with special
            needs keep their communication devices within reach.
          </p>
        </div>
        <div className="hero-visual">
          <Photo
            src="images/web/adjust-cover.webp"
            alt="Dark render of the (AD)JUST clamp, a curved black link with a metal pin."
            width={2560}
            height={2121}
          />
        </div>
        <EdgeLabel>(AD)JUST | 11</EdgeLabel>
      </section>

      <section className="split" id="adjust-problem">
        <div className="copy">
          <h2>From a need, an answer</h2>
          <p className="subtitle">The problem</p>
          <p>
            From first-hand experience, it's easy to see that some people with special needs require
            external tools to communicate properly. Technology has been a clear answer, with tools
            for tablets and phones that make self-expression easier — and with them a new need has
            arisen: tablet holders.
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

      <section className="split" id="adjust-solution">
        <div className="copy">
          <h2>Ideation and sketches</h2>
          <p className="subtitle">The solution</p>
          <p>
            Due to the part-quantity constraint of the project, only the wheelchair link was
            selected. An ideation phase followed, with moodboards and several sketches, then a 3D
            modelling process that led to the final product.
          </p>
          <Photo
            src="images/web/adjust-logo.webp"
            alt="(AD)JUST circular mark."
            width={525}
            height={638}
            className="mini-logo"
          />
        </div>
        <Photo
          src="images/web/adjust-ideation-sketches.webp"
          alt="Ideation board for the (AD)JUST link: CAD studies, prototypes, and marker sketches of clamps."
          width={1920}
          height={960}
        />
        <EdgeLabel>(AD)JUST | 13</EdgeLabel>
      </section>

      <section className="split mechanism" id="adjust-mechanism">
        <div className="copy">
          <h2>Grip mechanism</h2>
          <p className="subtitle">Final design</p>
          <p>
            This easy-to-use, easy-to-understand system provides a firm grip on the wheelchair's
            components. Its “one size fits all” design is made to fit most wheelchairs, and it
            attaches without any external tools.
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
        <EdgeLabel>(AD)JUST | 14</EdgeLabel>
      </section>

      <section className="results" id="adjust-renders">
        <div className="copy">
          <h2>Final renders</h2>
          <p className="subtitle">The result</p>
          <p>Silicone grip pads on an aluminium frame.</p>
          <p>The final link mounted on a wheelchair frame, ready to carry a tablet holder.</p>
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
        <EdgeLabel>(AD)JUST | 15</EdgeLabel>
      </section>
    </>
  );
}
