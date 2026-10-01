import React, { useState } from 'react';
import { PageSection } from '../types';
import { Sparkles, Menu, X, Phone, Calendar } from 'lucide-react';

interface NavbarProps {
  currentSection: PageSection;
  onNavigate: (section: PageSection) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  onNavigate,
  onOpenBooking
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageSection; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (section: PageSection) => {
    onNavigate(section);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 h-[90px] px-4 md:px-8 lg:px-12 flex items-center justify-between bg-[#0b0c0a]/85 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      {/* Brand Logo */}
      <button
        onClick={() => handleNavClick('home')}
        className="flex flex-col items-start text-left group focus:outline-none"
      >
        <h2 className="font-cinzel text-xl md:text-2xl font-bold tracking-[3px] text-white group-hover:text-[#c5a76a] transition-colors duration-300">
          MT. CARMEL
        </h2>
        <span className="text-[10px] tracking-[6px] text-[#c5a76a] font-semibold uppercase -mt-1">
          HERBAL SAUNA
        </span>
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-7">
        {navLinks.map((link) => {
          const isActive = currentSection === link.id;
          return (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-xs uppercase tracking-[1.5px] font-semibold transition-all duration-300 relative py-2 ${
                isActive
                  ? 'text-[#c5a76a] text-shadow-[0_0_8px_rgba(197,167,106,0.4)]'
                  : 'text-white/80 hover:text-[#c5a76a]'
              }`}
            >
              {link.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c5a76a] rounded-full shadow-[0_0_8px_#c5a76a]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Action Buttons */}
      <div className="hidden sm:flex items-center gap-3">
        <a
          href="tel:0704415761"
          className="flex items-center gap-2 text-xs font-semibold text-[#c5a76a] hover:text-[#d8b87b] px-3 py-2 border border-[#c5a76a]/30 rounded hover:border-[#c5a76a] transition-all"
        >
          <Phone className="w-3.5 h-3.5" />
          <span className="hidden xl:inline">0704 415 761</span>
          <span className="xl:hidden">Call</span>
        </a>

        <button
          onClick={onOpenBooking}
          className="book-button flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] bg-[#c5a76a] text-[#0b0c0a] hover:bg-transparent hover:text-[#c5a76a] border-2 border-[#c5a76a] px-5 py-2.5 rounded transition-all duration-300 shadow-[0_0_15px_rgba(197,167,106,0.3)] hover:shadow-[0_0_20px_rgba(197,167,106,0.5)]"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>BOOK NOW</span>
        </button>
      </div>

      {/* Mobile Hamburger Toggle */}
      <div className="flex items-center gap-2 sm:hidden">
        <button
          onClick={onOpenBooking}
          className="text-[11px] font-bold tracking-wider bg-[#c5a76a] text-black px-3 py-1.5 rounded"
        >
          BOOK
        </button>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-white/90 hover:text-[#c5a76a] focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-[90px] left-0 w-full bg-[#0e100c]/98 backdrop-blur-xl border-b border-white/10 px-6 py-6 shadow-2xl transition-all animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = currentSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left text-sm uppercase tracking-widest font-semibold py-2 px-3 rounded transition-colors ${
                    isActive
                      ? 'bg-[#c5a76a]/15 text-[#c5a76a] border-l-2 border-[#c5a76a]'
                      : 'text-white/80 hover:text-[#c5a76a] hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <a
                href="tel:0704415761"
                className="flex items-center justify-center gap-2 py-3 border border-[#c5a76a]/40 text-[#c5a76a] rounded font-semibold text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Call 0704 415 761</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 bg-[#c5a76a] text-black font-bold uppercase tracking-widest rounded text-sm shadow-lg shadow-[#c5a76a]/20"
              >
                BOOK A SESSION NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
