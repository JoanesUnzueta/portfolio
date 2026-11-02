import { asset } from "../asset";
import { EdgeLabel } from "../components/EdgeLabel";
import { Photo } from "../components/Photo";
import { projectSpecs } from "../projects";
import { SpecLine } from "../components/SpecLine";

type KixmiRender = {
  /** File stem in public/images/kixmi/. Drop or replace an entry to swap a render. */
  name: string;
  alt: string;
  width: number;
  height: number;
  role: "lead" | "wide" | "tall";
  widths: readonly number[];
  caption: string;
};

/**
 * Final-render gallery. Each name maps to AVIF and WebP files at the listed widths:
 * public/images/kixmi/<name>-<width>.avif and .webp. Remove a row if a render is vetoed.
 */
const kixmiRenders: readonly KixmiRender[] = [
  {
    name: "kixmi-gen-hero-ice",
    role: "lead",
    caption: "Visualisation · on ice",
    alt: "Product visualisation of the Kixmi bottle on ice in red light, with condensation and the lips label.",
    width: 1152,
    height: 864,
    widths: [480, 768, 1152],
  },
  {
    name: "kixmi-gen-trio-grey",
    role: "wide",
    caption: "Visualisation · three bottles",
    alt: "Product visualisation of three Kixmi bottles in a row on a grey studio background.",
    width: 1280,
    height: 720,
    widths: [640, 960, 1280],
  },
  {
    name: "kixmi-gen-lifestyle",
    role: "tall",
    caption: "Visualisation · in hand",
    alt: "Product visualisation of a hand holding a Kixmi bottle at night, with lights behind it.",
    width: 864,
    height: 1152,
    widths: [432, 648, 864],
  },
];

function renderSrcSet(name: string, widths: readonly number[], ext: "avif" | "webp") {
  return widths.map((width) => `${asset(`images/kixmi/${name}-${width}.${ext}`)} ${width}w`).join(", ");
}

function KixmiRenderShot({ shot }: { shot: KixmiRender }) {
  const sizes =
    shot.role === "lead"
      ? "(min-width: 981px) min(1200px, 88vw), 100vw"
      : shot.role === "wide"
        ? "(min-width: 981px) 58vw, 100vw"
        : "(min-width: 981px) 30vw, 100vw";
  const fallback = asset(`images/kixmi/${shot.name}-${shot.widths[shot.widths.length - 1]}.webp`);

  return (
    <figure className={shot.role}>
      <picture>
        <source type="image/avif" srcSet={renderSrcSet(shot.name, shot.widths, "avif")} sizes={sizes} />
        <source type="image/webp" srcSet={renderSrcSet(shot.name, shot.widths, "webp")} sizes={sizes} />
        <img
          src={fallback}
          srcSet={renderSrcSet(shot.name, shot.widths, "webp")}
          sizes={sizes}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          loading="lazy"
          decoding="async"
        />
      </picture>
      <figcaption className="caption">{shot.caption}</figcaption>
    </figure>
  );
}

export function Kixmi() {
  return (
    <>
      <section className="hero-bleed tone-dark" id="kixmi">
        <Photo
          className="bleed crop"
          src="images/web/kixmi-cover-closeup.webp"
          alt="Kixmi bottle neck, deliberately cropped at the right edge, with KIXMI printed on the glass and condensation on the surface."
          width={1920}
          height={1080}
        />
        <div className="bleed-scrim" aria-hidden="true" />
        <div className="hero-copy">
          <div className="bleed-title">
            <p className="num">/01</p>
            <h2>Kixmi</h2>
            <div className="bleed-body">
              <p className="subtitle">Berotu Morruak</p>
              <SpecLine items={projectSpecs.kixmi} />
              <p className="lede">
                An award-winning glass bottle for a sustainability competition. Low-impact, practical,
                and ready to manufacture.
              </p>
            </div>
          </div>
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
        <div className="render-gallery">
          {kixmiRenders.map((render) => (
            <KixmiRenderShot key={render.name} shot={render} />
          ))}
        </div>
        <EdgeLabel>Kixmi | 06</EdgeLabel>
      </section>

      <section className="wave" id="wave" aria-label="Section divider">
        <img src={asset("images/wave.svg")} alt="" width={1664} height={449} />
      </section>
    </>
  );
}
