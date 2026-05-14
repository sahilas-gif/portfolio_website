import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 4, suffix: '+', label: 'Projects Shipped' },
  { value: 3, suffix: '+', label: 'Technologies Mastered' },
  { value: 1, suffix: '', label: 'Startup Experience' },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const labelsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image entrance
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.05 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      // Number count-up animation
      stats.forEach((stat, index) => {
        const numEl = numbersRef.current[index];
        if (!numEl) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
          onUpdate: () => {
            numEl.textContent = Math.round(obj.val) + stat.suffix;
          },
        });

        // Label entrance
        const labelEl = labelsRef.current[index];
        if (labelEl) {
          gsap.fromTo(
            labelEl,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                once: true,
              },
              delay: 0.3 + index * 0.15,
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-[120px] px-[5vw]"
      style={{ backgroundColor: '#eb901a' }}
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Left sticky portrait */}
        <div
          ref={imageRef}
          className="relative h-[400px] md:h-[600px] rounded-[20px] overflow-hidden"
          style={{ opacity: 0 }}
        >
          <img
            src="/experience.jpg"
            alt="Sahil at work"
            className="w-full h-full object-cover grayscale"
          />
        </div>

        {/* Right stats */}
        <div className="flex flex-col justify-center space-y-12 md:space-y-16">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center md:text-left">
              <span
                ref={(el) => { numbersRef.current[index] = el; }}
                className="text-[#dc2626] font-bold text-[60px] md:text-[80px] leading-none"
              >
                0{stat.suffix}
              </span>
              <span
                ref={(el) => { labelsRef.current[index] = el; }}
                className="block text-black text-xl md:text-2xl font-medium mt-2"
                style={{ opacity: 0 }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
