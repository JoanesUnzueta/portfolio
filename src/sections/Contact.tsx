import { EdgeLabel } from "../components/EdgeLabel";

export function Contact() {
  return (
    <section className="contact" id="contact">
      <p className="eyebrow">Contact</p>
      <h2>Let's talk</h2>
      <p className="where">Based in Stockholm, Sweden.</p>
      <a className="mail" href="mailto:joanes.unzueta@gmail.com">
        joanes.unzueta@gmail.com
      </a>
      <div className="contact-links">
        <a href="https://www.linkedin.com/in/joanes-unzueta/" rel="noreferrer" target="_blank">
          LinkedIn
        </a>
        <a href="tel:+46761937969">+46 76 193 79 69</a>
      </div>
      <EdgeLabel>Contact | 16</EdgeLabel>
    </section>
  );
}
