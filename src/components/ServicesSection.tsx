import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/mockData';
import { ServiceItem, Booking } from '../types';
import { Check, Sparkles, Clock, Calendar, Phone, User, Users, MessageSquare, ShieldCheck } from 'lucide-react';

interface ServicesSectionProps {
  onAddBooking: (booking: Omit<Booking, 'id' | 'created_at' | 'status'>) => void;
  preselectedServiceId?: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onAddBooking,
  preselectedServiceId
}) => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedService, setSelectedService] = useState<string>(
    preselectedServiceId ? SERVICES_DATA.find(s => s.id === preselectedServiceId)?.name || SERVICES_DATA[0].name : SERVICES_DATA[0].name
  );
  const [bookingDate, setBookingDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [bookingTime, setBookingTime] = useState('10:00');
  const [guests, setGuests] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  const [formError, setFormError] = useState('');

  // Selected service object for dynamic price calculation
  const currentServiceObj = SERVICES_DATA.find((s) => s.name === selectedService) || SERVICES_DATA[0];
  const totalPrice = (currentServiceObj?.price || 500) * guests;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.length < 9) {
      setFormError('Please enter a valid phone number (e.g. 0712 345 678).');
      return;
    }
    if (!bookingDate) {
      setFormError('Please select a preferred date.');
      return;
    }
    if (!bookingTime) {
      setFormError('Please select a preferred time slot.');
      return;
    }

    onAddBooking({
      full_name: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      service: selectedService,
      serviceId: currentServiceObj.id,
      booking_date: bookingDate,
      booking_time: bookingTime,
      guests: guests,
      special_requests: specialRequests.trim() || undefined,
      total_price: totalPrice
    });

    // Reset form
    setFullName('');
    setPhone('');
    setEmail('');
    setSpecialRequests('');
  };

  const handleSelectServiceFromCard = (service: ServiceItem) => {
    setSelectedService(service.name);
    const formElement = document.getElementById('booking-form-card');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-xs md:text-sm font-semibold tracking-[4px] text-[#c5a76a] uppercase mb-2">
          AUTHENTIC KENYAN WELLNESS
        </p>
        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-[2px]">
          SERVICES & RESERVATIONS
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto mt-4 text-sm sm:text-base font-light">
          Choose from our authentic Herbal Sauna Session (KSh 500) and Therapeutic Session (KSh 1,000) for deep relaxation and muscle rejuvenation.
        </p>
        <div className="w-20 h-1 bg-[#c5a76a] mx-auto mt-4 rounded-full" />
      </div>

      {/* Services Grid (Centered 2-column) */}
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8 mb-16">
        {SERVICES_DATA.map((service) => {
          const isSelectedInForm = selectedService === service.name;
          return (
            <div
              key={service.id}
              className={`bg-[#161913] border rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 relative group text-left shadow-xl ${
                service.popular
                  ? 'border-[#c5a76a] shadow-[0_0_30px_rgba(197,167,106,0.15)] ring-1 ring-[#c5a76a]/50'
                  : 'border-[#2a2e26] hover:border-[#c5a76a]/50'
              }`}
            >
              {/* Card Image */}
              <div className="relative h-48 w-full overflow-hidden bg-black/50">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161913] via-[#161913]/30 to-transparent" />
                
                {service.popular && (
                  <div className="absolute top-4 right-4 bg-[#c5a76a] text-black text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                    Signature Ritual
                  </div>
                )}

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#c5a76a] tracking-wider uppercase bg-black/60 px-2 py-0.5 rounded border border-[#c5a76a]/30">
                    {service.tagline}
                  </span>
                  <span className="text-xs text-white/80 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded">
                    <Clock className="w-3 h-3 text-[#c5a76a]" />
                    {service.duration}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-cinzel text-xl font-bold text-white mb-2 group-hover:text-[#c5a76a] transition-colors">
                    {service.name}
                  </h3>

                  <div className="mb-4">
                    <span className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#c5a76a]">
                      KSh {service.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-white/50 ml-1">/ person</span>
                  </div>

                <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="space-y-2 mb-8 border-t border-white/5 pt-4">
                  <span className="text-[11px] font-bold text-white/90 uppercase tracking-wider block mb-2">
                    What is included:
                  </span>
                  {service.included.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-white/80">
                      <Check className="w-3.5 h-3.5 text-[#c5a76a] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

                <button
                  type="button"
                  onClick={() => handleSelectServiceFromCard(service)}
                  className={`w-full py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isSelectedInForm
                      ? 'bg-[#c5a76a] text-black font-bold'
                      : 'bg-white/5 hover:bg-[#c5a76a] hover:text-black text-white border border-white/10'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isSelectedInForm ? 'Selected In Form Below' : 'Choose This Service'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Booking Form Card */}
      <div
        id="booking-form-card"
        className="bg-[#161913] border border-[#c5a76a]/50 rounded-xl p-6 sm:p-10 md:p-12 max-w-2xl mx-auto shadow-2xl relative text-left"
      >
        <div className="text-center mb-8">
          <span className="text-xs text-[#c5a76a] font-bold uppercase tracking-widest block mb-1">
            Seamless Online Reservation
          </span>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white">
            BOOK A SESSION
          </h2>
          <p className="text-xs text-white/60 mt-1">
            Fill in your preferred date and time. No upfront prepayment required.
          </p>
        </div>

        {formError && (
          <div className="mb-6 p-3 bg-red-950/40 border border-red-500/50 rounded text-red-200 text-xs font-medium">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="form-group">
            <label className="block text-[#c5a76a] text-xs font-bold tracking-wider uppercase mb-1.5">
              FULL NAME *
            </label>
            <div className="relative">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. John Mwangi"
                required
                className="w-full px-4 py-3 pl-10 bg-[#0f110d] border border-[#2a2e26] focus:border-[#c5a76a] text-white rounded outline-none text-sm transition-colors"
              />
              <User className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Phone & Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-[#c5a76a] text-xs font-bold tracking-wider uppercase mb-1.5">
                PHONE NUMBER *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0712 345 678"
                  required
                  className="w-full px-4 py-3 pl-10 bg-[#0f110d] border border-[#2a2e26] focus:border-[#c5a76a] text-white rounded outline-none text-sm transition-colors"
                />
                <Phone className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-[#c5a76a] text-xs font-bold tracking-wider uppercase mb-1.5">
                EMAIL (OPTIONAL)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@email.com"
                className="w-full px-4 py-3 bg-[#0f110d] border border-[#2a2e26] focus:border-[#c5a76a] text-white rounded outline-none text-sm transition-colors"
              />
            </div>
          </div>

          {/* Service Selection */}
          <div className="form-group">
            <label className="block text-[#c5a76a] text-xs font-bold tracking-wider uppercase mb-1.5">
              SELECT SERVICE *
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full px-4 py-3 bg-[#0f110d] border border-[#2a2e26] focus:border-[#c5a76a] text-white rounded outline-none text-sm cursor-pointer transition-colors"
            >
              {SERVICES_DATA.map((srv) => (
                <option key={srv.id} value={srv.name} className="bg-[#0f110d] text-white">
                  {srv.name} (KSh {srv.price.toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          {/* Date, Time, & Guests Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="form-group">
              <label className="block text-[#c5a76a] text-xs font-bold tracking-wider uppercase mb-1.5">
                PREFERRED DATE *
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={bookingDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setBookingDate(e.target.value)}
                  required
                  className="w-full px-3 py-3 bg-[#0f110d] border border-[#2a2e26] focus:border-[#c5a76a] text-white rounded outline-none text-sm"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-[#c5a76a] text-xs font-bold tracking-wider uppercase mb-1.5">
                PREFERRED TIME *
              </label>
              <select
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                className="w-full px-3 py-3 bg-[#0f110d] border border-[#2a2e26] focus:border-[#c5a76a] text-white rounded outline-none text-sm cursor-pointer"
              >
                <option value="07:30">07:30 AM (Morning Rise)</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:30">10:30 AM</option>
                <option value="12:00">12:00 PM (Midday)</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:30">03:30 PM</option>
                <option value="17:00">05:00 PM</option>
                <option value="18:30">06:30 PM (Evening Glow)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="block text-[#c5a76a] text-xs font-bold tracking-wider uppercase mb-1.5">
                GUESTS
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full px-3 py-3 bg-[#0f110d] border border-[#2a2e26] focus:border-[#c5a76a] text-white rounded outline-none text-sm cursor-pointer"
              >
                <option value={1}>1 Guest (Solo)</option>
                <option value={2}>2 Guests (Couple)</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests (Group)</option>
              </select>
            </div>
          </div>

          {/* Special Requests / Notes */}
          <div className="form-group">
            <label className="block text-[#c5a76a] text-xs font-bold tracking-wider uppercase mb-1.5">
              SPECIAL REQUESTS / FOCUS AREAS (OPTIONAL)
            </label>
            <div className="relative">
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                rows={2}
                placeholder="e.g. Focus on lower back tension, prefer light pressure, first time sauna visit..."
                className="w-full px-4 py-2.5 bg-[#0f110d] border border-[#2a2e26] focus:border-[#c5a76a] text-white rounded outline-none text-sm transition-colors"
              />
            </div>
          </div>

          {/* Price Summary Calculation Strip */}
          <div className="p-4 bg-black/40 border border-white/10 rounded-lg flex items-center justify-between">
            <div>
              <span className="text-[11px] text-white/50 uppercase tracking-wider block">Estimated Total</span>
              <span className="text-xs text-white/80">{guests} × {selectedService}</span>
            </div>
            <div className="text-right">
              <span className="font-cinzel text-xl sm:text-2xl font-bold text-[#c5a76a]">
                KSh {totalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-[#c5a76a] hover:bg-[#d8b87b] text-black font-bold text-sm uppercase tracking-[2px] rounded transition-all duration-300 shadow-xl shadow-[#c5a76a]/20 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
          >
            <Calendar className="w-4 h-4" />
            <span>CONFIRM BOOKING</span>
          </button>

          <p className="text-[11px] text-center text-white/50 mt-2 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#c5a76a]" />
            Free cancellation. Instant confirmation via WhatsApp or phone.
          </p>
        </form>
      </div>
    </section>
  );
};
