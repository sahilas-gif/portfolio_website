import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../components/portfolio/SectionHeading";
const chapters = [
  {
    title: "Building for real businesses",
    subtitle: "ZENHOSPITALITY / FULL-STACK DEVELOPMENT",
    body: "Shipped Zenhospitality’s AI travel platform on shared hosting and built a booking platform for a local Mehendi business. Deployment, routing and notifications were part of the work.",
    link: "#projects",
    anchor: "Explore the builds",
  },
  {
    title: "Research into working software",
    subtitle: "ZEU / FORMERLY NEXKIRANA",
    body: "Built an agentic support flow with React, FastAPI and Gemini: refund-policy retrieval, order lookup, credits and human handoff, with model failover. Project internship, February–June 2026.",
    link: "https://github.com/sahilas-gif/chatbot_in_marketing",
    anchor: "Read the source",
  },
  {
    title: "Understanding the bottlenecks",
    subtitle: "SAVVYDIGITECH / CII DxEDGE",
    body: "Completed an IT consultancy engagement mapping digital workflows across ERP, security and cloud operations. Proposed changes grounded in what the team could realistically implement.",
    link: "#projects",
    anchor: "See the project archive",
  },
];
export default function Experience() {
  return (
    <section id="experience" className="section shell">
      <SectionHeading
        index="04"
        eyebrow="THE JOURNEY"
        title="Lessons beyond the bonfire."
        description="Experience is what remains after the problem is solved."
      />
      <div className="journey-grid">
        <div className="journey-portrait js-reveal">
          <img
            src={`${import.meta.env.BASE_URL}art/bonfire-rest.webp`}
            alt="Fantasy illustration of a warrior resting beside a sword bonfire beneath a distant golden tree"
            loading="lazy"
            width="1122"
            height="1402"
          />
          <div>
            <span className="eyebrow">A MOMENT AT THE BONFIRE</span>
            <p>Sahil Singh</p>
            <span>Mumbai, India · MCA candidate</span>
          </div>
        </div>
        <ol className="journey-list">
          {chapters.map((chapter, i) => (
            <li className="js-reveal" key={chapter.title}>
              <span className="journey-marker" aria-hidden="true">
                0{i + 1}
              </span>
              <p className="micro-label">{chapter.subtitle}</p>
              <h3>{chapter.title}</h3>
              <p>{chapter.body}</p>
              <a
                className="text-link"
                href={chapter.link}
                {...(chapter.link.startsWith("https:")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                {chapter.anchor}
                <ArrowUpRight size={14} />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
