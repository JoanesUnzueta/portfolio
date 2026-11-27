import { useState, type CSSProperties, type PointerEvent } from "react";
import { EdgeLabel } from "../components/EdgeLabel";
import { asset } from "../asset";
import { waveArcs, waveEyes } from "../dbzWave";

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

/** Board units from Portfolio.ai, page 8. The loops sit on the line y = CY. */
const X0 = 110;
const Y0 = 310;
const W = 1690;
const H = 492;
const CY = 539.6;
const PIN_END = 790;
/** Joints where neighbouring loops overlap; each milestone hangs from one. */
const joint = [127, 415.2, 685.7, 955.2, 1224.7, 1495.2, 1783.4];
const eyeCentre = waveEyes.map((eye) => eye.x + 153.7);
const pct = (x: number) => `${(((x - X0) / W) * 100).toFixed(3)}%`;

/** Half-ellipses fitted over the original arcs, so each one can light up on its own. */
const arcs = [
  { from: 0, to: 2, up: true, r: 218 },
  { from: 1, to: 3, up: true, r: 218 },
  { from: 2, to: 4, up: true, r: 218 },
  { from: 4, to: 6, up: true, r: 218 },
  { from: 5, to: 6, up: true, r: 140 },
  { from: 0, to: 1, up: false, r: 140 },
  { from: 0, to: 2, up: false, r: 215 },
  { from: 2, to: 4, up: false, r: 215 },
  { from: 3, to: 5, up: false, r: 215 },
  { from: 4, to: 6, up: false, r: 215 },
] as const;

/** A thin crescent along one arc: full width over most of it, tapering where it meets the loops. */
function arcPath(arc: (typeof arcs)[number]) {
  const x0 = joint[arc.from];
  const x1 = joint[arc.to];
  const cx = (x0 + x1) / 2;
  const rx = (x1 - x0) / 2;
  const dir = arc.up ? -1 : 1;
  const start = Math.asin(Math.min(1, 40 / arc.r));
  const steps = 72;
  const outer: string[] = [];
  const inner: string[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const angle = start + t * (Math.PI - 2 * start);
    const half = 3 * Math.sin(t * Math.PI) ** 0.35;
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

/** The opacities of the six loops in the original chart. */
const eyeTint = [0.15, 0.3, 0.45, 0.6, 0.75, 0.9];

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
            <svg className="method-svg" viewBox={`${X0} ${Y0} ${W} ${H}`} aria-hidden="true">
              <g className="m-base">
                {waveArcs.map((d, index) => (
                  <path key={index} d={d} />
                ))}
              </g>
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
                    <line x1={x} y1={CY} x2={x} y2={PIN_END} />
                    <circle cx={x} cy={PIN_END} r={6} />
                  </g>
                ))}
              </g>
              <g className="m-eyes">
                {waveEyes.map((eye, index) => (
                  <path
                    key={index}
                    d={eye.d}
                    transform={`translate(${eye.x} ${eye.y})`}
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
                  style={{ left: pct(eyeCentre[index]) }}
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
