import { flowChairName } from "../projects";

const projects = [
  { id: "flow", href: "#flow", num: "01", label: flowChairName },
  { id: "adjust", href: "#adjust", num: "02", label: "(AD)JUST" },
  { id: "kixmi", href: "#kixmi", num: "03", label: "Kixmi" },
] as const;

type ProjectId = (typeof projects)[number]["id"];

export function ProjectNav({ project }: { project: ProjectId }) {
  const index = projects.findIndex((item) => item.id === project);
  const current = projects[index];
  const previous = projects[index - 1];
  const next = projects[index + 1];

  return (
    <nav className={`project-nav accent-${project}`} aria-label={`${current.label} project`}>
      {previous ? (
        <a href={previous.href}>
          <span>Previous</span>
          {previous.num} {previous.label}
        </a>
      ) : (
        <span />
      )}
      <a href="#top">Back to top</a>
      {next ? (
        <a href={next.href}>
          <span>Next</span>
          {next.num} {next.label}
        </a>
      ) : (
        <a href="#contact">
          <span>Next</span>
          Contact
        </a>
      )}
    </nav>
  );
}
