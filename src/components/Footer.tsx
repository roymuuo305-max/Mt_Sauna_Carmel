import React from 'react';
import { PageSection } from '../types';
import { CONTACT_INFO } from '../data/mockData';
import { MapPin, Phone, Clock, Shield, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: PageSection) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <footer className="relative z-10 bg-[#0b0c0a]/85 backdrop-blur-md border-t border-white/10 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-left text-white/70">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Col 1: Brand & Philosophy */}
        <div className="space-y-4">
          <div>
            <h2 className="font-cinzel text-xl font-bold tracking-[3px] text-white">
              MT. CARMEL
            </h2>
            <span className="text-[10px] tracking-[5px] text-[#c5a76a] font-semibold uppercase block">
              HERBAL SAUNA
            </span>
          </div>
          <p className="text-xs leading-relaxed text-white/60">
            An oasis of natural renewal situated 3 km from Machakos Town. Restoring balance through indigenous herbal steam therapy and therapeutic touch.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenBooking}
              className="px-4 py-2 bg-[#c5a76a] text-black font-bold text-xs uppercase tracking-wider rounded hover:bg-[#d8b87b] transition-all"
            >
              Book A Session
            </button>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div>
          <h3 className="font-cinzel text-sm font-bold uppercase tracking-wider text-white mb-4">
            Sanctuary Navigation
          </h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-[#c5a76a] transition-colors">
                Home Sanctuary
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('about')} className="hover:text-[#c5a76a] transition-colors">
                Our Story & Heritage
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('benefits')} className="hover:text-[#c5a76a] transition-colors">
                Health & Wellness Benefits
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('services')} className="hover:text-[#c5a76a] transition-colors">
                Services & Reservations
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('gallery')} className="hover:text-[#c5a76a] transition-colors">
                Sanctuary Gallery
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('contact')} className="hover:text-[#c5a76a] transition-colors">
                Location & Contact
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Hours & Location */}
        <div>
          <h3 className="font-cinzel text-sm font-bold uppercase tracking-wider text-white mb-4">
            Operating Hours
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-[#c5a76a] shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium">Open 7 Days A Week</p>
                <p className="text-white/60">7:00 AM – 8:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#c5a76a] shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium">Machakos, Kenya</p>
                <p className="text-white/60">3 km along Machakos–Kangundo Rd</p>
              </div>
            </div>
          </div>
        </div>

        {/* Col 4: Contact */}
        <div>
          <h3 className="font-cinzel text-sm font-bold uppercase tracking-wider text-white mb-4">
            Direct Contacts
          </h3>
          <div className="space-y-2 text-xs">
            {CONTACT_INFO.phones.map((phone, idx) => (
              <a
                key={idx}
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="block text-blue-400 hover:text-blue-300 font-mono tracking-wider"
              >
                {phone}
              </a>
            ))}
            <div className="pt-2 text-[11px] text-white/40">
              Machakos–Kangundo Rd, Kenya
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-6xl mx-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
        <p>&copy; {new Date().getFullYear()} Mt. Carmel Herbal Sauna. All Rights Reserved.</p>
        <p className="flex items-center gap-1">
          <span>Machakos, Kenya</span>
          <span>•</span>
          <span className="text-[#c5a76a]">An Oasis of Renewal</span>
        </p>
      </div>
    </footer>
  );
};
