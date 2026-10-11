import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

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

        <div ref={bodyRef} className="mt-8 md:mt-12" style={{ opacity: 0 }}>
          <p className="text-[#333] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            I sit between the business ask and the system that has to carry it.
            Startups have had me add pieces to products they already ship. The
            management degree and the engineering work are both mine, and I want
            to know why a feature exists before I spend time on it.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4">
            <span className="text-sm font-medium tracking-[2px] uppercase text-[#333]">
              Strength
            </span>
            <div className="inline-flex items-center gap-3 pl-5 pr-5 py-2 font-bold text-base md:text-lg text-black bg-white border-[3px] border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Adaptability
            </div>
            <p className="text-[#333] text-base md:text-lg leading-relaxed max-w-md">
              If the first approach stops working, I change it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
