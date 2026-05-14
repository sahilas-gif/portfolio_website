import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'React', level: 90, color: '#61DAFB' },
  { name: 'Java', level: 85, color: '#B07219' },
  { name: 'Python', level: 80, color: '#3572A5' },
  { name: 'Dart', level: 60, color: '#13B9B1' },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline entrance
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      // Skill bars animation
      barsRef.current.forEach((bar, index) => {
        if (!bar) return;
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${skills[index].level}%`,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
            delay: 0.3 + index * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-[120px] px-[5vw]"
      style={{ backgroundColor: '#eb901a' }}
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <div>
          <h2
            ref={headlineRef}
            className="text-black font-bold text-[48px] sm:text-[64px] md:text-[80px] lg:text-[120px] leading-[1.0] tracking-[-1px] will-change-transform"
            style={{ opacity: 0 }}
          >
            Tech Stack
          </h2>
        </div>

        <div className="flex flex-col justify-center space-y-6">
          {skills.map((skill, index) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-black font-semibold text-lg flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: skill.color }}></span>
                  {skill.name}
                </span>
                <span className="text-black font-bold text-sm">
                  {skill.level}%
                </span>
              </div>
              <div className="w-full h-3 bg-black/10 rounded-full overflow-hidden shadow-inner">
                <div
                  ref={(el) => { barsRef.current[index] = el; }}
                  className="h-full rounded-full transition-colors"
                  style={{ width: '0%', backgroundColor: skill.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
