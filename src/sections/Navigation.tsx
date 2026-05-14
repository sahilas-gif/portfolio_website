import { useEffect, useRef, useState } from 'react';

interface NavigationProps {
  onNavClick: (id: string) => void;
}

export default function Navigation({ onNavClick }: NavigationProps) {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About me', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Education', id: 'education' },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(235, 144, 26, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
      }}
    >
      <div className="flex items-center justify-between px-[5vw] h-20 max-w-[1400px] mx-auto">
        <div className="text-black font-bold text-2xl tracking-tight">SAHIL.</div>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavClick(link.id)}
              className="text-black text-lg font-medium hover:opacity-70 transition-opacity relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
          <button
            onClick={() => onNavClick('contact')}
            className="bg-black text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Contact me
          </button>
        </div>
      </div>
    </nav>
  );
}
