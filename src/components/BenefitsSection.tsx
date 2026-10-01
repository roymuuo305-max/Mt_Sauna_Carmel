import React, { useState } from 'react';
import { BENEFITS_DATA } from '../data/mockData';
import { BenefitItem, PageSection } from '../types';
import { Check, Sparkles, HeartPulse, Shield, ArrowRight, Zap, Droplets } from 'lucide-react';

interface BenefitsSectionProps {
  onOpenBooking: () => void;
  onNavigate: (section: PageSection) => void;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ onOpenBooking, onNavigate }) => {
  const [selectedBenefit, setSelectedBenefit] = useState<BenefitItem | null>(BENEFITS_DATA[0]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-xs md:text-sm font-semibold tracking-[4px] text-[#c5a76a] uppercase mb-2">
          WHY HERBAL STEAM THERAPY?
        </p>
        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-[2px]">
          WELLNESS BENEFITS
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto mt-4 text-sm sm:text-base font-light">
          Experience the age-old synergy of botanical thermotherapy and modern relaxation science to reboot your body and elevate your well-being.
        </p>
        <div className="w-20 h-1 bg-[#c5a76a] mx-auto mt-4 rounded-full" />
      </div>

      {/* 4 Core Benefit Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {BENEFITS_DATA.map((benefit) => {
          const isSelected = selectedBenefit?.id === benefit.id;
          return (
            <div
              key={benefit.id}
              onClick={() => setSelectedBenefit(benefit)}
              className={`cursor-pointer p-6 rounded-xl border transition-all duration-300 text-left relative overflow-hidden group ${
                isSelected
                  ? 'bg-[#1b1e18] border-[#c5a76a] shadow-[0_0_25px_rgba(197,167,106,0.2)] transform -translate-y-1'
                  : 'bg-[#161913]/80 border-[#2a2e26] hover:border-[#c5a76a]/60 hover:bg-[#1b1e18]/90'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl p-2 rounded-lg bg-black/40 border border-white/5 inline-block">
                  {benefit.icon}
                </span>
                {isSelected && (
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a76a] bg-[#c5a76a]/15 px-2 py-0.5 rounded">
                    Active
                  </span>
                )}
              </div>

              <h3 className="font-cinzel text-lg font-bold text-white mb-2 group-hover:text-[#c5a76a] transition-colors">
                {benefit.title}
              </h3>

              <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-4">
                {benefit.shortDesc}
              </p>

              <div className="text-[11px] font-semibold text-[#c5a76a] flex items-center gap-1">
                <span>Explore science & detail</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep-Dive Active Benefit Showcase */}
      {selectedBenefit && (
        <div className="bg-[#1b1e18] border border-[#c5a76a]/40 rounded-xl p-6 sm:p-10 shadow-2xl relative mb-14 text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{selectedBenefit.icon}</span>
              <div>
                <span className="text-xs text-[#c5a76a] font-bold uppercase tracking-widest">
                  Deep Therapeutic Breakdown
                </span>
                <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                  {selectedBenefit.title}
                </h2>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="px-6 py-2.5 bg-[#c5a76a] text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-[#d8b87b] transition-all self-start md:self-auto"
            >
              BOOK SESSION FOR THIS
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">How It Works In Your Body</h4>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed font-light">
                {selectedBenefit.fullDesc}
              </p>

              <div className="pt-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#c5a76a] mb-3">Key Documented Outcomes</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedBenefit.keyBenefits.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-white/85 bg-black/30 p-2.5 rounded border border-white/5">
                      <Check className="w-4 h-4 text-[#c5a76a] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-black/40 p-6 rounded-lg border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#c5a76a] tracking-widest uppercase block mb-1">
                  The Herbal Difference
                </span>
                <h4 className="font-cinzel text-base font-bold text-white mb-2">
                  Why Steam Outperforms Dry Saunas
                </h4>
                <p className="text-xs text-white/70 leading-relaxed mb-4">
                  Unlike arid dry saunas, our high-humidity herbal steam gently opens bronchial passages, hydrates the epidermal layer, and delivers micro-vaporized herbal essential oils directly into the respiratory and lymphatic systems.
                </p>
              </div>

              <div className="p-3 bg-[#c5a76a]/10 border border-[#c5a76a]/20 rounded text-xs text-white/90">
                <span className="font-bold text-[#c5a76a] block mb-0.5">Recommended Routine:</span>
                15–20 minutes steam, 5-minute cool rinse with Eden Springs mineral water, repeated 2-3 cycles.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Routine Quick Recommendation */}
      <div className="bg-[#161913]/60 border border-[#2a2e26] rounded-xl p-8 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-left max-w-xl">
          <h3 className="font-cinzel text-xl font-bold text-white mb-1">Ready to Refresh Your Body?</h3>
          <p className="text-white/70 text-xs sm:text-sm">
            Experience our traditional steam and therapeutic massage session at our tranquil sanctuary in Machakos.
          </p>
        </div>
        <button
          onClick={onOpenBooking}
          className="px-8 py-3.5 bg-[#c5a76a] text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-[#d8b87b] transition-all whitespace-nowrap shadow-lg shadow-[#c5a76a]/20"
        >
          BOOK A SESSION NOW
        </button>
      </div>
    </section>
  );
};
