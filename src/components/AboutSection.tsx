import React from 'react';
import { Leaf, Flame, Sparkles, MapPin, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { PageSection } from '../types';

interface AboutSectionProps {
  onNavigate: (section: PageSection) => void;
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-xs md:text-sm font-semibold tracking-[4px] text-[#c5a76a] uppercase mb-2">
          OUR STORY & HERITAGE
        </p>
        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-[2px]">
          ABOUT MT. CARMEL SAUNA
        </h1>
        <div className="w-20 h-1 bg-[#c5a76a] mx-auto mt-4 rounded-full" />
      </div>

      {/* Main Story Card */}
      <div className="bg-[#161913]/80 backdrop-blur-md border border-[#2a2e26] rounded-xl p-6 sm:p-10 md:p-12 mb-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c5a76a]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 text-xs text-[#c5a76a] font-bold tracking-widest uppercase bg-[#c5a76a]/10 px-3 py-1 rounded">
              <MapPin className="w-3.5 h-3.5" />
              <span>Machakos–Kangundo Road, Kenya</span>
            </div>

            <p className="text-white/90 text-base sm:text-lg leading-relaxed font-light">
              Nestled just <strong className="font-semibold text-white">3 km from Machakos Town</strong> along the scenic Machakos–Kangundo Road, Mt. Carmel Herbal Sauna provides a serene natural environment designed for complete physical and mental renewal.
            </p>

            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Our sanctuary combines time-honored traditional herbal steam treatments with modern therapeutic massage techniques. We believe wellness is a holistic ritual that clears toxins, eases deep-seated muscle tension, and restores balance to body and soul.
            </p>

            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              Whether you visit for a brief invigorating session or an unhurried full-day wellness journey, our purpose-built cedar steam chambers, private therapy suites, and peaceful gardens offer an intimate refuge from everyday stress.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 bg-[#c5a76a] text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-[#d8b87b] transition-all flex items-center gap-2"
              >
                <span>RESERVE YOUR VISIT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('benefits')}
                className="px-6 py-3 border border-white/20 text-white font-semibold text-xs uppercase tracking-widest rounded hover:border-[#c5a76a] hover:text-[#c5a76a] transition-all"
              >
                EXPLORE BENEFITS
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#2a2e26] shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
                alt="Mt. Carmel Herbal Sauna Ambiance"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-xs text-[#c5a76a] font-bold tracking-widest uppercase">Pristine Sanctuary</span>
                <h4 className="font-cinzel text-lg font-bold text-white">Pure Natural Herbal Steam</h4>
                <p className="text-xs text-white/70 mt-1">Sourced from fresh organic medicinal botanical gardens.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Pillar Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#161913]/60 border border-[#2a2e26] p-6 rounded-lg text-left hover:border-[#c5a76a]/40 transition-colors">
          <div className="w-12 h-12 rounded-lg bg-[#c5a76a]/15 text-[#c5a76a] flex items-center justify-center mb-4">
            <Leaf className="w-6 h-6" />
          </div>
          <h3 className="font-cinzel text-lg font-bold text-white mb-2">Indigenous Herbal Steam</h3>
          <p className="text-white/70 text-sm leading-relaxed">
            Our steam is infused with organic eucalyptus, wild mint, and locally sourced herbs known for clear airways and deep detoxification.
          </p>
        </div>

        <div className="bg-[#161913]/60 border border-[#2a2e26] p-6 rounded-lg text-left hover:border-[#c5a76a]/40 transition-colors">
          <div className="w-12 h-12 rounded-lg bg-[#c5a76a]/15 text-[#c5a76a] flex items-center justify-center mb-4">
            <Flame className="w-6 h-6" />
          </div>
          <h3 className="font-cinzel text-lg font-bold text-white mb-2">Therapeutic Mastery</h3>
          <p className="text-white/70 text-sm leading-relaxed">
            Certified massage therapists specialize in deep tissue, trigger point release, and Swedish techniques tailored to your body.
          </p>
        </div>

        <div className="bg-[#161913]/60 border border-[#2a2e26] p-6 rounded-lg text-left hover:border-[#c5a76a]/40 transition-colors">
          <div className="w-12 h-12 rounded-lg bg-[#c5a76a]/15 text-[#c5a76a] flex items-center justify-center mb-4">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-cinzel text-lg font-bold text-white mb-2">Tranquil Environment</h3>
          <p className="text-white/70 text-sm leading-relaxed">
            Surrounded by quiet green hills near Machakos, enjoy total discretion, hygienic facilities, and pure mineral spring hydration.
          </p>
        </div>
      </div>
    </section>
  );
};
