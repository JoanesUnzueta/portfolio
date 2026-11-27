import { useState } from "react";
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

type Hot =
  | { kind: "step"; index: number }
  | { kind: "mile"; index: number };

/** A step joins the milestone on its left to the one on its right. */
function connected(hot: Hot) {
  if (hot.kind === "step") {
    return { steps: [hot.index], miles: [hot.index, hot.index + 1] };
  }
  const steps = [hot.index - 1, hot.index].filter((index) => index >= 0 && index < stepX.length);
  return { steps, miles: [hot.index] };
}

/** Soft window over a step, or over the two steps a milestone joins. */
function mask(hot: Hot) {
  if (hot.kind === "step") {
    return `radial-gradient(ellipse 15% 86% at ${stepX[hot.index]}% 46%, #000 40%, transparent 66%)`;
  }
  const left = hot.index === 0 ? 0 : stepX[hot.index - 1];
  const right = hot.index >= stepX.length ? 100 : stepX[Math.min(hot.index, stepX.length - 1)];
  const center = (left + right) / 2;
  const span = Math.max(24, right - left + 16);
  return `radial-gradient(ellipse ${span}% 92% at ${center}% 46%, #000 48%, transparent 76%)`;
}

export function Methodology() {
  const [hot, setHot] = useState<Hot | null>(null);
  const links = hot ? connected(hot) : null;
  const veil = hot ? mask(hot) : null;

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
          <p className="subtitle">How I work</p>
          <p>
            Developed at Mondragon, DBZ is my main approach. It is Design Thinking, centred on the
            user.
          </p>
          <p>
            Six steps carry people's knowledge through the work. The aim is products and services
            with real added value.
          </p>
          <p>
            Four pillars: user input, the whole consumer experience, analytical and creative
            thinking together, and opportunities turned into tangible solutions.
          </p>
        </div>
      </div>
      <div className={`method-wave${hot ? " is-hot" : ""}`}>
        <div className="method-diagram">
          <div className="method-board">
            <img
              className="wave-base"
              src={asset("images/wave.svg")}
              alt=""
              width={1664}
              height={449}
            />
            <img
              className="wave-hot"
              src={asset("images/wave.svg")}
              alt=""
              width={1664}
              height={449}
              style={
                veil
                  ? { maskImage: veil, WebkitMaskImage: veil }
                  : undefined
              }
            />
            <ol className="method-steps">
              {steps.map((step, index) => (
                <li key={step} style={{ left: `${stepX[index]}%` }}>
                  <button
                    type="button"
                    className={links?.steps.includes(index) ? "on" : undefined}
                    aria-pressed={hot?.kind === "step" && hot.index === index}
                    onMouseEnter={() => setHot({ kind: "step", index })}
                    onMouseLeave={() => setHot(null)}
                    onFocus={() => setHot({ kind: "step", index })}
                    onBlur={() => setHot(null)}
                    onPointerUp={(event) => {
                      if (event.pointerType !== "touch") return;
                      setHot((current) =>
                        current?.kind === "step" && current.index === index ? null : { kind: "step", index },
                      );
                    }}
                  >
                    {step}
                  </button>
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
                <button
                  type="button"
                  className={links?.miles.includes(index) ? "on" : undefined}
                  aria-pressed={hot?.kind === "mile" && hot.index === index}
                  onMouseEnter={() => setHot({ kind: "mile", index })}
                  onMouseLeave={() => setHot(null)}
                  onFocus={() => setHot({ kind: "mile", index })}
                  onBlur={() => setHot(null)}
                  onPointerUp={(event) => {
                    if (event.pointerType !== "touch") return;
                    setHot((current) =>
                      current?.kind === "mile" && current.index === index ? null : { kind: "mile", index },
                    );
                  }}
                >
                  {milestone}
                </button>
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
