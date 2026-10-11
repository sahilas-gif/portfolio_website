import { useEffect, useRef, useState } from "react";
import { Check, Map, X, ArrowUpRight } from "lucide-react";
const chapters = [
  { id: "home", label: "The bonfire", detail: "Character & introduction" },
  {
    id: "championship",
    label: "The conquest",
    detail: "Hackathon & architecture",
  },
  { id: "skills", label: "The arsenal", detail: "Tools & capabilities" },
  {
    id: "projects",
    label: "Felled bosses",
    detail: "Selected project dossiers",
  },
  { id: "experience", label: "The journey", detail: "Experience & education" },
  { id: "timeline", label: "Quest timeline", detail: "Builds & milestones" },
  { id: "contact", label: "Summon sign", detail: "Contact & collaboration" },
];
/** The reference's level-select idea, with no progression gates or loading screens. */
export default function ChapterMap() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("home");
  const [visited, setVisited] = useState(() => new Set(["home"]));
  const button = useRef<HTMLButtonElement>(null);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const marker = window.innerHeight * 0.45;
      let active = chapters[0].id;
      for (const chapter of chapters) {
        if (
          (document.getElementById(chapter.id)?.getBoundingClientRect().top ??
            Infinity) <= marker
        )
          active = chapter.id;
      }
      setCurrent(active);
      setVisited((old) => (old.has(active) ? old : new Set([...old, active])));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const click = (event: PointerEvent) => {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", key);
    document.addEventListener("pointerdown", click);
    return () => {
      document.removeEventListener("keydown", key);
      document.removeEventListener("pointerdown", click);
    };
  }, [open]);
  return (
    <div className="chapter-map" ref={container}>
      <button
        ref={button}
        type="button"
        className="chapter-map-toggle"
        aria-expanded={open}
        aria-controls="chapter-select"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={15} /> : <Map size={15} />}
        <span>CHAPTER SELECT</span>
        <span className="chapter-progress">
          {String(
            Math.max(
              chapters.findIndex((chapter) => chapter.id === current) + 1,
              1,
            ),
          ).padStart(2, "0")}{" "}
          / {String(chapters.length).padStart(2, "0")}
        </span>
      </button>
      <nav
        id="chapter-select"
        className="chapter-select"
        aria-label="Chapter selection"
        hidden={!open}
      >
        <div className="chapter-select-heading">
          <img
            src={`${import.meta.env.BASE_URL}crest.svg`}
            width="27"
            height="27"
            alt=""
          />
          <span>
            YOUR JOURNEY
            <small>
              {visited.size} of {chapters.length} locations visited
            </small>
          </span>
        </div>
        <ol>
          {chapters.map((chapter, index) => (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                aria-current={current === chapter.id ? "location" : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="chapter-index">
                  {visited.has(chapter.id) ? (
                    <Check size={11} aria-label="Visited" />
                  ) : (
                    String(index + 1).padStart(2, "0")
                  )}
                </span>
                <span>
                  {chapter.label}
                  <small>{chapter.detail}</small>
                </span>
                <ArrowUpRight size={13} />
              </a>
            </li>
          ))}
        </ol>
        <p>Every chapter is open. Choose your path.</p>
      </nav>
    </div>
  );
}
