import CustomCursor from "./components/portfolio/CustomCursor";
import Timeline from "./components/portfolio/Timeline";
import ChapterMap from "./components/portfolio/ChapterMap";
import Navigation from "./sections/Navigation";
import Hero from "./sections/Hero";
import Championship from "./sections/Championship";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Contact from "./sections/Contact";
import {
  useMotionPreference,
  usePortfolioMotion,
} from "./hooks/usePortfolioMotion";

export default function App() {
  const motion = useMotionPreference();
  const scope = usePortfolioMotion(motion.enabled);
  return (
    <div
      ref={scope}
      className="portfolio"
      data-motion={motion.enabled ? "on" : "off"}
    >
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navigation />
      <main id="main" tabIndex={-1}>
        <Hero
          motion={motion.enabled}
          reduced={motion.reduced}
          onToggleMotion={motion.toggle}
        />
        <Championship />
        <Skills />
        <Projects />
        <About />
        <Experience />
        <Timeline />
        <Education />
        <Contact />
      </main>
      <ChapterMap />
      <CustomCursor enabled={motion.enabled} />
    </div>
  );
}
