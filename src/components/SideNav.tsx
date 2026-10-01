import React, { useState, useEffect } from 'react';
import { PageSection } from '../types';
import {
  Home,
  Sparkles,
  HeartPulse,
  Calendar,
  Image as ImageIcon,
  MapPin,
  Shield,
  Lock,
  Menu,
  X,
  Phone,
  Compass,
  ChevronRight
} from 'lucide-react';

interface SideNavProps {
  currentSection: PageSection;
  onNavigate: (section: PageSection) => void;
  onOpenBooking: () => void;
}

interface PageMenuItem {
  id: PageSection;
  title: string;
  subtitle: string;
  badge?: string;
  icon: React.ElementType;
}

export const SideNav: React.FC<SideNavProps> = ({
  currentSection,
  onNavigate,
  onOpenBooking
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // 6 Clean Public Pages (Staff Admin is removed from public list and placed as subtle discreet icon)
  const menuItems: PageMenuItem[] = [
    {
      id: 'home',
      title: 'Home Sanctuary',
      subtitle: 'Welcome overview & signature experience',
      icon: Home
    },
    {
      id: 'about',
      title: 'About & Sacred Herbs',
      subtitle: '7 Botanical healing herbs & facilities',
      badge: '7 Herbs',
      icon: Sparkles
    },
    {
      id: 'benefits',
      title: 'Health Benefits',
      subtitle: 'Physiological science & comparisons',
      icon: HeartPulse
    },
    {
      id: 'services',
      title: 'Services & Reservations',
      subtitle: 'Herbal Sauna (500) & Therapeutic (1,000)',
      badge: 'Pricing',
      icon: Calendar
    },
    {
      id: 'gallery',
      title: 'Sanctuary Gallery',
      subtitle: 'Therapeutic & herbal boiler system',
      icon: ImageIcon
    },
    {
      id: 'contact',
      title: 'Location & Contact',
      subtitle: 'Directions from Nairobi/Machakos & map',
      icon: MapPin
    }
  ];

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSelectPage = (section: PageSection) => {
    onNavigate(section);
    setIsOpen(false); // Disappears immediately after user selects page of interest
  };

  const activeItem = menuItems.find((item) => item.id === currentSection) || menuItems[0];

  return (
    <>
      {/* =========================================================================
          1. ELEGANT TOP BAR WITH MENU TRIGGER
          ========================================================================= */}
      <header
        id="app-top-header"
        className="sticky top-0 z-40 w-full bg-[#0b0c0a]/90 backdrop-blur-xl border-b border-[#c5a76a]/20 px-4 sm:px-6 lg:px-8 py-3 transition-all duration-300 shadow-lg"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Prominent MENU Button + Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* The Main Appear/Disappear Menu Trigger Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="group relative flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[#c5a76a]/15 hover:bg-[#c5a76a] text-[#c5a76a] hover:text-black border border-[#c5a76a]/50 hover:border-[#c5a76a] font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(197,167,106,0.15)] hover:shadow-[0_0_20px_rgba(197,167,106,0.4)] active:scale-95 focus:outline-none cursor-pointer"
              title="Open Navigation Menu to switch pages"
              aria-label="Open Navigation Menu"
              aria-expanded={isOpen}
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
              <span className="font-cinzel tracking-[1.5px]">MENU</span>
            </button>

            {/* Brand Logo & Tagline */}
            <button
              onClick={() => handleSelectPage('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#c5a76a]/10 border border-[#c5a76a]/40 flex items-center justify-center text-[#c5a76a] group-hover:border-[#c5a76a] group-hover:bg-[#c5a76a]/20 transition-colors">
                <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="hidden xs:block">
                <span className="font-cinzel text-sm sm:text-base font-bold tracking-[1.5px] text-white group-hover:text-[#c5a76a] transition-colors block leading-tight">
                  MT. CARMEL
                </span>
                <span className="text-[9px] tracking-[2px] text-[#c5a76a] uppercase font-semibold block leading-tight">
                  Herbal Sauna
                </span>
              </div>
            </button>
          </div>

          {/* Center: Current Viewing Page Badge (Desktop & Tablet) */}
          <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs">
            <span className="text-white/40">Viewing:</span>
            <span className="font-cinzel font-bold text-white tracking-wide flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#c5a76a] animate-pulse inline-block" />
              {activeItem.title}
            </span>
          </div>

          {/* Right: Quick Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="tel:0704415761"
              className="hidden sm:flex items-center gap-1.5 text-xs text-white/70 hover:text-[#c5a76a] py-2 px-3 rounded-lg border border-white/10 hover:border-[#c5a76a]/40 transition-colors"
              title="Call Helpline: 0704 415 761"
            >
              <Phone className="w-3.5 h-3.5 text-[#c5a76a]" />
              <span className="font-mono">0704 415 761</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="flex items-center gap-1.5 bg-[#c5a76a] hover:bg-[#d8b87b] active:scale-95 text-black font-bold uppercase tracking-wider text-[11px] sm:text-xs py-2 px-3 sm:px-4 rounded-lg shadow-md shadow-[#c5a76a]/20 transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Now</span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. SLIDE-OUT NAVIGATION MENU (NO SCROLLING NEEDED - ALL PAGES FIT DIRECTLY)
          ========================================================================= */}
      {/* Backdrop overlay with blur */}
      <div
        className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-md transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-out Navigation Drawer */}
      <aside
        id="side-navigation-drawer"
        aria-label="Navigation Menu"
        className={`fixed top-0 left-0 h-full w-full sm:w-[380px] md:w-[400px] max-w-[100vw] sm:max-w-[85vw] z-50 bg-[#0d0f0c] border-r border-[#c5a76a]/30 shadow-[0_0_50px_rgba(0,0,0,0.95)] flex flex-col transition-transform duration-300 ease-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header (Compact & Crisp) */}
        <div className="px-4 py-3.5 sm:px-5 sm:py-4 border-b border-white/10 bg-[#121510] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#c5a76a]/15 border border-[#c5a76a]/50 flex items-center justify-center text-[#c5a76a]">
              <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="font-cinzel text-sm sm:text-base font-bold tracking-[1.5px] text-white">
                MT. CARMEL
              </h3>
              <p className="text-[9px] tracking-[2px] text-[#c5a76a] uppercase font-semibold">
                Select a page to view
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 sm:p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 active:bg-white/20 transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
            title="Close Menu (Esc)"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Page List Items - Perfectly Proportioned to Fit Without Scrolling */}
        <div className="flex-1 flex flex-col justify-evenly py-2 px-3 sm:px-4 gap-1 sm:gap-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectPage(item.id)}
                className={`w-full text-left px-3 py-2.5 sm:py-3 rounded-xl flex items-center justify-between transition-all duration-200 group border focus:outline-none active:scale-[0.98] cursor-pointer ${
                  isActive
                    ? 'bg-[#c5a76a]/20 border-[#c5a76a] text-white shadow-[0_0_12px_rgba(197,167,106,0.2)]'
                    : 'bg-white/[0.03] border-white/5 text-white/80 hover:bg-white/[0.08] hover:border-[#c5a76a]/40 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Icon Container */}
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      isActive
                        ? 'bg-[#c5a76a] text-black font-bold shadow-sm shadow-[#c5a76a]/30'
                        : 'bg-white/5 text-[#c5a76a] group-hover:bg-[#c5a76a]/20'
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>

                  {/* Text Container */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-cinzel text-xs sm:text-sm font-bold tracking-wide truncate ${
                          isActive ? 'text-[#c5a76a]' : 'text-white group-hover:text-[#c5a76a]'
                        }`}
                      >
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className="text-[8px] font-bold uppercase tracking-wider bg-[#c5a76a]/20 text-[#c5a76a] px-1.5 py-0.5 rounded border border-[#c5a76a]/30 shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-white/50 truncate">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                {/* Arrow / Active Indicator */}
                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                  {isActive ? (
                    <span className="text-[9px] uppercase font-bold tracking-wider text-[#c5a76a] bg-[#c5a76a]/15 px-1.5 py-0.5 rounded">
                      Active
                    </span>
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-white/30 group-hover:text-[#c5a76a] group-hover:translate-x-0.5 transition-all" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Subtle Bottom Accent Strip with Discreet Staff Access Icon (Method B) */}
        <div className="px-4 py-2 border-t border-white/5 bg-[#0e100c] flex items-center justify-between text-[10px] text-white/40 shrink-0">
          <span>Mt. Carmel Herbal Sauna</span>
          <div className="flex items-center gap-2">
            <span className="text-[#c5a76a]/60">Machakos, Kenya</span>
            <button
              onClick={() => handleSelectPage('admin')}
              className="p-1 text-white/20 hover:text-[#c5a76a] hover:bg-white/5 rounded transition-all focus:outline-none cursor-pointer"
              title="Staff Portal"
              aria-label="Staff Portal Access"
            >
              <Lock className="w-3 h-3" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
