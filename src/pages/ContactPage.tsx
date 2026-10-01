import React, { useState } from 'react';
import { PageSection } from '../types';
import { PageBanner } from '../components/PageBanner';
import { CONTACT_INFO } from '../data/mockData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Car,
  Bus,
  ShieldCheck,
  Send,
  CheckCircle2,
  ExternalLink,
  Calendar
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (section: PageSection) => void;
  onOpenBooking: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onOpenBooking }) => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryPhone.trim() || !inquiryMessage.trim()) return;

    setInquirySent(true);
    setTimeout(() => {
      setInquiryName('');
      setInquiryPhone('');
      setInquiryMessage('');
      setInquirySent(false);
    }, 5000);
  };

  const directWhatsAppUrl = `https://wa.me/254704415761?text=${encodeURIComponent('Hello Mt. Carmel Sauna, I would like to inquire about directions, pricing, and visiting today.')}`;

  return (
    <div className="space-y-0">
      {/* 1. Page Header Banner */}
      <PageBanner
        title="VISIT & CONTACT SANCTUARY"
        subtitle="Conveniently situated 3 km from Machakos Town along Kangundo Road. Reach out directly or plan your scenic drive from Nairobi."
        eyebrow="FIND US IN MACHAKOS"
        currentPage="contact"
        onNavigate={onNavigate}
      />

      {/* 2. Contact Information Cards & Map */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Column: Direct Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Location Card */}
            <div className="bg-[#161913] border border-[#2a2e26] p-6 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3 mb-3 text-[#c5a76a]">
                <MapPin className="w-5 h-5" />
                <h3 className="font-cinzel text-base font-bold text-white uppercase tracking-wider">Physical Address</h3>
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                {CONTACT_INFO.location}
              </p>
              <span className="text-xs text-[#c5a76a] font-medium bg-[#c5a76a]/10 px-2.5 py-1 rounded inline-block">
                3 km from Machakos Town Centre
              </span>
            </div>

            {/* Direct Phone Lines Card */}
            <div className="bg-[#161913] border border-[#2a2e26] p-6 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3 mb-3 text-[#c5a76a]">
                <Phone className="w-5 h-5" />
                <h3 className="font-cinzel text-base font-bold text-white uppercase tracking-wider">Direct Phone Lines</h3>
              </div>
              <p className="text-xs text-white/60 mb-3">
                Tap any phone number to call our reception desk directly:
              </p>
              <div className="space-y-2">
                {CONTACT_INFO.phones.map((phone, idx) => (
                  <a
                    key={idx}
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5 hover:border-[#c5a76a] text-white hover:text-[#c5a76a] transition-all text-sm font-semibold"
                  >
                    <span>{phone}</span>
                    <span className="text-[10px] uppercase font-bold text-[#c5a76a]">Call Reception</span>
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp Direct */}
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-[#25D366]/20 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-black" />
              <span>CHAT ON WHATSAPP (0704 415 761)</span>
            </a>

            {/* Operating Hours Card */}
            <div className="bg-[#161913] border border-[#2a2e26] p-6 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3 mb-3 text-[#c5a76a]">
                <Clock className="w-5 h-5" />
                <h3 className="font-cinzel text-base font-bold text-white uppercase tracking-wider">Operating Hours</h3>
              </div>
              <p className="text-white text-base font-bold mb-1">
                {CONTACT_INFO.hours}
              </p>
              <p className="text-xs text-white/60">
                Open 7 days a week, including all public holidays and weekends.
              </p>
            </div>
          </div>

          {/* Right Column: Google Maps & Directions */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className="bg-[#161913] border border-[#2a2e26] rounded-2xl overflow-hidden shadow-xl flex-1 flex flex-col">
              <div className="p-4 bg-[#0f110d] border-b border-[#2a2e26] flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#c5a76a]" />
                  <span>Interactive Sanctuary Map</span>
                </span>
                <a
                  href="https://maps.google.com/?q=Machakos+Kangundo+Road+Kenya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#c5a76a] font-semibold flex items-center gap-1 hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="h-80 sm:h-96 w-full relative">
                <iframe
                  title="Mt Carmel Sauna Location Map"
                  src={CONTACT_INFO.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale contrast-125 opacity-90 hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <div className="p-5 bg-[#0f110d]/80 text-xs text-white/70 border-t border-[#2a2e26] flex items-center justify-between">
                <span>Free private on-site parking with 24/7 security guards.</span>
                <span className="text-[#c5a76a] font-semibold">Machakos–Kangundo Rd</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Detailed Route & Driving Directions Guide */}
        <div className="bg-[#161913] border border-[#2a2e26] rounded-2xl p-8 sm:p-10 mb-16 shadow-2xl">
          <div className="mb-8">
            <span className="text-xs text-[#c5a76a] font-bold uppercase tracking-widest block mb-1">
              Step-by-Step Navigation
            </span>
            <h3 className="font-cinzel text-2xl font-bold text-white">
              HOW TO GET HERE
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Route 1: From Nairobi */}
            <div className="bg-black/40 border border-white/5 p-6 rounded-xl space-y-3">
              <div className="flex items-center gap-2.5 text-[#c5a76a]">
                <Car className="w-5 h-5" />
                <h4 className="font-cinzel text-base font-bold text-white">From Nairobi (55 mins)</h4>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                Take Mombasa Road (A104) past Athi River to the Machakos Junction (Kyumbi). Follow the smooth dual carriage into Machakos Town, then take the Kangundo Road exit for 3 km.
              </p>
            </div>

            {/* Route 2: From Machakos Town */}
            <div className="bg-black/40 border border-white/5 p-6 rounded-xl space-y-3">
              <div className="flex items-center gap-2.5 text-[#c5a76a]">
                <MapPin className="w-5 h-5" />
                <h4 className="font-cinzel text-base font-bold text-white">From Town Centre (5 mins)</h4>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                Head northeast out of Machakos Town along Kangundo Road. Drive past the scenic hills for exactly 3 km. You will spot our Mt. Carmel wooden sanctuary signboard on your left.
              </p>
            </div>

            {/* Route 3: Public Transport */}
            <div className="bg-black/40 border border-white/5 p-6 rounded-xl space-y-3">
              <div className="flex items-center gap-2.5 text-[#c5a76a]">
                <Bus className="w-5 h-5" />
                <h4 className="font-cinzel text-base font-bold text-white">Public Transit (Matatu)</h4>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                Board any Machakos matatu/shuttle from Nairobi Railways or Machakos Country Bus. From Machakos Main Stage, take a quick Kangundo road matatu or a 3-minute Boda-Boda directly to our gate.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Quick Message & Inquiry Form */}
        <div className="bg-[#161913] border border-[#c5a76a]/40 rounded-2xl p-6 sm:p-10 max-w-2xl mx-auto shadow-2xl">
          <div className="text-center mb-8">
            <span className="text-xs text-[#c5a76a] font-bold uppercase tracking-widest block mb-1">
              Have a Question?
            </span>
            <h3 className="font-cinzel text-2xl font-bold text-white">
              SEND US A QUICK MESSAGE
            </h3>
            <p className="text-xs text-white/60 mt-1">
              We respond promptly to general questions, group inquiries, and special requests.
            </p>
          </div>

          {inquirySent ? (
            <div className="p-6 bg-[#c5a76a]/15 border border-[#c5a76a] rounded-xl text-center space-y-2 animate-fadeIn">
              <CheckCircle2 className="w-10 h-10 text-[#c5a76a] mx-auto" />
              <h4 className="font-cinzel text-lg font-bold text-white">Thank You for Reaching Out!</h4>
              <p className="text-xs text-white/80">
                Your message has been received. Our guest concierge will get back to you shortly via phone or WhatsApp.
              </p>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div>
                <label className="block text-[#c5a76a] text-xs font-bold uppercase tracking-wider mb-1">
                  YOUR NAME *
                </label>
                <input
                  type="text"
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  placeholder="e.g. Grace Wambua"
                  required
                  className="w-full px-4 py-3 bg-[#0f110d] border border-[#2a2e26] focus:border-[#c5a76a] text-white rounded-lg outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-[#c5a76a] text-xs font-bold uppercase tracking-wider mb-1">
                  PHONE OR EMAIL *
                </label>
                <input
                  type="text"
                  value={inquiryPhone}
                  onChange={(e) => setInquiryPhone(e.target.value)}
                  placeholder="0727 430 345 or email"
                  required
                  className="w-full px-4 py-3 bg-[#0f110d] border border-[#2a2e26] focus:border-[#c5a76a] text-white rounded-lg outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-[#c5a76a] text-xs font-bold uppercase tracking-wider mb-1">
                  YOUR MESSAGE / INQUIRY *
                </label>
                <textarea
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  rows={3}
                  placeholder="Ask about group rates, specific herbs, driving directions, or packages..."
                  required
                  className="w-full px-4 py-3 bg-[#0f110d] border border-[#2a2e26] focus:border-[#c5a76a] text-white rounded-lg outline-none text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#c5a76a] hover:bg-[#d8b87b] text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#c5a76a]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>SUBMIT INQUIRY</span>
              </button>
            </form>
          )}
        </div>

        {/* Bottom Booking Strip */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenBooking}
            className="px-8 py-4 bg-[#c5a76a] hover:bg-[#d8b87b] text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-[#c5a76a]/20 inline-flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>RESERVE YOUR APPOINTMENT NOW</span>
          </button>
        </div>
      </section>
    </div>
  );
};
