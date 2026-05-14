import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Github, Phone, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

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
        headlineRef.current,
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
      )
        .fromTo(
          emailRef.current,
          { opacity: 0, x: -80 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          socialsRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.4'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center py-[120px] px-[5vw]"
      style={{ backgroundColor: '#000000' }}
    >
      <div className="max-w-[1400px] mx-auto text-center">
        <h2
          ref={headlineRef}
          className="text-white font-bold text-[48px] sm:text-[64px] md:text-[80px] lg:text-[120px] xl:text-[160px] leading-[0.95] tracking-[-2px] will-change-transform"
          style={{ opacity: 0 }}
        >
          LET'S
          <br />
          CONNECT
        </h2>

        <a
          ref={emailRef}
          href="mailto:ssinghsahil140@gmail.com"
          className="inline-flex items-center gap-3 text-white text-2xl md:text-4xl font-medium mt-12 md:mt-16 hover:opacity-70 transition-opacity"
          style={{ opacity: 0 }}
        >
          <Mail className="w-8 h-8 md:w-10 md:h-10" />
          ssinghsahil140@gmail.com
        </a>

        <div
          ref={socialsRef}
          className="flex items-center justify-center gap-8 md:gap-12 mt-12 md:mt-16"
          style={{ opacity: 0 }}
        >
          <a
            href="https://www.linkedin.com/in/sahil-singh-88aab7395/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:opacity-70 transition-opacity"
          >
            <Linkedin className="w-8 h-8 md:w-10 md:h-10" />
          </a>
          <a
            href="https://github.com/sahilas-gif"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:opacity-70 transition-opacity"
          >
            <Github className="w-8 h-8 md:w-10 md:h-10" />
          </a>
          <a
            href="tel:+919326465509"
            className="text-white hover:opacity-70 transition-opacity flex items-center gap-2 text-xl md:text-3xl font-medium"
          >
            <Phone className="w-8 h-8 md:w-10 md:h-10" />
            +91 9326465509
          </a>
        </div>
      </div>
    </section>
  );
}
