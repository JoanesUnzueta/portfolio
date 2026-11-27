import { useState, type CSSProperties, type PointerEvent } from "react";
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

/** Drawing space of the diagram. The loops sit on the line y = CY. */
const W = 1664;
const CY = 224;
const PIN = 252;
const H = CY + PIN;
const pitch = (W - 24) / steps.length;
/** Joints between the loops; each milestone hangs from one. */
const joint = milestones.map((_, index) => 12 + index * pitch);
const pct = (x: number) => `${((x / W) * 100).toFixed(3)}%`;

/** Lens-shaped loop between two joints. */
function eye(index: number) {
  const x0 = joint[index];
  const x1 = joint[index + 1];
  const a = pitch * 0.25;
  const b = 112;
  return `M${x0} ${CY}C${x0 + a} ${CY - b} ${x1 - a} ${CY - b} ${x1} ${CY}C${x1 - a} ${CY + b} ${x0 + a} ${CY + b} ${x0} ${CY}Z`;
}

/** The thin arcs that tie the steps together, as in the original DBZ chart. */
const arcs = [
  { from: 0, to: 2, up: true, r: 212 },
  { from: 1, to: 3, up: true, r: 212 },
  { from: 2, to: 4, up: true, r: 212 },
  { from: 4, to: 6, up: true, r: 212 },
  { from: 5, to: 6, up: true, r: 142 },
  { from: 0, to: 1, up: false, r: 141 },
  { from: 0, to: 2, up: false, r: 214 },
  { from: 2, to: 4, up: false, r: 214 },
  { from: 3, to: 5, up: false, r: 214 },
  { from: 4, to: 6, up: false, r: 214 },
] as const;

/**
 * A thin crescent along a half-ellipse between two joints. Like the original chart, it is
 * widest at the top and tapers to nothing where it meets the loops.
 */
function arcPath(arc: (typeof arcs)[number]) {
  const x0 = joint[arc.from];
  const x1 = joint[arc.to];
  const cx = (x0 + x1) / 2;
  const rx = (x1 - x0) / 2;
  const dir = arc.up ? -1 : 1;
  const start = Math.asin(Math.min(1, 34 / arc.r));
  const steps = 64;
  const outer: string[] = [];
  const inner: string[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const angle = start + t * (Math.PI - 2 * start);
    const half = 2.6 * Math.sin(t * Math.PI) ** 0.7;
    const x = cx - rx * Math.cos(angle);
    const y = CY + dir * arc.r * Math.sin(angle);
    const nx = -Math.cos(angle) / rx;
    const ny = (dir * Math.sin(angle)) / arc.r;
    const len = Math.hypot(nx, ny) || 1;
    outer.push(`${(x + (nx / len) * half).toFixed(1)} ${(y + (ny / len) * half).toFixed(1)}`);
    inner.unshift(`${(x - (nx / len) * half).toFixed(1)} ${(y - (ny / len) * half).toFixed(1)}`);
  }
  return `M${outer.join("L")}L${inner.join("L")}Z`;
}

/** Each loop is a little deeper in colour than the one before it. */
const eyeTint = [0.22, 0.34, 0.46, 0.58, 0.72, 0.86];

type Hot = { kind: "step"; index: number } | { kind: "mile"; index: number };

/** What lights up: the loop, and every arc that leaves from either of its joints. */
function lit(hot: Hot | null) {
  if (!hot) return null;
  const joints = hot.kind === "step" ? [hot.index, hot.index + 1] : [hot.index];
  const eyes =
    hot.kind === "step"
      ? [hot.index]
      : [hot.index - 1, hot.index].filter((index) => index >= 0 && index < steps.length);
  const arcIds = arcs
    .map((arc, index) => (joints.includes(arc.from) || joints.includes(arc.to) ? index : -1))
    .filter((index) => index >= 0);
  return { joints, eyes, arcs: arcIds };
}

export function Methodology() {
  const [hot, setHot] = useState<Hot | null>(null);
  const on = lit(hot);

  const handlers = (target: Hot) => ({
    onMouseEnter: () => setHot(target),
    onMouseLeave: () => setHot(null),
    onFocus: () => setHot(target),
    onBlur: () => setHot(null),
    onPointerUp: (event: PointerEvent) => {
      if (event.pointerType !== "touch") return;
      setHot((current) =>
        current?.kind === target.kind && current.index === target.index ? null : target,
      );
    },
  });

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

      <div className={`method-wave${on ? " is-hot" : ""}`}>
        <div className="method-diagram">
          <div className="method-board">
            <svg className="method-svg" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
              <g className="m-arcs">
                {arcs.map((arc, index) => (
                  <path
                    key={index}
                    d={arcPath(arc)}
                    className={on?.arcs.includes(index) ? "on" : undefined}
                  />
                ))}
              </g>
              <g className="m-pins">
                {joint.map((x, index) => (
                  <g key={index} className={on?.joints.includes(index) ? "on" : undefined}>
                    <line x1={x} y1={CY} x2={x} y2={H - 10} />
                    <circle cx={x} cy={H - 10} r={6} />
                  </g>
                ))}
              </g>
              <g className="m-eyes">
                {steps.map((step, index) => (
                  <path
                    key={step}
                    d={eye(index)}
                    style={{ "--tint": eyeTint[index] } as CSSProperties}
                    className={on?.eyes.includes(index) ? "on" : undefined}
                  />
                ))}
              </g>
            </svg>

            <ol className="method-steps">
              {steps.map((step, index) => (
                <li
                  key={step}
                  className={on?.eyes.includes(index) ? "on" : undefined}
                  style={{ left: pct((joint[index] + joint[index + 1]) / 2) }}
                >
                  <button
                    type="button"
                    aria-pressed={hot?.kind === "step" && hot.index === index}
                    {...handlers({ kind: "step", index })}
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
                className={
                  [
                    index === 0 ? "edge start" : index === milestones.length - 1 ? "edge end" : "",
                    on?.joints.includes(index) ? "on" : "",
                  ]
                    .join(" ")
                    .trim() || undefined
                }
                style={{ left: pct(joint[index]) }}
              >
                <button
                  type="button"
                  aria-pressed={hot?.kind === "mile" && hot.index === index}
                  {...handlers({ kind: "mile", index })}
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
      <EdgeLabel>Method | 03</EdgeLabel>
    </section>
  );
}
