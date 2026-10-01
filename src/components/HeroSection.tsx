import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, ArrowRight, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { PageSection } from '../types';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onNavigate: (section: PageSection) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onNavigate }) => {
  const phrases = [
    'Relax • Refresh • Rejuvenate',
    'Pure Traditional Herbal Steam',
    'Restorative Deep Tissue Massage',
    'Natural Sanctuary in Machakos'
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(90);

  useEffect(() => {
    const fullText = phrases[currentPhraseIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length + 1));
        if (displayText.length + 1 === fullText.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? 45 : typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentPhraseIndex, typingSpeed]);

  return (
    <section className="relative min-h-[calc(100vh-90px)] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 py-16 overflow-hidden bg-radial-sanctuary">
      {/* Background Ambience & Subtle Steam Simulation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="steam-particle w-64 h-64 top-1/3 left-1/4" style={{ animationDelay: '0s' }} />
        <div className="steam-particle w-80 h-80 top-1/2 right-1/4" style={{ animationDelay: '2.5s' }} />
        <div className="steam-particle w-48 h-48 bottom-1/4 left-1/2" style={{ animationDelay: '4s' }} />
      </div>

      {/* Decorative Gold Radiance */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#c5a76a]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Section Subtitle */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c5a76a]/10 border border-[#c5a76a]/30 mb-6 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#c5a76a]" />
          <p className="text-xs md:text-sm font-semibold tracking-[4px] text-[#c5a76a] uppercase">
            WELCOME TO
          </p>
        </div>

        {/* Hero Title */}
        <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-[2px] sm:tracking-[4px] leading-tight mb-4 drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
          MT. CARMEL SAUNA
        </h1>

        {/* Hero Subtitle */}
        <h2 className="font-cinzel text-xl sm:text-3xl md:text-4xl font-semibold text-[#c5a76a] mb-8 tracking-[2px] gold-glow">
          An Oasis of Renewal
        </h2>

        {/* Dynamic Typing Container */}
        <div className="h-10 flex items-center justify-center mb-10 px-4">
          <p className="text-base sm:text-xl md:text-2xl font-light tracking-[3px] text-white/90 drop-shadow-md">
            {displayText}
            <span className="inline-block w-[2px] h-5 sm:h-6 bg-[#c5a76a] ml-1 animate-pulse align-middle" />
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-9 py-4 bg-[#c5a76a] text-[#0b0c0a] font-bold text-sm uppercase tracking-[2px] rounded border-2 border-[#c5a76a] transition-all duration-300 hover:bg-transparent hover:text-[#c5a76a] shadow-[0_5px_25px_rgba(197,167,106,0.35)] hover:shadow-[0_5px_30px_rgba(197,167,106,0.6)] transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>BOOK A SESSION</span>
          </button>

          <button
            onClick={() => onNavigate('services')}
            className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm uppercase tracking-[2px] rounded border border-white/20 hover:border-[#c5a76a]/60 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2 group"
          >
            <span>EXPLORE SERVICES</span>
            <ArrowRight className="w-4 h-4 text-[#c5a76a] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-16 w-full max-w-3xl pt-8 border-t border-white/10">
          <div className="flex items-center justify-center sm:justify-start gap-3 text-left bg-black/40 backdrop-blur-md p-3.5 rounded-lg border border-white/5">
            <div className="p-2 rounded-full bg-[#c5a76a]/15 text-[#c5a76a]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">100% Organic Herbs</p>
              <p className="text-[11px] text-white/60">Medicinal eucalyptus & flora</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 text-left bg-black/40 backdrop-blur-md p-3.5 rounded-lg border border-white/5">
            <div className="p-2 rounded-full bg-[#c5a76a]/15 text-[#c5a76a]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Open 7 Days</p>
              <p className="text-[11px] text-white/60">7:00 AM – 8:00 PM Daily</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 text-left bg-black/40 backdrop-blur-md p-3.5 rounded-lg border border-white/5">
            <div className="p-2 rounded-full bg-[#c5a76a]/15 text-[#c5a76a]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Prime Location</p>
              <p className="text-[11px] text-white/60">3 km from Machakos Town</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
