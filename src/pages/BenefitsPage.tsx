import React, { useState } from 'react';
import { PageSection, BenefitItem } from '../types';
import { PageBanner } from '../components/PageBanner';
import { BENEFITS_DATA, COMPARISON_DATA, FAQ_DATA } from '../data/mockData';
import {
  Check,
  Sparkles,
  HeartPulse,
  Shield,
  ArrowRight,
  Zap,
  Droplets,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Activity,
  Calendar,
  Layers,
  Thermometer
} from 'lucide-react';

interface BenefitsPageProps {
  onNavigate: (section: PageSection) => void;
  onOpenBooking: () => void;
}

export const BenefitsPage: React.FC<BenefitsPageProps> = ({ onNavigate, onOpenBooking }) => {
  const [selectedBenefit, setSelectedBenefit] = useState<BenefitItem>(BENEFITS_DATA[0]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Interactive Goal Recommender State
  const [selectedGoal, setSelectedGoal] = useState<string>('sinus');

  const goalsMap: Record<string, {
    title: string;
    herbBlend: string;
    steamDuration: string;
    recommendedService: string;
    explanation: string;
    icon: string;
  }> = {
    sinus: {
      title: 'Airway & Sinus Clearing',
      herbBlend: 'Blue Eucalyptus + Wild Peppermint & Menthol',
      steamDuration: '2 × 15-minute cycles with deep diaphragmatic breathing',
      recommendedService: 'Herbal Sauna Session (KSh 1,000)',
      explanation: 'Micro-vaporized eucalyptol and natural menthol dissolve thick mucosal congestion, clear blocked sinuses, and soothe bronchial irritation.',
      icon: '🫁'
    },
    muscle: {
      title: 'Deep Muscle & Lower Back Relief',
      herbBlend: 'Wild African Sage (Muvatha) + Highland Rosemary',
      steamDuration: '20-minute heat soak followed by deep tissue therapy',
      recommendedService: 'Steam & Massage Combo (KSh 3,200)',
      explanation: 'Heat relaxes hyper-contracted skeletal muscle fibers, while sage and rosemary promote blood perfusion and rapid lactic acid clearance.',
      icon: '💪'
    },
    stress: {
      title: 'High Stress & Sleep Rejuvenation',
      herbBlend: 'French Highland Lavender + Organic Lemongrass',
      steamDuration: '2 × 18-minute gentle cycles + Eden Springs cold plunge',
      recommendedService: 'VIP Rejuvenation Sanctuary (KSh 4,500)',
      explanation: 'Natural linalool and citral molecules stimulate parasympathetic dominance, lowering cortisol and preparing your nervous system for deep REM sleep.',
      icon: '🧘'
    },
    skin: {
      title: 'Pore Purification & Radiant Skin Glow',
      herbBlend: 'Sacred Neem (Muwarubaini) + Crushed Lemongrass',
      steamDuration: '15-minute steam + botanical body exfoliation scrub',
      recommendedService: 'VIP Rejuvenation Sanctuary (KSh 4,500)',
      explanation: 'Unclogs congested sebum, draws out deep environmental particulates, and delivers direct botanical antioxidants to the dermal matrix.',
      icon: '✨'
    }
  };

  const currentGoalData = goalsMap[selectedGoal] || goalsMap.sinus;

  return (
    <div className="space-y-0">
      {/* 1. Page Header Banner */}
      <PageBanner
        title="HEALTH & WELLNESS BENEFITS"
        subtitle="Explore the science-backed therapeutic physiological advantages of our traditional botanical steam baths and therapeutic recovery techniques."
        eyebrow="HOLISTIC THERAPY SCIENCE"
        currentPage="benefits"
        onNavigate={onNavigate}
      />

      {/* 2. The 4 Core Pillars Deep Dive */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-left">
        <div className="text-center mb-14">
          <p className="text-xs md:text-sm font-semibold tracking-[4px] text-[#c5a76a] uppercase mb-2">
            THE PHYSIOLOGICAL IMPACT
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white tracking-[2px]">
            4 CORE PILLARS OF THERMAL RECOVERY
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mt-3 text-sm sm:text-base font-light">
            Select a pillar below to inspect the anatomical mechanism and clinical outcomes.
          </p>
          <div className="w-20 h-1 bg-[#c5a76a] mx-auto mt-4 rounded-full" />
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {BENEFITS_DATA.map((b) => {
            const isSelected = selectedBenefit.id === b.id;
            return (
              <div
                key={b.id}
                onClick={() => setSelectedBenefit(b)}
                className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden group shadow-md ${
                  isSelected
                    ? 'bg-[#1b1e18] border-[#c5a76a] shadow-[0_0_25px_rgba(197,167,106,0.2)] transform -translate-y-1'
                    : 'bg-[#161913]/80 border-[#2a2e26] hover:border-[#c5a76a]/60 hover:bg-[#1b1e18]'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-2.5 rounded-lg bg-black/40 border border-white/5 inline-block">
                    {b.icon}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a76a] bg-[#c5a76a]/15 px-2 py-0.5 rounded">
                      Selected
                    </span>
                  )}
                </div>

                <h3 className="font-cinzel text-lg font-bold text-white mb-2 group-hover:text-[#c5a76a] transition-colors">
                  {b.title}
                </h3>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-4">
                  {b.shortDesc}
                </p>
                <span className="text-[11px] font-semibold text-[#c5a76a] flex items-center gap-1">
                  <span>View detailed biology</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            );
          })}
        </div>

        {/* Active Pillar Deep Dive Container */}
        <div className="bg-[#1b1e18] border border-[#c5a76a]/40 rounded-2xl p-6 sm:p-10 shadow-2xl relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <span className="text-4xl p-3 bg-black/40 rounded-xl border border-white/10">{selectedBenefit.icon}</span>
              <div>
                <span className="text-xs text-[#c5a76a] font-bold uppercase tracking-widest">
                  Biological Deep-Dive
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                  {selectedBenefit.title}
                </h3>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="px-6 py-3 bg-[#c5a76a] text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-[#d8b87b] transition-all self-start md:self-auto shadow-md"
            >
              EXPERIENCE THIS BENEFIT
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                How Thermal Herbal Steam Works in Your Body
              </h4>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed font-light">
                {selectedBenefit.fullDesc}
              </p>

              <div className="pt-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#c5a76a] mb-3">
                  Documented Therapeutic Outcomes
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedBenefit.keyBenefits.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-white/90 bg-black/40 p-3 rounded-lg border border-white/5"
                    >
                      <Check className="w-4 h-4 text-[#c5a76a] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-black/40 p-6 rounded-xl border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#c5a76a] tracking-widest uppercase block mb-1">
                  The Botanical Vapor Edge
                </span>
                <h4 className="font-cinzel text-base font-bold text-white mb-2">
                  Targeted Essential Oil Inhalation
                </h4>
                <p className="text-xs text-white/70 leading-relaxed mb-4">
                  Unlike sterile electric dry saunas, our high-humidity herbal steam directly atomizes plant volatile monoterpenes and flavonoids, enabling immediate transdermal and pulmonary absorption.
                </p>
              </div>

              <div className="p-3.5 bg-[#c5a76a]/10 border border-[#c5a76a]/30 rounded-lg text-xs text-white/90">
                <span className="font-bold text-[#c5a76a] block mb-1">Recommended Session Frequency:</span>
                1–2 sessions weekly for chronic fatigue, or 2–3 sessions weekly during intensive athletic training and recovery.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Goal Recommender / Custom Wellness Prescription */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/5 bg-[#0f110d]/50 text-left">
        <div className="text-center mb-12">
          <p className="text-xs md:text-sm font-semibold tracking-[4px] text-[#c5a76a] uppercase mb-2">
            PERSONALIZED PRESCRIPTION
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white tracking-[2px]">
            FIND YOUR IDEAL STEAM PROTOCOL
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mt-3 text-sm sm:text-base font-light">
            Select what your body needs today to receive custom herbal blend suggestions and timing.
          </p>
          <div className="w-20 h-1 bg-[#c5a76a] mx-auto mt-4 rounded-full" />
        </div>

        {/* Goal Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { id: 'sinus', label: 'Airways & Sinus', icon: '🫁' },
            { id: 'muscle', label: 'Muscle & Joint Ache', icon: '💪' },
            { id: 'stress', label: 'Stress & Insomnia', icon: '🧘' },
            { id: 'skin', label: 'Skin Glow & Detox', icon: '✨' }
          ].map((goal) => (
            <button
              key={goal.id}
              onClick={() => setSelectedGoal(goal.id)}
              className={`p-4 rounded-xl border text-center transition-all duration-300 font-semibold text-xs sm:text-sm uppercase tracking-wider flex flex-col items-center gap-2 ${
                selectedGoal === goal.id
                  ? 'bg-[#c5a76a] text-black border-[#c5a76a] shadow-lg shadow-[#c5a76a]/20 font-bold'
                  : 'bg-[#161913] text-white/80 border-[#2a2e26] hover:border-[#c5a76a]/50'
              }`}
            >
              <span className="text-2xl">{goal.icon}</span>
              <span>{goal.label}</span>
            </button>
          ))}
        </div>

        {/* Recommended Prescription Card */}
        <div className="bg-[#161913] border border-[#c5a76a] rounded-2xl p-6 sm:p-10 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{currentGoalData.icon}</span>
            <div>
              <span className="text-xs text-[#c5a76a] font-bold uppercase tracking-widest">
                Tailored Recommendation For:
              </span>
              <h3 className="font-cinzel text-2xl font-bold text-white">
                {currentGoalData.title}
              </h3>
            </div>
          </div>

          <p className="text-white/80 text-sm leading-relaxed mb-6">
            {currentGoalData.explanation}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-xs">
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <span className="text-white/50 uppercase font-bold tracking-wider block mb-1">Recommended Herb Infusion:</span>
              <p className="font-bold text-[#c5a76a] text-sm">{currentGoalData.herbBlend}</p>
            </div>

            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <span className="text-white/50 uppercase font-bold tracking-wider block mb-1">Optimal Chamber Duration:</span>
              <p className="font-bold text-white text-sm">{currentGoalData.steamDuration}</p>
            </div>

            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <span className="text-white/50 uppercase font-bold tracking-wider block mb-1">Suggested Spa Package:</span>
              <p className="font-bold text-white text-sm">{currentGoalData.recommendedService}</p>
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="w-full py-4 bg-[#c5a76a] hover:bg-[#d8b87b] text-black font-bold text-xs sm:text-sm uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#c5a76a]/20 flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>RESERVE THIS TAILORED SESSION NOW</span>
          </button>
        </div>
      </section>

      {/* 4. Comparison Table: Mt. Carmel Herbal Steam vs Traditional Saunas */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/5 text-left">
        <div className="text-center mb-12">
          <p className="text-xs md:text-sm font-semibold tracking-[4px] text-[#c5a76a] uppercase mb-2">
            OBJECTIVE COMPARISON
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white tracking-[2px]">
            WHY HERBAL STEAM OUTPERFORMS
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mt-3 text-sm sm:text-base font-light">
            Compare our authentic medicinal steam therapy against conventional dry, infrared, and hammam alternatives.
          </p>
          <div className="w-20 h-1 bg-[#c5a76a] mx-auto mt-4 rounded-full" />
        </div>

        <div className="bg-[#161913] border border-[#2a2e26] rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#0f110d] border-b border-[#2a2e26] text-white uppercase font-bold tracking-wider">
                  <th className="py-4 px-5 text-left text-white/60">Therapy Factor</th>
                  <th className="py-4 px-5 text-left text-[#c5a76a] bg-[#c5a76a]/10 border-x border-[#c5a76a]/20">
                    Mt. Carmel Herbal Sauna
                  </th>
                  <th className="py-4 px-5 text-left text-white/70">Standard Dry Sauna</th>
                  <th className="py-4 px-5 text-left text-white/70">Infrared Sauna</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2e26]">
                {COMPARISON_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-5 font-bold text-white/90">
                      {row.feature}
                    </td>
                    <td className="py-4 px-5 text-[#c5a76a] font-semibold bg-[#c5a76a]/5 border-x border-[#c5a76a]/20">
                      <div className="flex items-start gap-1.5">
                        <Check className="w-4 h-4 shrink-0 mt-0.5 text-[#c5a76a]" />
                        <span>{row.mtCarmel}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-white/60">
                      {row.drySauna}
                    </td>
                    <td className="py-4 px-5 text-white/60">
                      {row.infrared}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Step-by-Step 3-Cycle Sauna Protocol */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/5 bg-[#0f110d]/50 text-left">
        <div className="text-center mb-14">
          <p className="text-xs md:text-sm font-semibold tracking-[4px] text-[#c5a76a] uppercase mb-2">
            BEST PRACTICE RITUAL
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white tracking-[2px]">
            HOW TO EXPERIENCE YOUR SESSION
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mt-3 text-sm sm:text-base font-light">
            Follow our recommended 4-step sequence for maximum detoxification and cellular relaxation.
          </p>
          <div className="w-20 h-1 bg-[#c5a76a] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#161913] border border-[#2a2e26] p-6 rounded-xl relative">
            <span className="font-cinzel text-3xl font-extrabold text-[#c5a76a]/40 absolute top-4 right-4">01</span>
            <span className="text-[10px] font-bold text-[#c5a76a] uppercase tracking-widest block mb-1">Step One</span>
            <h3 className="font-cinzel text-lg font-bold text-white mb-2">Pre-Hydrate & Shower</h3>
            <p className="text-white/70 text-xs leading-relaxed">
              Drink a glass of pure Eden Springs water. Take a quick warm shower to remove surface oils and prepare skin pores.
            </p>
          </div>

          <div className="bg-[#161913] border border-[#2a2e26] p-6 rounded-xl relative">
            <span className="font-cinzel text-3xl font-extrabold text-[#c5a76a]/40 absolute top-4 right-4">02</span>
            <span className="text-[10px] font-bold text-[#c5a76a] uppercase tracking-widest block mb-1">Step Two</span>
            <h3 className="font-cinzel text-lg font-bold text-white mb-2">15-Min Herbal Steam</h3>
            <p className="text-white/70 text-xs leading-relaxed">
              Enter the cedar chamber. Breathe deeply through your nose and mouth to allow the vaporized botanical essences to fill your lungs.
            </p>
          </div>

          <div className="bg-[#161913] border border-[#2a2e26] p-6 rounded-xl relative">
            <span className="font-cinzel text-3xl font-extrabold text-[#c5a76a]/40 absolute top-4 right-4">03</span>
            <span className="text-[10px] font-bold text-[#c5a76a] uppercase tracking-widest block mb-1">Step Three</span>
            <h3 className="font-cinzel text-lg font-bold text-white mb-2">Cooling Spring Rinse</h3>
            <p className="text-white/70 text-xs leading-relaxed">
              Step out and rinse with refreshing cool natural spring water. This stimulates vascular constriction, locking in hydration.
            </p>
          </div>

          <div className="bg-[#161913] border border-[#2a2e26] p-6 rounded-xl relative">
            <span className="font-cinzel text-3xl font-extrabold text-[#c5a76a]/40 absolute top-4 right-4">04</span>
            <span className="text-[10px] font-bold text-[#c5a76a] uppercase tracking-widest block mb-1">Step Four</span>
            <h3 className="font-cinzel text-lg font-bold text-white mb-2">Rest & Massage</h3>
            <p className="text-white/70 text-xs leading-relaxed">
              Recline in the garden lounge with warm herbal tea, or proceed to your private deep tissue therapeutic massage suite.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Health & Wellness FAQs */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/5 text-left">
        <div className="text-center mb-12">
          <p className="text-xs md:text-sm font-semibold tracking-[4px] text-[#c5a76a] uppercase mb-2">
            COMMON INQUIRIES
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white tracking-[2px]">
            HEALTH & THERAPY FAQS
          </h2>
          <div className="w-20 h-1 bg-[#c5a76a] mx-auto mt-4 rounded-full" />
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-[#161913] border border-[#2a2e26] rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-cinzel text-base font-bold text-white">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#c5a76a] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/50 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/5 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Bottom Action Strip */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/5">
        <div className="bg-[#161913] border border-[#c5a76a]/40 p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-left shadow-xl">
          <div>
            <h3 className="font-cinzel text-xl font-bold text-white mb-1">
              Ready to Experience the Difference?
            </h3>
            <p className="text-white/70 text-xs sm:text-sm">
              Explore our full transparent spa menu and reserve your private cedar suite today.
            </p>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="px-8 py-3.5 bg-[#c5a76a] text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-[#d8b87b] transition-all whitespace-nowrap shadow-lg shadow-[#c5a76a]/20"
          >
            VIEW SERVICES & BOOK
          </button>
        </div>
      </section>
    </div>
  );
};
