import { ArrowDown, ArrowUpRight, Pause, Play, Swords } from "lucide-react";
import Ambience from "../components/portfolio/Ambience";
import Bonfire from "../components/portfolio/Bonfire";
import Embers from "../components/portfolio/Embers";
const stats = [
  ["VIG", "Vigor", "System reliability", "Validation & recovery"],
  ["MND", "Mind", "Algorithmic architecture", "Spatial & ML pipelines"],
  ["END", "Endurance", "High-throughput latency", "Batching & async I/O"],
  ["DEX", "Dexterity", "Full-stack versatility", "API → interface → deploy"],
];
type Props = { motion: boolean; reduced: boolean; onToggleMotion: () => void };
export default function Hero({ motion, reduced, onToggleMotion }: Props) {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <Embers enabled={motion} />
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow js-hero-reveal">
            <span className="status-dot" /> Full-stack developer · Mumbai, India
          </p>
          <h1 id="hero-title" className="js-hero-reveal">
            Awaken,
            <br />
            <span>Tarnished</span>
            <br />
            Engineer<span className="title-period">.</span>
          </h1>
          <p className="hero-description js-hero-reveal">
            I’m Sahil. I build systems that hold their ground.
            <br className="desktop-break" /> From satellite intelligence to
            production web apps —<br className="desktop-break" /> deliberate
            architecture, all the way down.
          </p>
          <div className="hero-actions js-hero-reveal">
            <a href="#projects" className="button button-gold">
              <Swords size={17} /> Explore my work <ArrowDown size={16} />
            </a>
            <a href="#championship" className="text-link">
              The latest conquest <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="hero-identity js-hero-reveal">
            <span className="tiny-crest">✧</span>
            <p>
              MCA CANDIDATE <span>/</span> K. J. SOMAIYA
              <br />
              <span>Business instinct. Engineering discipline.</span>
            </p>
          </div>
        </div>
        <div className="hero-world">
          <div className="world-label">
            <span>EST. IN THE REAL WORLD</span>
            <span>BUILD / 001</span>
          </div>
          <Bonfire />
          <div className="character-hud js-hero-reveal">
            <div className="hud-heading">
              <span>CHARACTER ATTRIBUTES</span>
              <span>CLASS: ENGINEER</span>
            </div>
            <dl>
              {stats.map(([short, name, mapping, evidence]) => (
                <div className="stat-row" key={short}>
                  <dt>
                    <span
                      className={`stat-sigil stat-${short.toLowerCase()}`}
                      aria-hidden="true"
                    >
                      {short}
                    </span>
                    <span className="stat-term">
                      {name}
                      <small>{mapping}</small>
                    </span>
                  </dt>
                  <dd>
                    <span className="stat-track" aria-hidden="true">
                      <i className="js-meter" />
                    </span>
                    <span>{evidence}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <div className="shell hero-footer">
        <a href="#championship" className="descend">
          <ArrowDown size={14} />
          <span>DESCEND INTO THE WORK</span>
        </a>
        <div className="world-controls">
          <Ambience />
          <button
            type="button"
            className="quiet-control"
            onClick={onToggleMotion}
            disabled={reduced}
            aria-pressed={!motion}
          >
            {motion ? <Pause size={13} /> : <Play size={13} />}
            <span>
              {reduced
                ? "Reduced motion"
                : motion
                  ? "Pause motion"
                  : "Resume motion"}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
