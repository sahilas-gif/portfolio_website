import { useEffect, useRef, useState } from 'react';
import { Menu, X, MessageSquare, Briefcase, Plus, User, Sparkles, TrendingUp, GraduationCap } from 'lucide-react';

interface NavigationProps {
  onNavClick: (id: string) => void;
}

export default function Navigation({ onNavClick }: NavigationProps) {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About me', id: 'about', icon: User },
    { label: 'Skills', id: 'skills', icon: Sparkles },
    { label: 'Projects', id: 'projects', icon: Briefcase },
    { label: 'Experience', id: 'experience', icon: TrendingUp },
    { label: 'Education', id: 'education', icon: GraduationCap },
  ];

  const handleNavClick = (id: string) => {
    onNavClick(id);
    setMobileMenuOpen(false);
    setFabOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled || mobileMenuOpen ? 'rgba(235, 144, 26, 0.95)' : 'transparent',
          backdropFilter: scrolled || mobileMenuOpen ? 'blur(10px)' : 'none',
        }}
      >
        <div className="flex items-center justify-between px-[5vw] h-20 max-w-[1400px] mx-auto">
          <div className="text-black font-bold text-2xl tracking-tight z-50">SAHIL.</div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-black text-lg font-medium hover:opacity-70 transition-opacity relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <button
              onClick={() => handleNavClick('contact')}
              className="bg-black text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Contact me
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-black z-50 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`md:hidden fixed inset-0 bg-[#eb901a] transition-transform duration-300 ease-in-out flex flex-col items-center justify-center space-y-8 ${
            mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
          style={{ top: '80px', height: 'calc(100vh - 80px)' }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="text-black text-3xl font-bold hover:opacity-70 transition-opacity"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('contact')}
            className="bg-black text-white px-8 py-3 rounded-full text-2xl font-bold mt-4 hover:bg-gray-800 transition-colors"
          >
            Contact me
          </button>
        </div>
      </nav>

      {/* Floating Action Button (Speed Dial) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Speed Dial Menu Items */}
        <div
          className={`flex flex-col gap-3 transition-all duration-300 origin-bottom ${
            fabOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-90 translate-y-8 pointer-events-none'
          }`}
        >
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="flex items-center gap-3 bg-white text-black pl-4 pr-1.5 py-1.5 rounded-full font-bold border-[2.5px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all w-max self-end"
              >
                <span className="text-sm">{link.label}</span>
                <div className="bg-black text-white p-1.5 rounded-full flex items-center justify-center">
                  <Icon size={16} strokeWidth={2.5} />
                </div>
              </button>
            );
          })}
          <button
            onClick={() => handleNavClick('contact')}
            className="flex items-center gap-3 bg-white text-black pl-4 pr-1.5 py-1.5 rounded-full font-bold border-[2.5px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all w-max self-end"
          >
            <span className="text-sm">Contact me</span>
            <div className="bg-black text-white p-1.5 rounded-full flex items-center justify-center">
              <MessageSquare size={16} strokeWidth={2.5} />
            </div>
          </button>
        </div>

        {/* Main FAB Toggle */}
        <button
          onClick={() => setFabOpen(!fabOpen)}
          className={`bg-black text-white p-4 rounded-full border-[2.5px] border-black shadow-[4px_4px_0px_0px_#eb901a] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#eb901a] transition-all ${
            fabOpen ? 'rotate-45 bg-gray-800' : 'rotate-0'
          }`}
          aria-label="Menu"
        >
          <Plus size={28} strokeWidth={3} />
        </button>
      </div>

      {/* Overlay to close FAB when clicking outside */}
      {fabOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px]"
          onClick={() => setFabOpen(false)}
        />
      )}
    </>
  );
}
