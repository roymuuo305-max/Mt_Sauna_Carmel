import React from 'react';
import { ChevronRight, Home, Sparkles } from 'lucide-react';
import { PageSection } from '../types';

interface PageBannerProps {
  title: string;
  subtitle: string;
  eyebrow: string;
  currentPage: PageSection;
  onNavigate: (section: PageSection) => void;
}

export const PageBanner: React.FC<PageBannerProps> = ({
  title,
  subtitle,
  eyebrow,
  currentPage,
  onNavigate
}) => {
  return (
    <div className="relative py-14 sm:py-18 px-4 sm:px-6 lg:px-8 bg-radial-sanctuary border-b border-white/10 overflow-hidden text-center">
      {/* Background Subtle Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#c5a76a]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#c5a76a_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/60 mb-5 bg-black/40 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1 hover:text-[#c5a76a] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#c5a76a]" />
          <span className="text-[#c5a76a] capitalize">{currentPage}</span>
        </nav>

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[3px] text-[#c5a76a] uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{eyebrow}</span>
        </div>

        {/* Title */}
        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-[2px] mb-3">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base font-light leading-relaxed">
          {subtitle}
        </p>

        {/* Gold Divider */}
        <div className="w-20 h-1 bg-[#c5a76a] mx-auto mt-6 rounded-full shadow-[0_0_10px_#c5a76a]" />
      </div>
    </div>
  );
};
