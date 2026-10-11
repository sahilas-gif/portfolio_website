import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useMotionPreference() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(query.matches);
    query.addEventListener("change", change);
    return () => query.removeEventListener("change", change);
  }, []);
  return {
    enabled: !reduced && !paused,
    reduced,
    toggle: () => setPaused((value) => !value),
  };
}

/** CSS supplies visible resting states; all GSAP work is scoped and reverted. */
export function usePortfolioMotion(enabled: boolean) {
  const scope = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!enabled) return;
    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power2.out" } })
        .from(".js-hero-reveal", {
          y: 22,
          opacity: 0,
          duration: 1,
          stagger: 0.11,
        })
        .from(".js-sword", { y: 24, opacity: 0, duration: 1.4 }, 0.15);
      gsap.utils.toArray<HTMLElement>(".js-reveal").forEach((element) => {
        gsap.from(element, {
          y: 24,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 94%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>(".js-meter").forEach((element) => {
        gsap.from(element, {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1.3,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 95%", once: true },
        });
      });
    }, scope);
    return () => context.revert();
  }, [enabled]);
  return scope;
}
