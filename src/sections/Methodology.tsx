import { EdgeLabel } from "../components/EdgeLabel";
import { asset } from "../asset";

const steps = [
  "Strategic Research",
  "Exploration",
  "Ideation",
  "Development",
  "Implementation",
  "Launch",
];

const milestones = [
  "Objective",
  "Opportunity",
  "Brief",
  "Ideas",
  "Prototype",
  "Product / Service",
  "Feedback",
];

/** Centres of the six open loops in images/wave.svg, as a percentage of its viewBox. */
const stepX = [9.44, 25.66, 41.89, 58.11, 74.34, 90.56];

/** Joints between those loops, where the milestones sit underneath the graphic. */
const mileX = [1.26, 17.55, 33.77, 50, 66.23, 82.45, 98.68];

export function Methodology() {
  return (
    <section className="method" id="method">
      <div className="method-head">
        <img
          src={asset("images/web/dbz-portrait.webp")}
          alt="Portrait of Joanes Unzueta."
          width={340}
          height={340}
        />
        <div>
          <h2>DBZ Methodology</h2>
          <p>
            The DBZ Methodology, developed at Mondragon, is my main approach to design. Based on
            the well-known concept of Design Thinking, it's a user-centred process that values
            people's input and integrates their knowledge throughout its six steps. The goal is to
            identify and bring to life new products and services with real added value. Its four
            pillars are: user input, considering the entire consumer experience, balancing
            analytical and creative thinking, and turning opportunities into tangible solutions.
          </p>
        </div>
      </div>
      <div className="method-wave">
        <div className="method-diagram">
          <div className="method-board">
            <img
              src={asset("images/wave.svg")}
              alt=""
              width={1664}
              height={449}
            />
            <ol className="method-steps">
              {steps.map((step, index) => (
                <li key={step} style={{ left: `${stepX[index]}%` }}>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <ol className="method-miles">
            {milestones.map((milestone, index) => (
              <li
                key={milestone}
                className={index === 0 ? "edge start" : index === milestones.length - 1 ? "edge end" : undefined}
                style={{ left: `${mileX[index]}%` }}
              >
                {milestone}
              </li>
            ))}
          </ol>
        </div>
        <p className="sr-only">
          Six steps, in order: {steps.join(", ")}. Milestones underneath: {milestones.join(", ")}.
        </p>
      </div>
      <EdgeLabel>Method | 02</EdgeLabel>
    </section>
  );
}
