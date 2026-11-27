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
  return widths
    .map((width) => `${asset(`images/kixmi/${name}-${width}.${ext}`)} ${width}w`)
    .join(", ");
}

function KixmiTitle({ hit, rest, kicker }: { hit: string; rest: string; kicker: string }) {
  return (
    <div className="kixmi-title">
      <h2>
        <span className="kixmi-hit">{hit}</span>
        <span className="kixmi-rest">{rest}</span>
      </h2>
      <p className="subtitle">{kicker}</p>
    </div>
  );
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
          <source
            type="image/avif"
            srcSet={renderSrcSet(shot.name, shot.widths, "avif")}
            sizes={sizes}
          />
        )}
        <source
          type="image/webp"
          srcSet={renderSrcSet(shot.name, shot.widths, "webp")}
          sizes={sizes}
        />
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
          src="images/web/kixmi-hero-neck.webp"
          alt="Product visualisation of the Kixmi bottle: the wet neck with the vertical KIXMI logo, filling the right of the frame."
          width={2540}
          height={2160}
        />
        <div className="bleed-scrim" aria-hidden="true" />
        <div className="hero-copy">
          <div className="bleed-title">
            <p className="num">/01</p>
            <h2>Kixmi</h2>
            <div className="bleed-body">
              <p className="subtitle">“Berotu Morruak”</p>
              <SpecLine items={projectSpecs.kixmi} />
              <p className="lede">
                An award-winning glass packaging concept developed for a sustainability-focused
                competition, proposing a low-impact production and recycling process through an
                original, practical, and manufacturable design.
              </p>
            </div>
          </div>
        </div>
        <EdgeLabel>Kixmi | 04</EdgeLabel>
      </section>

      <section className="split tall accent-kixmi" id="kixmi-contest">
        <div className="copy">
          <KixmiTitle hit="Bases" rest="of Kixmi" kicker="Trends" />
          <p>
            Kalimotxo is not seen from a premium perspective. We wanted a bottle for the urban
            nomad, with a low environmental impact, including production and recycling, that is
            still practical to use every day.
          </p>
          <p>
            We designed it ready to manufacture: an original, practical shape, a low-impact
            production and recycling process, and everyday use.
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
        <EdgeLabel>Kixmi | 05</EdgeLabel>
      </section>

      <section className="compare accent-kixmi" id="kixmi-bottles">
        <div className="compare-head">
          <KixmiTitle hit="Merging" rest="of forms" kicker="Concept Development" />
          <p>
            The union of a burgundy wine bottle and a soda bottom: borgoña with the base of a soda
            bottle. It uses the yearly wine from close wineries, supporting local businesses. A
            drink made by young people, for young people.
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
        <EdgeLabel>Kixmi | 06</EdgeLabel>
      </section>

      <section className="split accent-kixmi" id="kixmi-result">
        <div className="copy">
          <KixmiTitle hit="1st" rest="prize" kicker="Result" />
          <p>
            An innovative glass container designed for low environmental impact, combining
            sustainable production and recycling with everyday usability. Its original yet feasible
            design reimagines old traditions, and was selected as the winning entry of the 4th
            edition of the Vidrala Master Glass Design Contest.
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
        <figure className="lineup-wrap">
          <img
            className="contest-mark"
            src={asset("images/web/vidrala-contest-wordmark.webp")}
            alt="Vidrala Master Glass Design Contest"
            width={1490}
            height={251}
          />
          <img
            className="lineup"
            src={asset("images/web/kixmi-render-group-vidrala.webp")}
            alt="Product visualisation of the Kixmi bottle in front of other contest bottles, including a faded Vidrala bottle."
            width={670}
            height={550}
          />
        </figure>
        <EdgeLabel>Kixmi | 07</EdgeLabel>
      </section>

      <section className="kixmi-life accent-kixmi" id="kixmi-life">
        <div className="copy">
          <KixmiTitle hit="In" rest="context" kicker="Lifestyle" />
          <p>At sunset, and at the bar next to its six-pack carrier.</p>
        </div>
        <div className="life-pair">
          <figure>
            <picture>
              <source
                type="image/avif"
                srcSet={renderSrcSet("kixmi-sunset", [640, 960, 1440], "avif")}
                sizes="(min-width: 981px) 36vw, 100vw"
              />
              <img
                src={asset("images/kixmi/kixmi-sunset-1440.webp")}
                srcSet={renderSrcSet("kixmi-sunset", [640, 960, 1440], "webp")}
                sizes="(min-width: 981px) 36vw, 100vw"
                alt="Product visualisation of a hand holding a Kixmi bottle against a sunset over a city."
                width={1440}
                height={1440}
                loading="lazy"
                decoding="async"
              />
            </picture>
            <figcaption className="caption">At sunset</figcaption>
          </figure>
          <figure>
            <picture>
              <source
                type="image/avif"
                srcSet={renderSrcSet("kixmi-sixpack", [640, 1024, 1536], "avif")}
                sizes="(min-width: 981px) 54vw, 100vw"
              />
              <img
                src={asset("images/kixmi/kixmi-sixpack-1536.webp")}
                srcSet={renderSrcSet("kixmi-sixpack", [640, 1024, 1536], "webp")}
                sizes="(min-width: 981px) 54vw, 100vw"
                alt="Product visualisation of a Kixmi bottle on a wet bar counter beside the black and red six-pack carrier with the lips mark."
                width={1536}
                height={1024}
                loading="lazy"
                decoding="async"
              />
            </picture>
            <figcaption className="caption">Six-pack carrier</figcaption>
          </figure>
        </div>
        <EdgeLabel>Kixmi | 08</EdgeLabel>
      </section>
      <section className="renders accent-kixmi" id="kixmi-renders">
        <div className="copy">
          <KixmiTitle hit="Final" rest="renders" kicker="Result" />
          <p>In the hand, on ice, and as a studio set.</p>
        </div>
        <div className="render-gallery">
          {kixmiRenders.map((render) => (
            <KixmiRenderShot key={render.name} shot={render} />
          ))}
        </div>
        <EdgeLabel>Kixmi | 09</EdgeLabel>
      </section>
      <ProjectNav project="kixmi" />
    </>
  );
}
