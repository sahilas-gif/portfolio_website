import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          bodyRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-[120px] px-[5vw]"
      style={{ backgroundColor: '#f4f4f4' }}
    >
      <div className="max-w-[800px] mx-auto text-center">
        <span
          ref={labelRef}
          className="text-sm font-medium tracking-[2px] uppercase text-[#333]"
          style={{ opacity: 0 }}
        >
          ABOUT ME
        </span>

        <h2
          ref={headlineRef}
          className="text-black font-bold text-[48px] sm:text-[64px] md:text-[80px] lg:text-[120px] leading-[1.0] tracking-[-1px] mt-4 will-change-transform"
          style={{ opacity: 0 }}
        >
          Behind the Code
        </h2>

        <p
          ref={bodyRef}
          className="text-[#333] text-lg md:text-xl mt-8 md:mt-12 leading-relaxed max-w-2xl mx-auto"
          style={{ opacity: 0 }}
        >
          A strategic problem solver skilled in agile workflows, aiming to bridge
          the gap between business requirements and scalable technical
          architecture. Experienced in working with startups to build additions
          to their product. With a unique blend of management acumen and
          technical expertise, I bring a holistic perspective to every project —
          understanding not just how to build, but why it matters.
        </p>
      </div>
    </section>
  );
}
