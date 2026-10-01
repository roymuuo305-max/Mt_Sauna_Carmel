import React from 'react';
import { Booking } from '../types';
import { CheckCircle2, Calendar, Clock, Phone, User, Users, MessageCircle, X, Download, Share2 } from 'lucide-react';

interface BookingConfirmationModalProps {
  booking: Booking | null;
  onClose: () => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  booking,
  onClose
}) => {
  if (!booking) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello Mt. Carmel Herbal Sauna, I just submitted a booking reservation!\n\n` +
    `• Booking Ref: ${booking.id}\n` +
    `• Client: ${booking.full_name}\n` +
    `• Phone: ${booking.phone}\n` +
    `• Service: ${booking.service}\n` +
    `• Date: ${booking.booking_date}\n` +
    `• Time: ${booking.booking_time}\n` +
    `• Guests: ${booking.guests}\n` +
    `• Total: KSh ${booking.total_price.toLocaleString()}\n\n` +
    `Please confirm my appointment slot. Thank you!`
  );

  const whatsappUrl = `https://wa.me/254704415761?text=${whatsappMessage}`;

  const createGoogleCalendarUrl = () => {
    const startIso = `${booking.booking_date.replace(/-/g, '')}T${booking.booking_time.replace(':', '')}00`;
    // Approx 2 hours duration
    const [h, m] = booking.booking_time.split(':').map(Number);
    const endH = String((h + 2) % 24).padStart(2, '0');
    const endIso = `${booking.booking_date.replace(/-/g, '')}T${endH}${String(m).padStart(2, '0')}00`;
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Mt. Carmel Sauna Session: ' + booking.service)}&dates=${startIso}/${endIso}&details=${encodeURIComponent('Booking Reference: ' + booking.id + '\nClient: ' + booking.full_name + '\nLocation: Mt. Carmel Herbal Sauna, 3 km along Machakos-Kangundo Rd')}&location=${encodeURIComponent('Mt. Carmel Herbal Sauna, Machakos, Kenya')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#161913] border border-[#c5a76a]/60 rounded-xl max-w-lg w-full p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] relative text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/60 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon & Heading */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-[#c5a76a]/20 border border-[#c5a76a] flex items-center justify-center text-[#c5a76a]">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#c5a76a] uppercase tracking-widest block">
              Reservation Received
            </span>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
              Booking Submitted!
            </h3>
          </div>
        </div>

        <p className="text-white/80 text-xs sm:text-sm mb-6 leading-relaxed">
          Thank you, <strong className="text-white font-semibold">{booking.full_name}</strong>. Your session request has been registered in our system. You can connect with our team immediately on WhatsApp or present this reference upon arrival.
        </p>

        {/* Booking Card Details */}
        <div className="bg-black/40 border border-white/10 rounded-lg p-4 space-y-2.5 mb-6 text-xs sm:text-sm">
          <div className="flex justify-between items-center pb-2 border-b border-white/10">
            <span className="text-white/60">Reference ID:</span>
            <span className="font-mono font-bold text-[#c5a76a] text-sm">{booking.id}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-white/60 flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-[#c5a76a]" /> Service:</span>
            <span className="font-medium text-white">{booking.service}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-white/60 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#c5a76a]" /> Date:</span>
            <span className="font-medium text-white">{booking.booking_date}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-white/60 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#c5a76a]" /> Time Slot:</span>
            <span className="font-medium text-white">{booking.booking_time}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-white/60 flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-[#c5a76a]" /> Guests:</span>
            <span className="font-medium text-white">{booking.guests} Person(s)</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-white/60 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#c5a76a]" /> Phone:</span>
            <span className="font-medium text-white">{booking.phone}</span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-white/10">
            <span className="font-bold text-white">Estimated Total:</span>
            <span className="font-bold text-base text-[#c5a76a]">KSh {booking.total_price.toLocaleString()}</span>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="space-y-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#25D366]/20"
          >
            <MessageCircle className="w-4 h-4 fill-black" />
            <span>Confirm Instantly on WhatsApp</span>
          </a>

          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={createGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#c5a76a]/50 text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-all text-center"
            >
              <Calendar className="w-3.5 h-3.5 text-[#c5a76a]" />
              <span>Add to Google Cal</span>
            </a>

            <button
              onClick={onClose}
              className="py-2.5 px-3 bg-[#c5a76a] hover:bg-[#d8b87b] text-black text-xs font-bold uppercase tracking-wider rounded transition-all"
            >
              Done / Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
