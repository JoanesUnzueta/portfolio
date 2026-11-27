import { useEffect, useState } from "react";

const links = [
  { href: "#work", id: "work", label: "Work" },
  { href: "#about", id: "about", label: "About" },
  { href: "#contact", id: "contact", label: "Contact" },
] as const;

function navTarget(sectionId: string) {
  if (sectionId === "about" || sectionId.startsWith("about") || sectionId === "method")
    return "about";
  if (sectionId === "contact") return "contact";
  if (
    sectionId === "work" ||
    sectionId.startsWith("kixmi") ||
    sectionId.startsWith("flow") ||
    sectionId.startsWith("adjust")
  ) {
    return "work";
  }
  return "";
}

function projectAccent(sectionId: string) {
  if (sectionId.startsWith("kixmi")) return "kixmi";
  if (sectionId.startsWith("flow")) return "flow";
  if (sectionId.startsWith("adjust")) return "adjust";
  return "";
}

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState("");
  const [accent, setAccent] = useState("");

  useEffect(() => {
    const probe = () => {
      setSolid(window.scrollY > 8);
      const line = 88;
      let current: HTMLElement | null = null;
      for (const section of document.querySelectorAll<HTMLElement>("section")) {
        const rect = section.getBoundingClientRect();
        if (
          rect.top <= line &&
          rect.bottom > line &&
          (!current || rect.top > current.getBoundingClientRect().top)
        ) {
          current = section;
        }
      }
      setDark(Boolean(current?.classList.contains("tone-dark")));
      setActive(navTarget(current?.id ?? ""));
      setAccent(projectAccent(current?.id ?? ""));
    };
    probe();
    window.addEventListener("scroll", probe, { passive: true });
    window.addEventListener("resize", probe);
    return () => {
      window.removeEventListener("scroll", probe);
      window.removeEventListener("resize", probe);
    };
  }, []);

  return (
    <header
      className={`nav${solid ? " solid" : ""}${dark ? " dark" : ""}${accent ? ` accent-${accent}` : ""}`}
    >
      <a className="brand" href="#top">
        <span className="brand-mark">JU</span>
        <span>Joanes Unzueta</span>
      </a>
      <nav aria-label="Site">
        {links.map((link) => (
          <a key={link.id} href={link.href} aria-current={active === link.id ? "true" : undefined}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
