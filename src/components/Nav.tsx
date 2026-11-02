import { useEffect, useState } from "react";

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const probe = () => {
      setSolid(window.scrollY > 8);
      const line = 88;
      let current: HTMLElement | null = null;
      for (const section of document.querySelectorAll<HTMLElement>("section")) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= line && rect.bottom > line && (!current || rect.top > current.getBoundingClientRect().top)) {
          current = section;
        }
      }
      setDark(Boolean(current?.classList.contains("tone-dark")));
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
    <header className={`nav${solid ? " solid" : ""}${dark ? " dark" : ""}`}>
      <a className="brand" href="#top">
        <span className="brand-mark">JU</span>
        <span>Joanes Unzueta</span>
      </a>
      <nav aria-label="Site">
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}
