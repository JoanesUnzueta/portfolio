import { asset } from "../asset";
import { EdgeLabel } from "../components/EdgeLabel";
import { Photo } from "../components/Photo";
import { projectContext } from "../projects";

export function Kixmi() {
  return (
    <>
      <section className="hero dark" id="kixmi">
        <div className="hero-copy">
          <p className="num">/01</p>
          <h2>Kixmi</h2>
          <p className="subtitle">Berotu Morruak</p>
          <p className="project-meta">{projectContext.kixmi}</p>
          <p>
            An award-winning glass packaging concept developed for a sustainability-focused
            competition, proposing a low-impact production and recycling process through an
            original, practical, and manufacturable design.
          </p>
        </div>
        <div className="hero-visual">
          <Photo
            src="images/web/kixmi-cover-closeup.webp"
            alt="Close-up of the Kixmi bottle neck, with KIXMI printed on the glass and condensation on the surface."
            width={1920}
            height={1080}
          />
        </div>
        <EdgeLabel>Kixmi | 03</EdgeLabel>
      </section>

      <section className="split tall" id="kixmi-contest">
        <div className="copy">
          <h2>Vidrala Master Glass Design Contest</h2>
          <p className="subtitle">Glass Bottle Project</p>
          <p>
            An innovative glass container designed for low environmental impact, combining
            sustainable production and recycling with everyday usability. Its original yet feasible
            design reimagines old traditions — and was selected as the winning entry (1st prize) of
            the 4th edition of the Vidrala Master Glass Design Contest.
          </p>
          <h3>Concept</h3>
          <p>
            Kalimotxo — wine and cola — has a reputation for being anything but premium. Kixmi set
            out to change that with a bottle designed to convey its quality by itself: the union of
            two icons, the Burgundy-style wine bottle and the characteristic bottom of a soda
            bottle. Made with the year's wine from nearby wineries, it supports local businesses and
            brings a premium perspective to a drink made by young people, for young people.
          </p>
          <h3>A brand with a punch</h3>
          <p>
            The brand image is a pair of lips — you drink straight from the bottle. KIXMI:{" "}
            <em>Kiss Me</em>.
          </p>
          <blockquote>
            <p>
              “Remarkable exercise in imagination based on combining two existing realities. It
              reinvents and elevates the consumption of the product in a different way within a
              sector where it tends to become commoditized, connecting with the target audience it
              is aimed at.”
            </p>
            <footer>— Vidrala jury</footer>
          </blockquote>
          <p className="wordmark">
            <img
              src={asset("images/web/vidrala-contest-wordmark-white.webp")}
              alt="Vidrala Master Glass Design Contest wordmark."
              width={1490}
              height={251}
            />
          </p>
        </div>
        <div className="circle-frame">
          <Photo
            src="images/web/kixmi-sketch-sheets.webp"
            alt="Sheets of bottle sketches arranged in a circle, with one red Kixmi bottle highlighted."
            width={1300}
            height={1327}
          />
        </div>
        <EdgeLabel>Kixmi | 04</EdgeLabel>
      </section>

      <section className="compare" id="kixmi-bottles">
        <div className="compare-head">
          <h2>The union of two concepts</h2>
          <p>The Burgundy-style wine bottle and the characteristic bottom of a soda.</p>
        </div>
        <div className="trio">
          <figure>
            <Photo
              src="images/web/bottle-compare-cola-pet.webp"
              alt="Plastic soda bottle with a red label, the reference for the base of Kixmi."
              width={522}
              height={1875}
            />
            <figcaption>Soda bottle base</figcaption>
          </figure>
          <figure>
            <div className="bottle-stack">
              <Photo
                src="images/web/bottle-compare-glass-clear.webp"
                alt="Clear glass Kixmi bottle, joining a Burgundy neck with a soda-bottle base."
                width={725}
                height={2170}
              />
              <img
                src={asset("images/web/bottle-compare-glass-clear-layer2.webp")}
                alt=""
                width={725}
                height={2170}
                aria-hidden="true"
              />
            </div>
            <figcaption>Kixmi</figcaption>
          </figure>
          <figure>
            <Photo
              src="images/web/bottle-compare-wine.webp"
              alt="Dark Burgundy-style wine bottle, the other reference for Kixmi."
              width={620}
              height={1767}
            />
            <figcaption>Burgundy wine bottle</figcaption>
          </figure>
        </div>
        <EdgeLabel>Kixmi | 05</EdgeLabel>
      </section>

      <section className="renders" id="kixmi-renders">
        <div className="copy">
          <h2>Final renders</h2>
          <blockquote>
            <p>
              “The project presents a comprehensive development process that begins with the study
              of the market, consumers, and trends, and concludes by proposing a holistic solution.
              Particularly noteworthy is the object's design language in bringing together a cola
              soft drink and a wine through the concept of Burgundy.”
            </p>
            <footer>— Vidrala jury</footer>
          </blockquote>
        </div>
        <div className="render-row">
          <Photo
            src="images/web/kixmi-render-ice-transparent.webp"
            alt="Kixmi bottle standing in crushed ice, isolated on a transparent background."
            width={1553}
            height={2293}
          />
          <Photo
            src="images/web/kixmi-render-white.webp"
            alt="Kixmi bottle on a white background, showing the lips mark and KIXMI label."
            width={1553}
            height={2293}
          />
          <Photo
            src="images/web/kixmi-render-ice-dark.webp"
            alt="Kixmi bottle standing in crushed ice against a dark background."
            width={1553}
            height={2293}
          />
          <Photo
            src="images/web/kixmi-render-group-vidrala.webp"
            alt="Small group render of the Kixmi bottle prepared for the Vidrala contest."
            width={670}
            height={550}
            className="group-shot"
          />
        </div>
        <EdgeLabel>Kixmi | 06</EdgeLabel>
      </section>

      <section className="wave" id="wave" aria-label="Section divider">
        <img src={asset("images/wave.svg")} alt="" width={1664} height={449} />
      </section>
    </>
  );
}
