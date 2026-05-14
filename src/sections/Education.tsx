import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institute: 'K. J. Somaiya Institute of Management',
    year: 'Jul 2027',
    detail: '7.18 CGPA (Sem 1)',
  },
  {
    degree: 'Bachelor of Management Studies (BMS)',
    institute: "VPM's R. Z. Shah College of Arts, Science & Commerce",
    year: 'Jul 2023',
    detail: '7.98 CGPI',
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
            delay: 0.3 + index * 0.2,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-[120px] px-[5vw]"
      style={{ backgroundColor: '#f4f4f4' }}
    >
      <div className="max-w-[1000px] mx-auto">
        <h2
          ref={headlineRef}
          className="text-black font-bold text-[48px] sm:text-[64px] md:text-[80px] lg:text-[120px] leading-[1.0] tracking-[-1px] mb-12 md:mb-20 text-center will-change-transform"
          style={{ opacity: 0 }}
        >
          Education &amp; Background
        </h2>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <div
              key={edu.degree}
              ref={(el) => { itemsRef.current[index] = el; }}
              className="bg-white rounded-[20px] p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 hover:shadow-lg"
              style={{ opacity: 0 }}
            >
              <div className="md:w-[60%]">
                <h3 className="text-black font-bold text-xl md:text-2xl leading-tight">
                  {edu.degree}
                </h3>
                <p className="text-[#333] text-lg mt-1">{edu.institute}</p>
              </div>
              <div className="md:w-[35%] md:text-right">
                <span className="text-black font-semibold text-lg">
                  {edu.year}
                </span>
                <span className="block text-[#333] text-base mt-1">
                  {edu.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
