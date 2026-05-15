import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Coffee, Terminal, Code, Database, Atom, Globe, Palette, Code2, Leaf, Brain, Smartphone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'Java', color: '#f89820', textColor: 'text-black', icon: Coffee },
  { name: 'Python', color: '#3776ab', textColor: 'text-white', icon: Terminal },
  { name: 'JavaScript (ES6+)', color: '#f7df1e', textColor: 'text-black', icon: Code },
  { name: 'SQL', color: '#00758f', textColor: 'text-white', icon: Database },
  { name: 'React.js', color: '#61dafb', textColor: 'text-black', icon: Atom },
  { name: 'Flutter', color: '#02569B', textColor: 'text-white', icon: Smartphone },
  { name: 'HTML5', color: '#e34f26', textColor: 'text-white', icon: Globe },
  { name: 'CSS3', color: '#1572b6', textColor: 'text-white', icon: Palette },
  { name: 'JSX', color: '#8a2be2', textColor: 'text-white', icon: Code2 },
  { name: 'Spring Boot', color: '#6db33f', textColor: 'text-white', icon: Leaf },
  { name: 'Database', color: '#336791', textColor: 'text-white', icon: Database },
  { name: 'Machine Learning', color: '#ff5722', textColor: 'text-white', icon: Brain },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

      // Staggered list entrance
      if (containerRef.current) {
        const items = gsap.utils.toArray('.skill-item');
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }
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
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24 items-start">
        <div>
          <h2
            ref={headlineRef}
            className="text-black font-bold text-[48px] sm:text-[64px] md:text-[80px] lg:text-[100px] leading-[1.0] tracking-[-1px] will-change-transform lg:sticky lg:top-32"
            style={{ opacity: 0 }}
          >
            Tech Stack
          </h2>
        </div>

        <div ref={containerRef} className="flex flex-wrap gap-4 md:gap-5 lg:pt-4">
          {skills.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className={`skill-item flex items-center gap-3 pl-5 pr-1.5 py-1.5 font-bold text-base md:text-lg border-[3px] border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-default ${item.textColor}`}
                style={{ backgroundColor: item.color }}
              >
                <span>{item.name}</span>
                <div className="bg-black text-white p-1.5 rounded-full flex items-center justify-center shrink-0">
                  <Icon size={18} strokeWidth={2.5} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
