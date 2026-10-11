import { useId, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
const quests = [
  {
    date: "DEC 2025",
    range: "December 2025 – July 2026",
    title: "AqiLizer",
    role: "BACKEND LEAD",
    body: "Built Java / Spring Boot APIs for air-quality-aware navigation. Async polyline sampling reduced API payload size by 80%+; Kalman filtering corrected GPS drift, with PostgreSQL storing geospatial data.",
    href: "#project-aqilizer",
    stack: "Java · Spring Boot · PostgreSQL",
  },
  {
    date: "FEB 2026",
    range: "February – June 2026",
    title: "Zeu",
    role: "PROJECT INTERN · FORMERLY NEXKIRANA",
    body: "Built an agentic support flow that retrieves refund policies and calls tools for order lookup, credits and human handoff. Model failover keeps the conversation moving when a provider is unavailable.",
    href: "#project-zeu",
    stack: "React · FastAPI · Gemini",
  },
  {
    date: "JUN 2026",
    range: "June – July 2026",
    title: "Magic Mehendi Art",
    role: "FULL-STACK DEVELOPER",
    body: "Shipped a booking and portfolio platform for a local business, with mobile-first layouts, local SEO and automated booking notifications through Twilio SMS and JavaMail.",
    href: "#project-mehendi",
    stack: "React 19 · Spring Boot 4 · PostgreSQL / Neon",
  },
  {
    date: "AUG 2026",
    range: "June – August 2026",
    title: "Zenhospitality",
    role: "FULL-STACK DEVELOPER",
    body: "Brought FastAPI and React onto cPanel shared hosting. WSGI routing and .htaccess rules serve the API and SPA from one origin; JWT cookies secure routes and a Gemini fallback chain handles model limits.",
    href: "#project-zen",
    stack: "React · FastAPI · cPanel",
  },
  {
    date: "SEP 2026",
    range: "23 September 2026",
    title: "Give Teas",
    role: "RUNNER-UP · KJSIM SIH PREQUALIFIERS",
    body: "Our team turned NASA FIRMS detections into classified thermal sources using DBSCAN, PostGIS and LightGBM. Recognized at the KJSIM Smart India Hackathon prequalifiers, with more development ahead.",
    href: "#championship",
    stack: "NASA FIRMS · PostGIS · LightGBM",
  },
];
export default function Timeline() {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const quest = quests[selected];
  const select = (next: number) => {
    setSelected(next);
    tabs.current[next]?.focus({ preventScroll: true });
    tabs.current[next]?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: "instant",
    });
  };
  return (
    <section id="timeline" className="section shell quest-timeline">
      <SectionHeading
        index="05"
        eyebrow="THE QUEST LOG"
        title="One build leads to the next."
        description="December 2025 → September 2026. Select a milestone to explore the work."
      />
      <div
        className="quest-tabs"
        role="tablist"
        aria-label="Project milestones"
      >
        {quests.map((item, i) => (
          <button
            key={item.title}
            ref={(node) => {
              tabs.current[i] = node;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            aria-controls={`${id}-panel`}
            aria-selected={selected === i}
            tabIndex={selected === i ? 0 : -1}
            onClick={() => setSelected(i)}
            onKeyDown={(event) => {
              let next = i;
              if (event.key === "ArrowRight") next = (i + 1) % quests.length;
              else if (event.key === "ArrowLeft")
                next = (i + quests.length - 1) % quests.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = quests.length - 1;
              else return;
              event.preventDefault();
              select(next);
            }}
          >
            <span className="quest-date">{item.date}</span>
            <span className="quest-node" aria-hidden="true">
              ✧
            </span>
            <span>{item.title}</span>
          </button>
        ))}
      </div>
      <article
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${selected}`}
        tabIndex={0}
        className="quest-panel"
      >
        <div>
          <span className="micro-label">{quest.role}</span>
          <h3>{quest.title}</h3>
          <p className="quest-range">{quest.range}</p>
        </div>
        <div>
          <p>{quest.body}</p>
          <p className="quest-stack">{quest.stack}</p>
          <a className="text-link" href={quest.href}>
            Explore {quest.title} <ArrowUpRight size={16} />
          </a>
        </div>
      </article>
    </section>
  );
}
