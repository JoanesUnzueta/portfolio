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

function wavePath() {
  const x0 = 36;
  const width = 1128;
  const cy = 118;
  const amp = 46;
  const stepsCount = steps.length;
  const upper: string[] = [];
  const lower: string[] = [];
  const samples = stepsCount * 32;
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const x = x0 + t * width;
    const s = Math.sin(t * Math.PI * stepsCount) * amp;
    upper.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${(cy - s).toFixed(1)}`);
    lower.push(`L${x.toFixed(1)},${(cy + s).toFixed(1)}`);
  }
  return `${upper.join(" ") } ${lower.reverse().join(" ")} Z`;
}

export function Methodology() {
  const x0 = 36;
  const width = 1128;
  const cy = 118;
  const amp = 46;

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
        <svg viewBox="0 0 1200 280" role="img" aria-label="DBZ methodology: six steps from strategic research to launch.">
          <defs>
            <linearGradient id="dbz-wave" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#d5dcf3" />
              <stop offset="0.45" stopColor="#8b98cc" />
              <stop offset="1" stopColor="#6675b8" />
            </linearGradient>
          </defs>
          {milestones.map((_, index) => {
            const x = x0 + (index * width) / steps.length;
            return (
              <circle
                key={milestones[index]}
                cx={x}
                cy={cy}
                r="78"
                fill="none"
                stroke="#c4c4c4"
                strokeWidth="1.4"
              />
            );
          })}
          <path d={wavePath()} fill="url(#dbz-wave)" />
          {steps.map((step, index) => {
            const x = x0 + ((index + 0.5) * width) / steps.length;
            const lines = step.split(" ");
            return (
              <text key={step} x={x} y={cy} textAnchor="middle" className="wave-label">
                {lines.map((line, lineIndex) => (
                  <tspan key={line} x={x} dy={lineIndex === 0 ? (lines.length > 1 ? -6 : 4) : 14}>
                    {line}
                  </tspan>
                ))}
              </text>
            );
          })}
          {milestones.map((milestone, index) => {
            const x = x0 + (index * width) / steps.length;
            return (
              <g key={milestone}>
                <line x1={x} y1={cy + amp + 6} x2={x} y2={cy + amp + 46} stroke="#b5b5b5" strokeWidth="1.2" />
                <circle cx={x} cy={cy + amp + 6} r="2.2" fill="#8a8a8a" />
                <text x={x} y={cy + amp + 66} textAnchor="middle" className="wave-mile">
                  {milestone}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <EdgeLabel>Method | 02</EdgeLabel>
    </section>
  );
}
