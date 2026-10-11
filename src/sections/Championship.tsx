import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Trophy,
  Linkedin,
  ChevronDown,
} from "lucide-react";
import SectionHeading from "../components/portfolio/SectionHeading";
import ThermalMap from "../components/portfolio/ThermalMap";
import { conquest, pipelineStages } from "../data/conquest";

export default function Championship() {
  const [stage, setStage] = useState(0);
  const current = pipelineStages[stage];
  return (
    <section id="championship" className="section conquest-section">
      <div className="shell">
        <SectionHeading
          index="01"
          eyebrow="LEGENDARY CONQUEST"
          title="A signal in the fire."
          description="A team effort. A real-world problem. A place on the podium."
        />
        <article className="conquest-frame js-reveal">
          <div className="achievement-banner">
            <span aria-hidden="true">✧</span>
            <p>
              LEGEND FELLED
              <small>
                {conquest.award} · {conquest.event} · SIH Pre-qualifiers
              </small>
            </p>
            <span aria-hidden="true">✧</span>
          </div>
          <div className="conquest-grid">
            <div className="conquest-copy">
              <p className="eyebrow">
                <Trophy size={15} /> {conquest.problem}
              </p>
              <h3>
                {conquest.title}
                <span>
                  From hot pixels
                  <br />
                  to actionable intelligence.
                </span>
              </h3>
              <p>
                Satellites tell us where something is hot. Our system asks{" "}
                <em>what’s burning</em> — distinguishing persistent industrial
                sources from fires that need a closer look.
              </p>
              <p>
                FastAPI and PostGIS underneath. React and MapLibre at the
                surface. Gemini turns the findings into plain-English incident
                summaries.
              </p>
              <div className="conquest-actions">
                <a
                  className="button button-outline"
                  href={conquest.repo}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={16} /> Explore the source
                  <ArrowUpRight size={14} />
                </a>
                <a className="text-link" href="#pipeline-demo">
                  Trace the pipeline <ArrowRight size={15} />
                </a>
              </div>
              {conquest.liveDemo && (
                <a
                  className="text-link"
                  href={conquest.liveDemo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open live platform
                  <ArrowUpRight size={15} />
                </a>
              )}
            </div>
            <div className="conquest-visual">
              <div className="map-window-bar">
                <span className="status-dot" /> SYSTEM ARCHITECTURE
                <span>PS / 26162</span>
              </div>
              <ThermalMap />
              <div className="map-legend">
                <span>
                  <i className="legend-gold" /> Classified source
                </span>
                <span>
                  <i className="legend-rot" /> Investigation candidate
                </span>
              </div>
            </div>
          </div>
          <div className="conquest-metrics">
            <div>
              <strong>4,984</strong>
              <span>THERMAL SOURCES¹</span>
            </div>
            <div>
              <strong>
                93.8<span>%</span>
              </strong>
              <span>REFERENCE-SUBSET ACCURACY¹</span>
            </div>
            <div>
              <strong>
                CPU<span> only</span>
              </strong>
              <span>NO GPU REQUIRED</span>
            </div>
          </div>
          <p className="metric-source">
            ¹ Repository-reported validation: 96 reference-labelable sources (2%
            of the total), not full-dataset accuracy.{" "}
            <a
              href={`${conquest.repo}/blob/${conquest.revision}/ml/validation_report.md`}
              target="_blank"
              rel="noreferrer"
            >
              Read validation report ↗
            </a>
          </p>
        </article>
        <div id="pipeline-demo" className="pipeline-demo js-reveal">
          <div className="pipeline-header">
            <div>
              <p className="eyebrow">INSIDE THE BUILD</p>
              <h3>Trace a thermal signal.</h3>
            </div>
            <p>Interactive walkthrough · illustrative data</p>
          </div>
          <div
            className="pipeline-stages"
            role="group"
            aria-label="Pipeline stage"
          >
            {pipelineStages.map((item, i) => (
              <button
                key={item.title}
                type="button"
                aria-pressed={stage === i}
                aria-controls="pipeline-detail"
                onClick={() => setStage(i)}
              >
                <span>{item.label}</span>
                {item.title}
                <ArrowRight size={16} />
              </button>
            ))}
          </div>
          <div id="pipeline-detail" className="pipeline-detail">
            <div className="pipeline-mini-map">
              <ThermalMap stage={stage} />
            </div>
            <div
              className="pipeline-explanation"
              aria-live="polite"
              aria-atomic="true"
            >
              <p className="micro-label">{current.label}</p>
              <h4>{current.title}</h4>
              <p>{current.description}</p>
              <code>{current.result}</code>
              <a
                className="text-link"
                href={`${conquest.repo}/blob/${conquest.revision}/${current.file}`}
                target="_blank"
                rel="noreferrer"
              >
                Inspect this stage on GitHub
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
          <div className="pipeline-foot">
            <a
              href={`${conquest.repo}#demo-runbook--the-4-clicks`}
              target="_blank"
              rel="noreferrer"
            >
              Run the complete platform locally ↗
            </a>
            <button
              type="button"
              className="text-link"
              onClick={() =>
                setStage((value) => (value + 1) % pipelineStages.length)
              }
            >
              {stage === 3 ? "Restart walkthrough" : "Next stage"}{" "}
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
        <details className="evidence-panel js-reveal">
          <summary>
            <span>
              <Linkedin size={19} />
              <span>
                THE RECORD
                <small>
                  {conquest.award} · {conquest.date}
                </small>
              </span>
            </span>
            <span>
              Read the achievement <ChevronDown size={17} />
            </span>
          </summary>
          <div className="evidence-content">
            <blockquote cite={conquest.evidence}>
              “We finished Runner-Up at KJSIM Hackathon 2026, the Smart India
              Hackathon Pre-qualifiers at K J Somaiya Institute of Management! …
              This was a prequalifier, and there’s still a lot we want to
              improve. But it’s a good start, and we’re going to keep building.”
            </blockquote>
            <p className="micro-label">EXCERPT FROM SAHIL’S LINKEDIN POST</p>
            <a
              className="text-link"
              href={conquest.evidence}
              target="_blank"
              rel="noreferrer"
            >
              Open the original LinkedIn post <ArrowUpRight size={15} />
            </a>
            <div className="team-credit">
              <p>Built with the team</p>
              <ul>
                {conquest.team.map((person) => (
                  <li key={person.name}>
                    <a href={person.url} target="_blank" rel="noreferrer">
                      {person.name} ↗
                    </a>
                  </li>
                ))}
              </ul>
              <p>
                Guided by{" "}
                <a
                  href="https://www.linkedin.com/in/kirti-wankhede-8a8b569/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Kirti Wankhede
                </a>
                . Hosted by KJSIM and Somaiya Vidyavihar University.
              </p>
            </div>
          </div>
        </details>
      </div>
    </section>
  );
}
