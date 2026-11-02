// Widths must stay in sync with scripts/optimize-slides.mjs.
const WIDTHS = [1280, 1920, 2560] as const;

// Slides sit in a full-viewport snap section with p-6 (1.5rem) and md:p-12 (3rem).
const SIZES = "(min-width: 768px) calc(100vw - 6rem), calc(100vw - 3rem)";

const slides = [
  {
    id: "P_01",
    alt: "Cover slide. A large black JU monogram with the word PORTFOLIO underneath, centered on white.",
  },
  {
    id: "P_02",
    alt: "Introduction. “Hi! I’m Joanes Unzueta,” a product designer in Stockholm with a degree in Industrial Design and Product Development from Mondragon Unibertsitatea. The text covers growing up in Hernani, a user-centered design philosophy, and studying and working from Poland to Japan. Beside it, a person is silhouetted on a swing at sunset.",
  },
  {
    id: "P_03",
    alt: "DBZ Methodology. A portrait of Joanes beside an explanation of Mondragon’s user-centered design process, drawn as a six-stage loop: Strategic Research, Exploration, Ideation, Development, Implementation, and Launch, with milestones from Objective to Feedback.",
  },
  {
    id: "P_04",
    alt: "Kixmi, Bottled Kalimotxo. Dark hero slide with the red lips logo and a condensation-covered bottle labeled KIXMI ARDOA + KOLA.",
  },
  {
    id: "P_05",
    alt: "Bases of Kixmi and Merging of Forms. Trends for a premium bottled kalimotxo, mood images labeled Super Sense, Premium, Ecological Awareness, Here & Now, and Less Wine, plus sketches that merge a Burgundy wine bottle with a soda bottle.",
  },
  {
    id: "P_06",
    alt: "Kiss the Bottle and “Viva la Vida.” Brand story for Kixmi: a red lips mark, ink splatters, the wordmark KIXMI ARDOA + KOLA, and a person holding the bottle against a brick wall.",
  },
  {
    id: "P_07",
    alt: "Vidrala Master Glass. Kixmi won first prize in the 4th Vidrala Master Glass Design Contest. Jury comments sit beside the bottle standing in crushed ice.",
  },
  {
    id: "P_08",
    alt: "Kixmi final renders. One photograph shows the bottle held against a sunset city skyline; the other is a close-up of two people about to kiss with the bottle between them.",
  },
  {
    id: "P_09",
    alt: "(AD)JUST Tablet Holder Link. A black clamp with a knurled knob and steel shaft, shown with its circular mark on a white background.",
  },
  {
    id: "P_10",
    alt: "From a Need, an Answer, and Ideation and Sketches for the (AD)JUST tablet holder. The slide frames the need for a wheelchair tablet mount, then shows a symbol communication board, CAD studies, prototypes, and marker sketches.",
  },
  {
    id: "P_11",
    alt: "Final design of the (AD)JUST tablet holder. An assembly drawing shows the clamp on a wheelchair tray arm, and three renders explain a tool-free, one-size-fits-all grip.",
  },
  {
    id: "P_12",
    alt: "Final renders of the (AD)JUST link mounted on a wheelchair frame, beside a close-up of the black clamp, mounting plate, and adjustment knob.",
  },
  {
    id: "P_13",
    alt: "Flow Chair, breaking the rules of CNC. A light plywood armchair with a continuous curved back and arms, shown with a simple chair icon on white.",
  },
  {
    id: "P_14",
    alt: "Flow Chair construction and seamless edges. Dimensioned drawings of CNC-cut panels joined by internal pegs, next to a render and notes on flowing edges that break the usual flat-plane rules of CNC.",
  },
  {
    id: "P_15",
    alt: "Flow Chair final product. Three studio photographs of a person sitting in the plywood chair, seen from the side, the front, and a three-quarter view.",
  },
] as const;

function slideSrc(id: string, width: number, format: "avif" | "webp") {
  return `${import.meta.env.BASE_URL}slides/${id}-${width}.${format}`;
}

function slideSrcSet(id: string, format: "avif" | "webp") {
  return WIDTHS.map((width) => `${slideSrc(id, width, format)} ${width}w`).join(", ");
}

export default function App() {
  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-background text-foreground">
      <h1 className="sr-only">Joanes Unzueta, Industrial Design Engineer, Stockholm</h1>

      {slides.map((slide, index) => (
        <section
          key={slide.id}
          className="h-screen w-full snap-start snap-always flex items-center justify-center p-6 md:p-12"
        >
          <picture className="contents">
            <source type="image/avif" srcSet={slideSrcSet(slide.id, "avif")} sizes={SIZES} />
            <source type="image/webp" srcSet={slideSrcSet(slide.id, "webp")} sizes={SIZES} />
            <img
              src={slideSrc(slide.id, 1920, "webp")}
              alt={slide.alt}
              width={3840}
              height={1920}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "low"}
              decoding="async"
              className="max-h-full max-w-full object-contain"
            />
          </picture>
        </section>
      ))}

      <section className="h-screen w-full snap-start snap-always flex items-center justify-center px-8">
        <div className="text-center">
          <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-6">GET IN TOUCH</h2>

          <a
            href="mailto:joanes.unzueta@gmail.com"
            className="text-3xl md:text-6xl font-light tracking-tight hover:opacity-60 transition-opacity"
          >
            joanes.unzueta@gmail.com
          </a>

          <div className="mt-12 flex justify-center gap-8 text-xs tracking-[0.3em] text-muted-foreground uppercase">
            <a
              href="https://www.linkedin.com/in/joanes-unzueta/"
              className="hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>

            <a href="tel:+46761937969" className="hover:text-foreground transition-colors">
              +46 761 937 969
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
