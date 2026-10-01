import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const whatsappUrl = `https://wa.me/254704415761?text=${encodeURIComponent('Hello Mt. Carmel Sauna, I am interested in your services and I would like to make an inquiry.')}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-4 sm:right-6 z-40 p-3 sm:p-4 bg-[#25D366] hover:bg-[#20bd5a] active:scale-95 text-black rounded-full shadow-[0_4px_25px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-110 flex items-center justify-center group min-w-[48px] min-h-[48px]"
      aria-label="Chat on WhatsApp"
      title="Instant WhatsApp Booking & Inquiries"
    >
      <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-black" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-bold text-xs pl-0 group-hover:pl-2 text-black">
        WhatsApp Us
      </span>
    </a>
  );
};
