import { Photo } from "../components/Photo";
import { flowChairName } from "../projects";

export function Cover() {
  return (
    <section className="cover" id="top">
      <Photo
        src="images/web/cover-mark.webp"
        alt="Blurred black JU monogram with the word PORTFOLIO."
        width={1120}
        height={940}
        className="mark"
        priority
      />
      <div className="cover-foot">
        <div className="identity">
          <h1>Joanes Unzueta</h1>
          <p>Industrial Design Engineer</p>
          <p>Product Developer</p>
          <p>CAD · CNC · Prototyping</p>
          <p>– 2026 –</p>
        </div>
        <nav className="index" id="work" aria-label="Projects">
          <a href="#flow">
            <span>01</span> {flowChairName}
          </a>
          <a href="#adjust">
            <span>02</span> (AD)JUST
          </a>
          <a href="#kixmi">
            <span>03</span> Kixmi
          </a>
        </nav>
      </div>
    </section>
  );
}
