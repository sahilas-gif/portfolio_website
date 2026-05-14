import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title entrance
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );

      // Bio entrance
      gsap.fromTo(
        bioRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.6 }
      );

      // Image entrance
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out', delay: 0.2 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex"
      style={{ backgroundColor: '#eb901a' }}
    >
      {/* Grainy paper overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          opacity: 0.15,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'multiply',
        }}
      />

      {/* Left portrait - fixed/sticky */}
      <div
        ref={imageRef}
        className="hidden md:block w-[40%] sticky top-0 h-screen"
      >
        <img
          src="/profile.jpg"
          alt="Sahil Singh"
          className="w-full h-full object-cover grayscale"
        />
      </div>

      {/* Right content */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 py-32 md:py-0 min-h-screen">
        {/* Mobile portrait */}
        <div className="md:hidden w-48 h-64 mx-auto mb-8 overflow-hidden rounded-lg">
          <img
            src="/profile.jpg"
            alt="Sahil Singh"
            className="w-full h-full object-cover grayscale"
          />
        </div>

        <h1
          ref={titleRef}
          className="text-black font-bold leading-[0.9] tracking-[-2px] text-[60px] sm:text-[80px] md:text-[120px] lg:text-[160px] xl:text-[200px] will-change-transform"
          style={{ opacity: 0 }}
        >
          I Create
          <br />
          Products
        </h1>

        <p
          ref={bioRef}
          className="mt-8 md:mt-12 text-black text-lg md:text-xl max-w-xl leading-relaxed"
          style={{ opacity: 0 }}
        >
          Product focused Developer &amp; MCA Candidate with a background in
          Management Studies (BMS), specializing in Full-Stack Development,
          Spring Boot, AI/ML, Python, React and CSS.
        </p>
      </div>
    </section>
  );
}
