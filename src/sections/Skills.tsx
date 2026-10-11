import { Flame, Sparkles, Swords, ArrowUpRight } from "lucide-react";
import SectionHeading from "../components/portfolio/SectionHeading";
const disciplines = [
  {
    title: "Pyromancies",
    subtitle: "BACKEND & INTELLIGENCE",
    icon: Flame,
    tone: "rot",
    skills: [
      "Python",
      "Java",
      "FastAPI",
      "Spring Boot",
      "PostgreSQL",
      "PostGIS",
      "LightGBM",
    ],
    evidence: "Thermal-source intelligence",
    link: "#championship",
    detail:
      "APIs, spatial pipelines, and classification.",
  },
  {
    title: "Sorceries",
    subtitle: "FRONTEND & EXPERIENCE",
    icon: Sparkles,
    tone: "spectral",
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "Flutter",
      "Tailwind CSS",
      "GSAP",
      "MapLibre",
    ],
    evidence: "Web & mobile interfaces",
    link: "#projects",
    detail:
      "Interfaces that make complex systems legible, responsive and useful.",
  },
  {
    title: "Ashes of War",
    subtitle: "DELIVERY & OPERATIONS",
    icon: Swords,
    tone: "gold",
    skills: [
      "Git",
      "Docker",
      "Celery",
      "Redis",
      "Supabase",
      "cPanel",
      "LiteSpeed",
    ],
    evidence: "Production deployment",
    link: "#project-zen",
    detail:
      "Background work, deployment constraints and reliable paths to production.",
  },
];
export default function Skills() {
  return (
    <section id="skills" className="section shell">
      <SectionHeading
        index="02"
        eyebrow="THE LOADOUT"
        title="Arsenal & Sorceries"
        description="Tools chosen for the problem. Proven through the work."
      />
      <div className="arsenal-grid">
        {disciplines.map(
          ({
            title,
            subtitle,
            icon: Icon,
            tone,
            skills,
            evidence,
            link,
            detail,
          }) => (
            <article
              key={title}
              className={`arsenal-card tone-${tone} js-reveal`}
            >
              <div className="arsenal-icon">
                <Icon size={29} strokeWidth={1.2} />
                <span aria-hidden="true">✧</span>
              </div>
              <p className="micro-label">{subtitle}</p>
              <h3>{title}</h3>
              <p className="card-copy">{detail}</p>
              <ul className="skill-tags">
                {skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
              <a className="card-evidence" href={link}>
                {evidence}
                <ArrowUpRight size={15} />
              </a>
            </article>
          ),
        )}
      </div>
    </section>
  );
}
