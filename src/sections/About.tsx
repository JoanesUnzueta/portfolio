import { EdgeLabel } from "../components/EdgeLabel";
import { Photo } from "../components/Photo";

export function About() {
  return (
    <section className="about" id="about">
      <Photo
        src="images/web/intro-swing.webp"
        alt="Joanes Unzueta in silhouette, sitting on a swing above the sea at sunset."
        width={1013}
        height={571}
        className="about-photo"
      />
      <div className="about-scrim" aria-hidden="true" />
      <div className="about-copy">
        <h2>Hi! I'm Joanes Unzueta.</h2>
        <p>
          I'm a product designer based in Stockholm, Sweden, with a background in Industrial Design
          and Product Development from Mondragon Unibertsitatea. I grew up in Hernani, a small town
          in the Basque Country, where I developed both a technical mindset and a curiosity for
          creativity — a blend that led me naturally to industrial design, where engineering
          precision meets human-centred creativity.
        </p>
        <p>
          Most recently I've been working as an Industrial Designer at <strong>Arfve</strong>, in
          consumer electronics.
        </p>
        <p>
          At Mondragon, collaboration was at the core of every project: working in multidisciplinary
          teams taught me to approach challenges from different perspectives, always keeping the
          user at the centre. My design philosophy is about balancing aesthetics and functionality
          to create meaningful solutions.
        </p>
        <p>
          I've studied and worked across several countries — from Poland to Japan — thanks to
          scholarships such as Erasmus+ and MEXT. These experiences shaped my ability to adapt,
          communicate and design with a truly global perspective.
        </p>
        <p className="actions">
          <a className="btn" href="#contact">
            Get in touch
          </a>
        </p>
      </div>
      <EdgeLabel>Intro | 02</EdgeLabel>
    </section>
  );
}
