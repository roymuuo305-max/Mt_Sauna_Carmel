import React, { useState } from 'react';
import { PageSection, BotanicalHerb } from '../types';
import { PageBanner } from '../components/PageBanner';
import { BOTANICAL_HERBS } from '../data/mockData';
import {
  Leaf,
  Flame,
  Award,
  Sparkles,
  MapPin,
  ShieldCheck,
  Droplets,
  Heart,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Users,
  Info
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (section: PageSection) => void;
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenBooking }) => {
  const [selectedHerb, setSelectedHerb] = useState<BotanicalHerb | null>(null);

  const teamMembers = [
    {
      name: 'Beatrice Mumo',
      role: 'Head Therapist & Spa Specialist',
      experience: '9+ Years Experience',
      bio: 'Certified in deep tissue release, Swedish relaxation, and traditional pressure point therapies.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'James Mutiso',
      role: 'Master Herbalist & Botanical Curator',
      experience: '12+ Years Experience',
      bio: 'Specialist in East African indigenous medicinal herbs, steam infusion chemistry, and natural essential oil distillation.',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Mercy Kyalo',
      role: 'Guest Wellness & Experience Host',
      experience: '6+ Years Experience',
      bio: 'Dedicated to ensuring personalized care, tranquil scheduling, and warm Kenyan hospitality from entry to departure.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const facilities = [
    {
      title: 'Cedarwood Steam Chambers',
      desc: 'Constructed from natural cedarwood that withstands high moisture while radiating a soothing organic woody aroma during steam therapy.',
      icon: Flame
    },
    {
      title: 'Private Massage Suites',
      desc: 'Sound-dampened therapy rooms featuring ergonomic heated tables, dim ambient lighting, and essential oil diffusers.',
      icon: Heart
    },
    {
      title: 'Eden Springs Cold Plunge',
      desc: 'Crisp, mineral-rich natural spring water for invigorating vascular contrast therapy after your hot sauna cycles.',
      icon: Droplets
    },
    {
      title: 'Botanical Hydration Lounge',
      desc: 'Peaceful garden seating with complimentary daily-brewed ginger, mint, and lemongrass herbal teas.',
      icon: Leaf
    }
  ];

  return (
    <div className="space-y-0">
      {/* 1. Subpage Header Banner with Breadcrumbs */}
      <PageBanner
        title="ABOUT MT. CARMEL SAUNA"
        subtitle="Discover our rich heritage of traditional Kenyan botanical steam therapy, nestled in the peaceful green landscapes of Machakos."
        eyebrow="OUR STORY & HERITAGE"
        currentPage="about"
        onNavigate={onNavigate}
      />

      {/* 2. The Origin Story & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs text-[#c5a76a] font-bold tracking-widest uppercase bg-[#c5a76a]/10 px-3 py-1 rounded">
              <MapPin className="w-3.5 h-3.5" />
              <span>Machakos–Kangundo Road, Kenya</span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white">
              AN OASIS BORN FROM TRADITION & NATURE
            </h2>

            <p className="text-white/90 text-base sm:text-lg font-light leading-relaxed">
              Mt. Carmel Herbal Sauna was founded with a singular purpose: to preserve the time-tested restorative wisdom of African botanical steam healing and combine it with modern therapeutic excellence.
            </p>

            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              Located just 3 km outside Machakos Town, our sanctuary offers a natural retreat from urban stressors. The fresh breezes from the surrounding hills, combined with our cedarwood chambers and pure Eden Springs water source, create an environment where the body naturally sheds fatigue and restores vitality.
            </p>

            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              Unlike generic dry saunas that rely on sterile electric heat coils, our thermal boilers extract volatile medicinal essences directly from freshly harvested eucalyptus, wild sage, and neem leaves, delivering profound respiratory and lymphatic relief with every breath.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 bg-[#c5a76a] hover:bg-[#d8b87b] text-black font-bold text-xs uppercase tracking-widest rounded transition-all flex items-center gap-2 shadow-lg shadow-[#c5a76a]/20"
              >
                <span>BOOK YOUR VISIT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('benefits')}
                className="px-6 py-3 border border-white/20 text-white hover:text-[#c5a76a] hover:border-[#c5a76a] font-semibold text-xs uppercase tracking-widest rounded transition-all"
              >
                EXPLORE HEALTH BENEFITS
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden border border-[#2a2e26] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
                alt="Cedar Steam Suite"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-xl overflow-hidden border border-[#2a2e26] shadow-xl mt-6">
              <img
                src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=600&q=80"
                alt="Therapy Room"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 7 Sacred Botanical Herbs Apothecary Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/5 bg-[#0f110d]/50">
        <div className="text-center mb-14">
          <p className="text-xs md:text-sm font-semibold tracking-[4px] text-[#c5a76a] uppercase mb-2">
            NATURAL APOTHECARY
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white tracking-[2px]">
            THE 7 MEDICINAL HERBS WE INFUSE
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mt-3 text-sm sm:text-base font-light">
            Every day, our master herbalists select and crush fresh organic botanicals to create our signature healing steam vapor. Click any herb to view details.
          </p>
          <div className="w-20 h-1 bg-[#c5a76a] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 text-left">
          {BOTANICAL_HERBS.map((herb) => {
            const isSelected = selectedHerb?.id === herb.id;
            return (
              <div
                key={herb.id}
                onClick={() => setSelectedHerb(herb)}
                className={`bg-[#161913] border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 group shadow-lg flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#c5a76a] ring-2 ring-[#c5a76a]/50 bg-[#1b1e18]'
                    : 'border-[#2a2e26] hover:border-[#c5a76a]/60 hover:bg-[#1b1e18]'
                }`}
              >
                <div className="h-40 overflow-hidden relative">
                  <img
                    src={herb.image}
                    alt={herb.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[10px] uppercase font-bold tracking-widest text-[#c5a76a] bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                    {herb.localName ? `Local: ${herb.localName}` : 'Medicinal Herb'}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-cinzel text-lg font-bold text-white mb-0.5 group-hover:text-[#c5a76a] transition-colors">
                      {herb.name}
                    </h3>
                    <p className="text-[11px] text-white/50 italic mb-2">
                      {herb.botanicalName}
                    </p>
                    <p className="text-xs text-white/70 leading-relaxed mb-4 line-clamp-3">
                      {herb.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5">
                    <span className="text-[11px] text-[#c5a76a] font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{herb.aroma}</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Herb Detail Modal */}
        {selectedHerb && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="bg-[#161913] border border-[#c5a76a] rounded-2xl max-w-lg w-full p-6 sm:p-8 text-left shadow-2xl relative">
              <button
                onClick={() => setSelectedHerb(null)}
                className="absolute top-4 right-4 p-2 text-white/60 hover:text-white"
              >
                ✕
              </button>

              <div className="flex items-center gap-4 mb-4">
                <img
                  src={selectedHerb.image}
                  alt={selectedHerb.name}
                  className="w-16 h-16 rounded-xl object-cover border border-white/10"
                />
                <div>
                  <span className="text-xs text-[#c5a76a] font-bold uppercase tracking-widest">
                    {selectedHerb.localName ? `Indigenous: ${selectedHerb.localName}` : 'Botanical Herb'}
                  </span>
                  <h3 className="font-cinzel text-2xl font-bold text-white">
                    {selectedHerb.name}
                  </h3>
                  <p className="text-xs text-white/50 italic">{selectedHerb.botanicalName}</p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-white/80 bg-black/40 p-4 rounded-xl border border-white/5 mb-6">
                <div>
                  <strong className="text-[#c5a76a] uppercase tracking-wider block mb-1">Aroma Profile:</strong>
                  <p>{selectedHerb.aroma}</p>
                </div>
                <div>
                  <strong className="text-[#c5a76a] uppercase tracking-wider block mb-1">Therapeutic Action:</strong>
                  <p className="leading-relaxed">{selectedHerb.description}</p>
                </div>
                <div>
                  <strong className="text-[#c5a76a] uppercase tracking-wider block mb-1.5">Documented Primary Health Benefits:</strong>
                  <div className="space-y-1">
                    {selectedHerb.primaryBenefits.map((b, i) => (
                      <div key={i} className="flex items-center gap-2 text-white">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a76a]" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <strong className="text-[#c5a76a] uppercase tracking-wider block mb-1">Sourcing & Origin:</strong>
                  <p className="text-white/60">{selectedHerb.origin}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedHerb(null);
                  onOpenBooking();
                }}
                className="w-full py-3 bg-[#c5a76a] text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-[#d8b87b] transition-all"
              >
                EXPERIENCE THIS HERBAL BLEND IN A SESSION
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 4. Facilities & Sanctuary Highlights */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center mb-14">
          <p className="text-xs md:text-sm font-semibold tracking-[4px] text-[#c5a76a] uppercase mb-2">
            DESIGNED FOR TRANQUILITY
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white tracking-[2px]">
            SANCTUARY AMENITIES & FACILITIES
          </h2>
          <div className="w-20 h-1 bg-[#c5a76a] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {facilities.map((fac, idx) => {
            const Icon = fac.icon;
            return (
              <div
                key={idx}
                className="bg-[#161913] border border-[#2a2e26] p-6 rounded-xl shadow-lg hover:border-[#c5a76a]/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-[#c5a76a]/15 text-[#c5a76a] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-cinzel text-lg font-bold text-white mb-2">{fac.title}</h3>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed">{fac.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Certified Team & Therapists */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/5 bg-[#0f110d]/50">
        <div className="text-center mb-14">
          <p className="text-xs md:text-sm font-semibold tracking-[4px] text-[#c5a76a] uppercase mb-2">
            EXPERT PRACTITIONERS
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white tracking-[2px]">
            MEET OUR WELLNESS SPECIALISTS
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mt-3 text-sm sm:text-base font-light">
            Dedicated certified massage therapists and botanical practitioners committed to your healing journey.
          </p>
          <div className="w-20 h-1 bg-[#c5a76a] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-[#161913] border border-[#2a2e26] rounded-xl overflow-hidden shadow-xl"
            >
              <div className="h-60 overflow-hidden">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="text-[10px] font-bold text-[#c5a76a] uppercase tracking-widest block mb-1">
                  {member.experience}
                </span>
                <h3 className="font-cinzel text-xl font-bold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-xs text-[#c5a76a] font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-xs text-white/70 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Purity & Hygiene Commitment */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/5">
        <div className="bg-[#161913] border border-[#c5a76a]/40 rounded-2xl p-8 sm:p-12 text-left shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[#c5a76a]/20 text-[#c5a76a] rounded-xl">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs text-[#c5a76a] font-bold uppercase tracking-widest">
                Our Non-Negotiable Standards
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                Hygiene, Purity & Safety Guarantee
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm text-white/80">
            <div className="bg-black/40 p-5 rounded-xl border border-white/5">
              <h4 className="font-bold text-white text-base mb-2">Hospital-Grade Sanitization</h4>
              <p className="text-white/70 leading-relaxed">
                Steam suites are fully disinfected, deep-steamed, and aired out between every single client session.
              </p>
            </div>

            <div className="bg-black/40 p-5 rounded-xl border border-white/5">
              <h4 className="font-bold text-white text-base mb-2">100% Pure Organic Botanicals</h4>
              <p className="text-white/70 leading-relaxed">
                Zero synthetic aromas, artificial fragrances, or chemical additives. Only pure crushed plants and mountain spring vapor.
              </p>
            </div>

            <div className="bg-black/40 p-5 rounded-xl border border-white/5">
              <h4 className="font-bold text-white text-base mb-2">Fresh Linen & Private Lockers</h4>
              <p className="text-white/70 leading-relaxed">
                Individually sealed sterile cotton towels, robes, and secure key-coded personal storage for your complete peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Next Page Navigation CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#161913] p-8 rounded-xl border border-[#2a2e26] text-left">
          <div>
            <h3 className="font-cinzel text-xl font-bold text-white mb-1">
              Curious About the Health Science?
            </h3>
            <p className="text-white/70 text-xs sm:text-sm">
              Discover how thermal botanical steam accelerates muscle repair, eases joint aches, and clears airways.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('benefits')}
              className="px-6 py-3 bg-[#c5a76a] text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-[#d8b87b] transition-all whitespace-nowrap"
            >
              EXPLORE HEALTH BENEFITS
            </button>
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 border border-white/20 text-white font-semibold text-xs uppercase tracking-widest rounded hover:border-[#c5a76a] hover:text-[#c5a76a] transition-all whitespace-nowrap"
            >
              BOOK NOW
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
