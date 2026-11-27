import { asset } from "../asset";
import { EdgeLabel } from "../components/EdgeLabel";
import { Photo } from "../components/Photo";
import { projectSpecs } from "../projects";
import { ProjectNav } from "../components/ProjectNav";
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
    name: "kixmi-studio-wet",
    role: "lead",
    caption: "On ice",
    alt: "Product visualisation of the Kixmi bottle on ice, wet with condensation, in red light.",
    width: 1152,
    height: 888,
    widths: [480, 768, 1152],
  },
  {
    name: "kixmi-studio-clean",
    role: "wide",
    caption: "Studio",
    alt: "Product visualisation of three Kixmi bottles, cut out from the studio background, with a faint reflection.",
    width: 1280,
    height: 1397,
    widths: [640, 960, 1280],
  },
  {
    name: "kixmi-lifestyle-hand",
    role: "tall",
    caption: "In hand",
    alt: "Product visualisation of a hand holding a Kixmi bottle, with warm lights behind it.",
    width: 864,
    height: 1145,
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
    <figure className={`${shot.role}${shot.name.includes("clean") ? " cutout" : ""}`}>
      <picture>
        {shot.name.includes("clean") ? null : (
          <source type="image/avif" srcSet={renderSrcSet(shot.name, shot.widths, "avif")} sizes={sizes} />
        )}
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
      <section className="hero-bleed tone-dark accent-kixmi kixmi" id="kixmi">
        <Photo
          className="bleed bottle"
          src="images/web/kixmi-cover-neck.webp"
          alt="Product visualisation of the Kixmi bottle, cropped so the neck and vertical KIXMI logo meet the top edge."
          width={1005}
          height={1203}
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
                A glass bottle for a sustainability contest. Low impact, practical, and ready to
                make.
              </p>
            </div>
          </div>
        </div>
        <EdgeLabel>Kixmi | 03</EdgeLabel>
      </section>

      <section className="split tall accent-kixmi" id="kixmi-contest">
        <div className="copy">
          <h2>Not seen as premium</h2>
          <p className="subtitle">Problem</p>
          <p>
            Kalimotxo — wine and cola — is not seen as premium. I wanted a bottle with a low
            environmental impact, including production and recycling, that is still practical to use
            every day.
          </p>
          <p>
            I designed it ready to manufacture: an original, practical shape, a low-impact
            production and recycling process, and something you can use every day.
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

      <section className="compare accent-kixmi" id="kixmi-bottles">
        <div className="compare-head">
          <h2>Two bottles, one</h2>
          <p className="subtitle">Solution</p>
          <p>
            I joined two icons: a Burgundy neck and the base of a soda bottle. It uses the year's
            wine from nearby wineries. A drink made by young people, for young people, and it
            supports those businesses.
          </p>
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

      <section className="split accent-kixmi" id="kixmi-result">
        <div className="copy">
          <h2>1st prize</h2>
          <p className="subtitle">Result</p>
          <p>
            4th edition of the Vidrala Master Glass Design Contest. The mark is a pair of lips — you
            drink straight from the bottle. KIXMI: <em>Kiss Me</em>.
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
        </div>
        <p className="wordmark">
          <img
            src={asset("images/web/vidrala-contest-wordmark-white.webp")}
            alt="Vidrala Master Glass Design Contest wordmark."
            width={1490}
            height={251}
          />
        </p>
        <EdgeLabel>Kixmi | 06</EdgeLabel>
      </section>

      <section className="slide-text accent-kixmi" id="kixmi-jury">
        <blockquote>
          <p>
            “The project presents a comprehensive development process that begins with the study of
            the market, consumers, and trends, and concludes by proposing a holistic solution.
            Particularly noteworthy is the object's design language in bringing together a cola soft
            drink and a wine through the concept of Burgundy.”
          </p>
          <footer>— Vidrala jury</footer>
        </blockquote>
        <EdgeLabel>Kixmi | 07</EdgeLabel>
      </section>

      <section className="renders accent-kixmi" id="kixmi-renders">
        <div className="copy">
          <h2>Final renders</h2>
          <p>On ice, as a studio set, and in the hand.</p>
        </div>
        <div className="render-gallery">
          {kixmiRenders.map((render) => (
            <KixmiRenderShot key={render.name} shot={render} />
          ))}
        </div>
        <EdgeLabel>Kixmi | 08</EdgeLabel>
      </section>
      <ProjectNav project="kixmi" />
    </>
  );
}
