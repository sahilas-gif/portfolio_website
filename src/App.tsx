import React, { useEffect, useRef, Suspense } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';

// Lazy load heavy components for 60 FPS optimization
const Projects = React.lazy(() => import('./sections/Projects'));
const Experience = React.lazy(() => import('./sections/Experience'));
const Education = React.lazy(() => import('./sections/Education'));
const Contact = React.lazy(() => import('./sections/Contact'));

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      infinite: false,
      syncTouch: true,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as unknown as gsap.TickerCallback);
    };
  }, []);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -80 });
    }
  };

  return (
    <div className="relative">
      <Navigation onNavClick={handleNavClick} />
      <Hero />
      <About />
      <Skills />
      
      <Suspense fallback={<div className="h-screen flex items-center justify-center bg-[#f4f4f4]"><div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div></div>}>
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </Suspense>
    </div>
  );
}
