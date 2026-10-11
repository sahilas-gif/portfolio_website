import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
const links = [
  ["skills", "Arsenal"],
  ["championship", "Conquest"],
  ["projects", "Projects"],
  ["experience", "Journey"],
];
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth >= 900) setOpen(false);
    };
    document.addEventListener("keydown", keydown);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("keydown", keydown);
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="shell nav-inner">
        <a className="brand" href="#home" onClick={() => setOpen(false)}>
          <img
            src={`${import.meta.env.BASE_URL}crest.svg`}
            width="43"
            height="43"
            alt=""
          />
          <span>
            SAHIL SINGH<small>ENGINEER · BUILDER · PLAYER</small>
          </span>
        </a>
        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <a className="nav-summon" href="#contact">
          Summon me <ArrowUpRight size={15} />
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {links.map(([id, label], index) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            <span>0{index + 1}</span>
            {label}
            <ArrowUpRight size={18} />
          </a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)}>
          <span>05</span>Summon me
          <ArrowUpRight size={18} />
        </a>
      </nav>
    </header>
  );
}
