import { EdgeLabel } from "../components/EdgeLabel";
import { flowChairName } from "../projects";

const projects = [
  { href: "#flow", num: "01", label: flowChairName },
  { href: "#adjust", num: "02", label: "(AD)JUST" },
  { href: "#kixmi", num: "03", label: "Kixmi" },
];

export function Contact() {
  return (
    <section className="contact" id="contact">
      <h2>Let's talk</h2>
      <p className="where">Industrial design engineer in Stockholm, Sweden.</p>
      <a className="mail" href="mailto:joanes.unzueta@gmail.com">
        joanes.unzueta@gmail.com
      </a>
      <div className="contact-links">
        <a href="https://www.linkedin.com/in/joanes-unzueta/" rel="noreferrer" target="_blank">
          LinkedIn
        </a>
        <a href="tel:+46761937969">+46 76 193 79 69</a>
      </div>
      <nav className="index contact-index" aria-label="Projects">
        {projects.map((project) => (
          <a key={project.href} href={project.href}>
            <span>{project.num}</span> {project.label}
          </a>
        ))}
      </nav>
      <a className="to-top" href="#top">
        Back to top
      </a>
      <EdgeLabel>Contact | 21</EdgeLabel>
    </section>
  );
}
