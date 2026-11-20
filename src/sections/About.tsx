import { EdgeLabel } from "../components/EdgeLabel";
import { Photo } from "../components/Photo";

export function About() {
  return (
    <>
      <section className="about tone-dark" id="about">
        <Photo
          src="images/web/intro-swing.webp"
          alt="Joanes Unzueta in silhouette, sitting on a swing above the sea at sunset."
          width={1013}
          height={571}
          className="about-photo"
        />
        <div className="about-scrim" aria-hidden="true" />
        <div className="about-copy">
          <h2>Hi, I'm Joanes Unzueta.</h2>
          <p>
            I'm a product designer in Stockholm. I studied Industrial Design and Product Development
            at Mondragon Unibertsitatea.
          </p>
        </div>
        <EdgeLabel>Intro | 02</EdgeLabel>
      </section>

      <section className="slide-text" id="about-origin">
        <div className="copy">
          <p className="subtitle">Origin</p>
          <h2>Hernani</h2>
          <p>
            I grew up in Hernani, in the Basque Country. A technical mindset and a wish to make
            things led me to industrial design.
          </p>
        </div>
        <EdgeLabel>Origin</EdgeLabel>
      </section>

      <section className="slide-text" id="about-practice">
        <div className="copy">
          <p className="subtitle">Practice</p>
          <h2>Arfve, then further</h2>
          <p>
            Most recently I've been an Industrial Designer at <strong>Arfve</strong>, in consumer
            electronics.
          </p>
          <p>
            At Mondragon I worked in multidisciplinary teams and kept the user at the centre.
            Erasmus+ and MEXT took me from Poland to Japan.
          </p>
          <p className="actions">
            <a className="btn" href="#contact">
              Get in touch
            </a>
          </p>
        </div>
        <EdgeLabel>Practice</EdgeLabel>
      </section>
    </>
  );
}
