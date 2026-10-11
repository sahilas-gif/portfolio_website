import { ArrowUpRight, ChevronDown, Github } from "lucide-react";
import SectionHeading from "../components/portfolio/SectionHeading";
import { originalProjects, type Project } from "../data/originalProjects";

const arbitrage: Project = {
  name: "Arbitrage",
  description:
    "A local Python research engine for observing live esports markets: asynchronous collection, market-state validation and reproducible event records.",
  tags: ["Python", "asyncio", "WebSockets", "Chrome DevTools"],
  image: "",
  githubUrl: "https://github.com/sahilas-gif/Arbitrage",
  details: {
    challenge:
      "Fast-moving markets are easy to misread when quotes are stale, a market is suspended, or series prices get confused with map-level prices.",
    solution:
      "A native asyncio engine separates collection, normalization, validation and alerts. Explicit observation states preserve missing data instead of fabricating prices or timestamps.",
    features: [
      "Market-aware observation frames with explicit timeout, disconnected and suspended states.",
      "SHA-256 payload provenance, sequence tracking and settlement look-ahead guards.",
      "Batch validation before append-only persistence; bounded execution and deterministic teardown.",
    ],
    impact:
      "A local research and surveillance tool with source-level auditability. No public hosted deployment or financial-return claim.",
  },
};
const selected = [
  {
    project: {
      ...originalProjects[0],
      githubUrl: "https://github.com/sahilas-gif/AqiLizer",
    },
    id: "aqilizer",
    title: "AqiLizer",
    category: "THE INVISIBLE ENEMY",
    status: "MOBILE APPLICATION",
    icon: "01",
    color: "spectral",
    brief:
      "Healthier routes through the city. Air-quality-aware navigation with stable GPS tracking.",
    notes: "Polyline sampling · Kalman filtering · Async batching",
  },
  {
    project: originalProjects[1],
    id: "zen",
    title: "Zenhospitality",
    category: "THE DEPLOYMENT GAUNTLET",
    status: "PRODUCTION WEBSITE",
    icon: "02",
    color: "gold",
    brief:
      "An AI travel platform shipped on shared hosting. Modern async architecture, real-world constraints.",
    notes: "ASGI → WSGI · JWT cookies · SPA routing",
  },
  {
    project: arbitrage,
    id: "arbitrage",
    title: "Arbitrage",
    category: "THE LATENCY ENCOUNTER",
    status: "LOCAL RESEARCH ENGINE",
    icon: "03",
    color: "rot",
    brief: arbitrage.description,
    notes: "State validation · WebSockets · Append-only records",
  },
];
function Dossier({ project }: { project: Project }) {
  return (
    <details className="dossier">
      <summary>
        Architecture dossier <ChevronDown size={15} />
      </summary>
      <div className="dossier-content">
        <h4>The challenge</h4>
        <p>{project.details.challenge}</p>
        <h4>The approach</h4>
        <p>{project.details.solution}</p>
        <h4>Engineering notes</h4>
        <ul>
          {project.details.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <h4>Outcome</h4>
        <p>{project.details.impact}</p>
      </div>
    </details>
  );
}
export default function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="shell">
        <SectionHeading
          index="03"
          eyebrow="SELECTED ENCOUNTERS"
          title="Felled Bosses"
          description="The hard parts are the interesting parts. Open a dossier to see how each was solved."
        />
        <div className="project-grid">
          {selected.map(
            ({
              project,
              id,
              title,
              category,
              status,
              icon,
              color,
              brief,
              notes,
            }) => (
              <article
                id={`project-${id}`}
                className={`project-card tone-${color} js-reveal`}
                key={id}
              >
                <div className="project-art">
                  {project.image ? (
                    <img
                      src={`${import.meta.env.BASE_URL}${project.image.slice(1)}`}
                      alt={`${title} project interface`}
                      loading="lazy"
                      width="600"
                      height="340"
                    />
                  ) : (
                    <div className="terminal-art" aria-hidden="true">
                      <div>
                        <span>●</span> ENGINE / OBSERVATION STREAM
                      </div>
                      <code>
                        quote → normalize → validate
                        <br />
                        <span>state: eligible</span>
                        <br />
                        payload_sha256: recorded
                        <br />
                        sequence: monotonic
                        <br />
                        <span>batch: validated → append</span>
                      </code>
                      <svg viewBox="0 0 300 60">
                        <path
                          d="M0 48h35l8-17 10 5 16-25 14 40 16-15 18 4 13-24 15 10 23-17 14 28 18-8 10 13 22-21 17 8 16-25 12 20h23"
                          fill="none"
                          stroke="currentColor"
                        />
                      </svg>
                    </div>
                  )}
                  <span className="project-number">{icon}</span>
                </div>
                <div className="project-content">
                  <p className="micro-label">{category}</p>
                  <h3>{title}</h3>
                  <p className="project-brief">{brief}</p>
                  <p className="deployment-stamp">
                    <span aria-hidden="true">◇</span>
                    {status}
                  </p>
                  <ul className="project-tags">
                    {project.tags.slice(0, 4).map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <div className="boss-meter">
                    <div>
                      <span>ENGINEERING NOTES</span>
                      <span>3 / 3 DOCUMENTED</span>
                    </div>
                    <meter
                      min="0"
                      max="3"
                      value="3"
                      aria-label={`${title}: three engineering notes documented`}
                    >
                      3 of 3
                    </meter>
                    <span className="boss-track" aria-hidden="true">
                      <i className="js-meter" />
                    </span>
                    <p>{notes}</p>
                  </div>
                  <Dossier project={project} />
                  <div className="project-links">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Github size={14} /> Source <ArrowUpRight size={13} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Visit website <ArrowUpRight size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ),
          )}
        </div>
        <details className="archive">
          <summary>
            <span>
              THE ARCHIVE{" "}
              <small>Four more projects. Same attention to the details.</small>
            </span>
            <span>
              Open archive <ChevronDown size={17} />
            </span>
          </summary>
          <div className="archive-grid">
            {originalProjects.slice(2).map((project) => (
              <article key={project.name}>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <Dossier project={project} />
                <div className="project-links">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      Visit project ↗
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Source ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
