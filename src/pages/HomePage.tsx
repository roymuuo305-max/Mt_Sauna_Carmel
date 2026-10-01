import React, { useState } from 'react';
import { PageSection, Booking } from '../types';
import { HeroSection } from '../components/HeroSection';
import { SERVICES_DATA, BENEFITS_DATA, GALLERY_DATA, TESTIMONIALS_DATA, CONTACT_INFO } from '../data/mockData';
import {
  Leaf,
  Flame,
  Award,
  ArrowRight,
  Sparkles,
  Calendar,
  CheckCircle2,
  MapPin,
  Clock,
  Phone,
  ShieldCheck,
  Star,
  MessageCircle,
  Quote
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (section: PageSection) => void;
  onOpenBooking: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenBooking }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubmitted(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setNewsletterSubmitted(false);
    }, 4000);
  };

  const directWhatsAppUrl = `https://wa.me/254704415761?text=${encodeURIComponent('Hello Mt. Carmel Sauna, I would like to inquire about booking a sauna and massage session.')}`;

  return (
    <div className="space-y-0">
      {/* 1. Dynamic Hero Section */}
      <HeroSection onOpenBooking={onOpenBooking} onNavigate={onNavigate} />

      {/* 2. Welcome & Heritage Teaser Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center mb-12">
          <p className="text-xs md:text-sm font-semibold tracking-[4px] text-[#c5a76a] uppercase mb-2">
            OUR SACRED SANCTUARY
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white tracking-[2px]">
            AN OASIS OF RENEWAL IN MACHAKOS
          </h2>
          <div className="w-20 h-1 bg-[#c5a76a] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#161913]/80 border border-[#2a2e26] rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-left">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs text-[#c5a76a] font-bold tracking-widest uppercase bg-[#c5a76a]/10 px-3 py-1 rounded">
              <MapPin className="w-3.5 h-3.5" />
              <span>3 km from Machakos Town on Kangundo Road</span>
            </div>

            <p className="text-white/90 text-base sm:text-lg leading-relaxed font-light">
              Mt. Carmel Herbal Sauna is a dedicated wellness retreat born from the restorative traditions of indigenous Kenyan botanicals. Here, natural thermal steam infused with freshly harvested organic herbs relaxes tired muscles, flushes deep toxins, and eases mental fatigue.
            </p>

            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              Surrounded by tranquil green hills, our private cedar suites, certified therapists, and crisp Eden Springs mineral water offer an unforgettable restoration ritual away from the city noise.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('about')}
                className="px-6 py-3 bg-[#c5a76a] hover:bg-[#d8b87b] text-black font-bold text-xs uppercase tracking-widest rounded transition-all flex items-center gap-2 shadow-lg shadow-[#c5a76a]/20"
              >
                <span>DISCOVER OUR FULL STORY & HERBS</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenBooking}
                className="px-6 py-3 border border-white/20 text-white font-semibold text-xs uppercase tracking-widest rounded hover:border-[#c5a76a] hover:text-[#c5a76a] transition-all"
              >
                RESERVE A VISIT
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-xl overflow-hidden border border-[#2a2e26] shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
                alt="Mt. Carmel Herbal Steam Sanctuary"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <span className="text-xs text-[#c5a76a] font-bold tracking-widest uppercase">Traditional Cedar Chambers</span>
                <h4 className="font-cinzel text-lg font-bold text-white">Pure Natural Herbal Steam</h4>
                <p className="text-xs text-white/70">Continuous infusion of eucalyptus, wild sage, & mint.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Health Benefits Preview Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/5 bg-[#0f110d]/40">
        <div className="text-center mb-12">
          <p className="text-xs md:text-sm font-semibold tracking-[4px] text-[#c5a76a] uppercase mb-2">
            SCIENCE & VITALITY
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white tracking-[2px]">
            THE 4 PILLARS OF HERBAL THERAPY
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mt-3 text-sm sm:text-base font-light">
            Therapeutic thermal steam delivers multi-system restorative benefits for the mind, respiration, and muscular tension.
          </p>
          <div className="w-20 h-1 bg-[#c5a76a] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 text-left">
          {BENEFITS_DATA.map((benefit) => (
            <div
              key={benefit.id}
              onClick={() => onNavigate('benefits')}
              className="bg-[#161913] border border-[#2a2e26] hover:border-[#c5a76a]/60 hover:bg-[#1b1e18] p-6 rounded-xl transition-all duration-300 cursor-pointer group shadow-lg transform hover:-translate-y-1"
            >
              <div className="text-3xl p-2.5 rounded-lg bg-black/40 border border-white/5 inline-block mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-cinzel text-lg font-bold text-white mb-2 group-hover:text-[#c5a76a] transition-colors">
                {benefit.title}
              </h3>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-4">
                {benefit.shortDesc}
              </p>
              <div className="text-[11px] font-semibold text-[#c5a76a] flex items-center gap-1">
                <span>Learn the science</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => onNavigate('benefits')}
            className="px-8 py-3.5 bg-white/5 hover:bg-[#c5a76a] text-white hover:text-black border border-white/20 hover:border-[#c5a76a] font-bold text-xs uppercase tracking-widest rounded transition-all inline-flex items-center gap-2"
          >
            <span>EXPLORE ALL HEALTH BENEFITS & COMPARISON</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. Signature Spa Packages Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center mb-12">
          <p className="text-xs md:text-sm font-semibold tracking-[4px] text-[#c5a76a] uppercase mb-2">
            SPA MENU & EXPERIENCES
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white tracking-[2px]">
            SERVICES & RESERVATIONS
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mt-3 text-sm sm:text-base font-light">
            Choose from our authentic Herbal Sauna Session (KSh 500) and Therapeutic Session (KSh 1,000).
          </p>
          <div className="w-20 h-1 bg-[#c5a76a] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8 mb-10 text-left">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className={`bg-[#161913] border rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 relative group shadow-xl ${
                service.popular
                  ? 'border-[#c5a76a] shadow-[0_0_30px_rgba(197,167,106,0.15)] ring-1 ring-[#c5a76a]/40'
                  : 'border-[#2a2e26] hover:border-[#c5a76a]/50'
              }`}
            >
              <div className="relative h-48 w-full overflow-hidden bg-black/50">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161913] via-[#161913]/30 to-transparent" />
                
                {service.popular && (
                  <div className="absolute top-3.5 right-4 bg-[#c5a76a] text-black text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                    Signature Ritual
                  </div>
                )}

                <div className="absolute bottom-2.5 left-4 right-4 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#c5a76a] tracking-wider uppercase bg-black/60 px-2 py-0.5 rounded border border-[#c5a76a]/30">
                    {service.tagline}
                  </span>
                  <span className="text-xs text-white/80 bg-black/60 px-2 py-0.5 rounded">
                    {service.duration}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-cinzel text-xl font-bold text-white mb-2 group-hover:text-[#c5a76a] transition-colors">
                    {service.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="font-cinzel text-2xl font-bold text-[#c5a76a]">
                      KSh {service.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-white/50">/ session</span>
                  </div>
                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>
                </div>

                <button
                  onClick={() => onNavigate('services')}
                  className="w-full py-3 bg-white/5 hover:bg-[#c5a76a] text-white hover:text-black border border-white/10 text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reserve This Session</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => onNavigate('services')}
            className="px-8 py-3.5 bg-[#c5a76a] hover:bg-[#d8b87b] text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all inline-flex items-center gap-2 shadow-lg shadow-[#c5a76a]/20 cursor-pointer"
          >
            <span>VIEW SERVICES & RESERVATIONS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 5. Photo Sanctuary Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/5 bg-[#0f110d]/40">
        <div className="text-center mb-12">
          <p className="text-xs md:text-sm font-semibold tracking-[4px] text-[#c5a76a] uppercase mb-2">
            AUTHENTIC SANCTUARY GALLERY
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white tracking-[2px]">
            INSIDE MT. CARMEL SAUNA
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mt-3 text-sm sm:text-base font-light">
            View our authentic Therapeutic Session and traditional Herbal Infusion Steam Boiler System.
          </p>
          <div className="w-20 h-1 bg-[#c5a76a] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8 mb-10">
          {GALLERY_DATA.map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate('gallery')}
              className="group relative h-80 rounded-2xl overflow-hidden border border-[#2a2e26] bg-[#161913] cursor-pointer shadow-xl hover:border-[#c5a76a]/60 transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 text-left">
                <span className="text-[10px] font-bold text-[#c5a76a] uppercase tracking-widest block mb-1">
                  {item.categoryLabel}
                </span>
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-white/75 line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => onNavigate('gallery')}
            className="px-8 py-3.5 bg-white/5 hover:bg-[#c5a76a] text-white hover:text-black border border-white/20 hover:border-[#c5a76a] font-bold text-xs uppercase tracking-widest rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>VIEW SANCTUARY GALLERY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 6. Guest Testimonials & Reviews */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center mb-12">
          <p className="text-xs md:text-sm font-semibold tracking-[4px] text-[#c5a76a] uppercase mb-2">
            AUTHENTIC EXPERIENCES
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white tracking-[2px]">
            WHAT OUR CLIENTS SAY
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mt-3 text-sm sm:text-base font-light">
            Read verified feedback from Machakos residents and weekend travelers from Nairobi.
          </p>
          <div className="w-20 h-1 bg-[#c5a76a] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {TESTIMONIALS_DATA.map((test) => (
            <div
              key={test.id}
              className="bg-[#161913] border border-[#2a2e26] p-6 sm:p-7 rounded-xl shadow-lg relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#c5a76a] gap-1">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#c5a76a]" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#c5a76a] font-semibold bg-[#c5a76a]/10 px-2.5 py-0.5 rounded">
                    {test.serviceUsed}
                  </span>
                </div>
                <p className="text-white/80 text-sm leading-relaxed italic mb-6">
                  "{test.comment}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs">
                <div>
                  <h4 className="font-bold text-white">{test.author}</h4>
                  <span className="text-white/50">{test.location}</span>
                </div>
                <span className="text-white/40">{test.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Quick Visit / Location Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/5">
        <div className="bg-[#161913] border border-[#c5a76a]/40 rounded-2xl p-6 sm:p-10 shadow-2xl text-left flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs font-bold text-[#c5a76a] uppercase tracking-widest">
              Plan Your Visit
            </span>
            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
              Open 7 Days a Week in Machakos
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Located just 3 km from Machakos Town along the Machakos–Kangundo Road. Free on-site parking, walk-ins welcome, and direct WhatsApp reservations.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#25D366] text-black font-bold text-xs uppercase tracking-wider rounded flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>WhatsApp: 0704 415 761</span>
              </a>

              <a
                href="tel:0704415761"
                className="px-5 py-2.5 border border-[#c5a76a] text-[#c5a76a] hover:bg-[#c5a76a] hover:text-black font-bold text-xs uppercase tracking-wider rounded transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Directly</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full lg:w-auto">
            <button
              onClick={() => onNavigate('contact')}
              className="w-full px-8 py-3.5 bg-[#c5a76a] text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-[#d8b87b] transition-all flex items-center justify-center gap-2"
            >
              <span>GET DETAILED DRIVING DIRECTIONS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenBooking}
              className="w-full px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/20 font-bold text-xs uppercase tracking-widest rounded transition-all text-center"
            >
              BOOK ONLINE NOW
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
