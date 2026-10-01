import React, { useState } from 'react';
import { CONTACT_INFO } from '../data/mockData';
import { MapPin, Phone, Clock, Mail, MessageSquare, Send, CheckCircle2, Navigation, MessageCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;

    setSubmitted(true);
    setTimeout(() => {
      setInquiryName('');
      setInquiryPhone('');
      setInquiryMessage('');
    }, 4000);
  };

  const directWhatsAppUrl = `https://wa.me/254704415761?text=${encodeURIComponent('Hello Mt. Carmel Sauna, I would like to inquire about your sauna sessions and massage availability.')}`;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-xs md:text-sm font-semibold tracking-[4px] text-[#c5a76a] uppercase mb-2">
          GET IN TOUCH
        </p>
        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-[2px]">
          CONTACT & LOCATION
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto mt-4 text-sm sm:text-base font-light">
          We welcome walk-ins and advance reservations 7 days a week. Connect with our welcoming front desk team.
        </p>
        <div className="w-20 h-1 bg-[#c5a76a] mx-auto mt-4 rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Info Cards Column */}
        <div className="lg:col-span-5 space-y-5 text-left">
          {/* Location Card */}
          <div className="bg-[#161913] p-6 rounded-xl border border-[#2a2e26] hover:border-[#c5a76a]/50 transition-colors shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#c5a76a]/15 text-[#c5a76a] flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-cinzel text-base font-bold text-white mb-1">Sanctuary Location</h3>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                  {CONTACT_INFO.location}
                </p>
                <a
                  href="https://maps.google.com/?q=Machakos+Kangundo+Road+Kenya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#c5a76a] hover:underline font-semibold mt-2"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Phone Numbers Card */}
          <div className="bg-[#161913] p-6 rounded-xl border border-[#2a2e26] hover:border-[#c5a76a]/50 transition-colors shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#c5a76a]/15 text-[#c5a76a] flex items-center justify-center shrink-0 mt-0.5">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-cinzel text-base font-bold text-white mb-2">Direct Phone Lines</h3>
                <div className="space-y-2">
                  {CONTACT_INFO.phones.map((phone, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <a
                        href={`tel:${phone.replace(/\s+/g, '')}`}
                        className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors hover:underline tracking-wider"
                      >
                        {phone}
                      </a>
                      <span className="text-[10px] text-white/40 uppercase">Line {idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Operating Hours Card */}
          <div className="bg-[#161913] p-6 rounded-xl border border-[#2a2e26] hover:border-[#c5a76a]/50 transition-colors shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#c5a76a]/15 text-[#c5a76a] flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-cinzel text-base font-bold text-white mb-1">Operating Hours</h3>
                <p className="text-white/90 text-sm font-medium">
                  {CONTACT_INFO.hours}
                </p>
                <p className="text-xs text-white/50 mt-1">Open on all public holidays and weekends.</p>
              </div>
            </div>
          </div>

          {/* Instant WhatsApp Quick Button */}
          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-4 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-[#25D366]/20"
          >
            <MessageCircle className="w-5 h-5 fill-black" />
            <span>Chat With Us On WhatsApp (070 4415761)</span>
          </a>
        </div>

        {/* Map & Inquiry Form Column */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Interactive Map */}
          <div className="bg-[#161913] rounded-xl border border-[#2a2e26] overflow-hidden shadow-2xl relative">
            <div className="p-4 bg-[#11130f] border-b border-[#2a2e26] flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#c5a76a] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Live Map View • Machakos–Kangundo Corridor
              </span>
              <span className="text-[11px] text-white/50">Machakos, Kenya</span>
            </div>

            <div className="relative h-72 sm:h-80 w-full bg-[#11130f]">
              <iframe
                src={CONTACT_INFO.mapEmbedUrl}
                title="Mt. Carmel Herbal Sauna Location"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: 'invert(90%) hue-rotate(180deg) contrast(1.1) brightness(0.85)'
                }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Quick Message / Inquiry Form */}
          <div className="bg-[#161913] p-6 sm:p-8 rounded-xl border border-[#2a2e26] shadow-xl">
            <h3 className="font-cinzel text-lg font-bold text-white mb-1">
              Send a Quick Inquiry
            </h3>
            <p className="text-xs text-white/60 mb-4">
              Have a special group request or private booking question? Leave a message below.
            </p>

            {submitted ? (
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/50 rounded-lg text-emerald-200 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <p className="font-bold">Thank you for contacting us!</p>
                  <p className="text-white/80">Our front desk team will call or message you promptly.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="Your Name"
                    className="px-3.5 py-2.5 bg-[#0f110d] border border-[#2a2e26] focus:border-[#c5a76a] text-white text-xs rounded outline-none"
                  />
                  <input
                    type="tel"
                    required
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    placeholder="Your Phone Number"
                    className="px-3.5 py-2.5 bg-[#0f110d] border border-[#2a2e26] focus:border-[#c5a76a] text-white text-xs rounded outline-none"
                  />
                </div>
                <textarea
                  rows={2}
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  placeholder="How can we help you? (e.g. Private corporate group booking, specific treatment inquiries...)"
                  className="w-full px-3.5 py-2.5 bg-[#0f110d] border border-[#2a2e26] focus:border-[#c5a76a] text-white text-xs rounded outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#c5a76a] hover:bg-[#d8b87b] text-black font-bold text-xs uppercase tracking-wider rounded transition-all flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
