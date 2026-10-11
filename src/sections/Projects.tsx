import { ArrowUpRight, ChevronDown, Github } from "lucide-react";
import SectionHeading from "../components/portfolio/SectionHeading";
import ProjectGallery from "../components/portfolio/ProjectGallery";
import { originalProjects, type Project } from "../data/originalProjects";
import { projectMedia } from "../data/projectMedia";
import { conquest } from "../data/conquest";

const giveTeas: Project = {
  name: "Give Teas",
  description:
    "Satellite detections become a shortlist of persistent industrial sources and unexplained thermal activity. Runner-Up at the KJSIM Smart India Hackathon prequalifiers.",
  image: "/projects/kjsim-award-3.jpg",
  tags: ["FastAPI", "PostGIS", "LightGBM", "MapLibre"],
  githubUrl: conquest.repo,
  details: {
    challenge:
      "NASA FIRMS detects heat, but a hot pixel alone cannot distinguish a refinery flare from a fire that needs investigation.",
    solution:
      "DBSCAN groups detections into persistent sources. Rules handle clear cases, a weak-label LightGBM classifier handles the remainder, and Isolation Forest flags unexplained activity.",
    features: [
      "NASA FIRMS ingestion and PostGIS storage on Supabase.",
      "Spatial clustering and public OpenStreetMap / government reference records.",
      "React + MapLibre investigation interface, with Gemini incident summaries and natural-language queries.",
    ],
    impact:
      "Runner-Up, KJSIM Hackathon 2026, SIH Pre-qualifiers. Built as a team using free public data and CPU inference; agency use is a proposed application, not a claimed deployment.",
  },
};
const selected = [
  {
    project: {
      ...originalProjects[0],
      githubUrl: "https://github.com/sahilas-gif/AqiLizer",
    },
    id: "aqilizer",
    category: "GEOSPATIAL NAVIGATION",
    status: "MOBILE APPLICATION",
    notes: "Async sampling · Kalman filtering · PostgreSQL",
  },
  {
    project: originalProjects[1],
    id: "zen",
    category: "THE DEPLOYMENT GAUNTLET",
    status: "PRODUCTION WEBSITE",
    notes: "ASGI → WSGI · JWT cookies · SPA routing",
  },
  {
    project: originalProjects[2],
    id: "mehendi",
    category: "BOOKINGS INTO BUSINESS",
    status: "PRODUCTION WEBSITE",
    notes: "Spring Boot · Booking notifications · Local SEO",
  },
  {
    project: giveTeas,
    id: "conquest",
    category: "THE THERMAL SIGNAL",
    status: "KJSIM PREQUALIFIERS · RUNNER-UP",
    notes: "NASA FIRMS · DBSCAN · Weak-label classification",
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
function Links({ project }: { project: Project }) {
  return (
    <div className="project-links">
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noreferrer">
          <Github size={14} /> Source <ArrowUpRight size={13} />
        </a>
      )}
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noreferrer">
          Visit website <ArrowUpRight size={13} />
        </a>
      )}
    </div>
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
          description="Real interfaces. Real constraints. Inspect any image, then open the architecture dossier."
        />
        <div className="project-grid cinematic-projects">
          {selected.map(({ project, id, category, status, notes }, i) => (
            <article
              id={`project-${id}`}
              className="project-card js-reveal"
              key={id}
            >
              <div className="project-card-label">
                <span>ENCOUNTER / 0{i + 1}</span>
                <span>ENGINEERING RECORD</span>
              </div>
              <ProjectGallery images={projectMedia[id]} title={project.name} />
              <div className="project-content">
                <p className="micro-label">{category}</p>
                <h3>{project.name}</h3>
                <p className="project-brief">{project.description}</p>
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
                    aria-label={`${project.name}: three engineering notes documented`}
                  >
                    3 of 3
                  </meter>
                  <span className="boss-track" aria-hidden="true">
                    <i className="js-meter" />
                  </span>
                  <p>{notes}</p>
                </div>
                <Dossier project={project} />
                <Links project={project} />
              </div>
            </article>
          ))}
        </div>
        <div className="project-archive">
          <h3 className="archive-heading">Further expeditions</h3>
          <p>Support systems, business intelligence, and digital operations.</p>
          <div className="archive-media-grid">
            {originalProjects.slice(3).map((project, i) => (
              <article
                className="project-card js-reveal"
                id={`project-${["zeu", "ocean", "savvy"][i]}`}
                key={project.name}
              >
                <ProjectGallery
                  images={projectMedia[["zeu", "ocean", "savvy"][i]]}
                  title={project.name}
                />
                <div className="project-content">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <Dossier project={project} />
                  <Links project={project} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
