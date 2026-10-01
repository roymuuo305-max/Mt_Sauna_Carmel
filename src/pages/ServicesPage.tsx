import React, { useState } from 'react';
import { PageSection, Booking, ServiceItem } from '../types';
import { PageBanner } from '../components/PageBanner';
import { SERVICES_DATA } from '../data/mockData';
import {
  Check,
  Sparkles,
  Clock,
  Calendar,
  Phone,
  User,
  Users,
  ShieldCheck,
  Heart,
  Droplets,
  Award,
  Gift
} from 'lucide-react';

interface ServicesPageProps {
  onAddBooking: (booking: Omit<Booking, 'id' | 'created_at' | 'status'>) => void;
  onNavigate: (section: PageSection) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onAddBooking, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedService, setSelectedService] = useState<string>(SERVICES_DATA[0].name);
  const [bookingDate, setBookingDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [bookingTime, setBookingTime] = useState('10:30');
  const [guests, setGuests] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  const [formError, setFormError] = useState('');

  // Selected service object for calculation
  const currentServiceObj = SERVICES_DATA.find((s) => s.name === selectedService) || SERVICES_DATA[0];
  const totalPrice = (currentServiceObj?.price || 500) * guests;

  const categories = [
    { id: 'all', label: 'All Services (2)' },
    { id: 'sauna', label: 'Herbal Sauna (KSh 500)' },
    { id: 'massage', label: 'Therapeutic Session (KSh 1,000)' }
  ];

  const filteredServices = selectedCategory === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === selectedCategory);

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
      setFormError('Please select your preferred date.');
      return;
    }
    if (!bookingTime) {
      setFormError('Please select your preferred time slot.');
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

    // Reset Form
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
    <div className="space-y-0">
      {/* 1. Page Header Banner */}
      <PageBanner
        title="SERVICES & RESERVATIONS"
        subtitle="Experience authentic herbal sauna wellness and therapeutic sessions in Machakos. Transparent pricing: Herbal Sauna at KSh 500 and Therapeutic Session at KSh 1,000. Book easily online with zero upfront deposit."
        eyebrow="TAILORED WELLNESS MENU"
        currentPage="services"
        onNavigate={onNavigate}
      />

      {/* 2. Category Filter & Service Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-left">
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-[#c5a76a] text-black shadow-lg shadow-[#c5a76a]/20 font-bold'
                    : 'bg-[#161913] text-white/70 hover:text-white hover:bg-white/10 border border-[#2a2e26]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Services Grid (Centered 2-Column) */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8 mb-16">
          {filteredServices.map((service) => {
            const isSelectedInForm = selectedService === service.name;
            return (
              <div
                key={service.id}
                className={`bg-[#161913] border rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 relative group shadow-xl ${
                  service.popular
                    ? 'border-[#c5a76a] shadow-[0_0_30px_rgba(197,167,106,0.15)] ring-1 ring-[#c5a76a]/50'
                    : 'border-[#2a2e26] hover:border-[#c5a76a]/50'
                }`}
              >
                {/* Service Card Image */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-black/50">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161913] via-[#161913]/40 to-transparent" />
                  
                  {service.popular && (
                    <div className="absolute top-4 right-4 bg-[#c5a76a] text-black text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                      Signature Favorite
                    </div>
                  )}

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#c5a76a] tracking-wider uppercase bg-black/60 px-2 py-0.5 rounded border border-[#c5a76a]/30">
                      {service.tagline}
                    </span>
                    <span className="text-xs text-white/80 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded">
                      <Clock className="w-3.5 h-3.5 text-[#c5a76a]" />
                      {service.duration}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-cinzel text-2xl font-bold text-white mb-2 group-hover:text-[#c5a76a] transition-colors">
                      {service.name}
                    </h3>

                    <div className="mb-4">
                      <span className="font-cinzel text-3xl font-extrabold text-[#c5a76a]">
                        KSh {service.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-white/50 ml-1.5">/ session</span>
                    </div>

                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="space-y-2 mb-8 border-t border-white/5 pt-4">
                      <span className="text-[11px] font-bold text-white/90 uppercase tracking-wider block mb-2">
                        Session Inclusions:
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
                    className={`w-full py-3.5 text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isSelectedInForm
                        ? 'bg-[#c5a76a] text-black shadow-md shadow-[#c5a76a]/20'
                        : 'bg-white/5 hover:bg-[#c5a76a] hover:text-black text-white border border-white/10'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isSelectedInForm ? 'Selected in Booking Form Below' : 'Choose This Session'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Group & Corporate Wellness Card */}
        <div className="bg-[#1b1e18] border border-[#2a2e26] rounded-2xl p-6 sm:p-8 mb-16 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-[#c5a76a] uppercase tracking-widest">
              Group & Corporate Bookings
            </span>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
              Planning a Bridal Shower or Team Retreat?
            </h3>
            <p className="text-xs sm:text-sm text-white/70">
              We offer exclusive sanctuary takeovers for groups of 5 to 20 guests with private tea lounge setup, custom herbal blends, and synchronized therapy sessions.
            </p>
          </div>

          <a
            href="https://wa.me/254704415761?text=Hello%20Mt.%20Carmel%20Sauna,%20I%20would%20like%20to%20inquire%20about%20a%20group%20wellness%20booking."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-[#25D366] text-black font-bold text-xs uppercase tracking-wider rounded-xl whitespace-nowrap"
          >
            Inquire Group Packages
          </a>
        </div>

        {/* 3. The Interactive Booking Form */}
        <div
          id="booking-form-card"
          className="bg-[#161913] border border-[#c5a76a]/50 rounded-2xl p-6 sm:p-10 md:p-12 max-w-2xl mx-auto shadow-2xl relative"
        >
          <div className="text-center mb-8">
            <span className="text-xs text-[#c5a76a] font-bold uppercase tracking-widest block mb-1">
              Guaranteed Reservation
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white">
              BOOK YOUR SESSION ONLINE
            </h2>
            <p className="text-xs text-white/60 mt-1">
              Select your date & time. You will receive an instant WhatsApp confirmation.
            </p>
          </div>

          {formError && (
            <div className="mb-6 p-3.5 bg-red-950/40 border border-red-500/50 rounded-lg text-red-200 text-xs font-medium">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-[#c5a76a] text-xs font-bold tracking-wider uppercase mb-1.5">
                FULL NAME *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. David Mwangi"
                  required
                  className="w-full px-4 py-3 pl-10 bg-[#0f110d] border border-[#2a2e26] focus:border-[#c5a76a] text-white rounded-lg outline-none text-sm"
                />
                <User className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {/* Phone & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
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
                    className="w-full px-4 py-3 pl-10 bg-[#0f110d] border border-[#2a2e26] focus:border-[#c5a76a] text-white rounded-lg outline-none text-sm"
                  />
                  <Phone className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-[#c5a76a] text-xs font-bold tracking-wider uppercase mb-1.5">
                  EMAIL (OPTIONAL)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@gmail.com"
                  className="w-full px-4 py-3 bg-[#0f110d] border border-[#2a2e26] focus:border-[#c5a76a] text-white rounded-lg outline-none text-sm"
                />
              </div>
            </div>

            {/* Service Selection */}
            <div>
              <label className="block text-[#c5a76a] text-xs font-bold tracking-wider uppercase mb-1.5">
                SELECT SERVICE / PACKAGE *
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f110d] border border-[#2a2e26] focus:border-[#c5a76a] text-white rounded-lg outline-none text-sm cursor-pointer"
              >
                {SERVICES_DATA.map((srv) => (
                  <option key={srv.id} value={srv.name} className="bg-[#0f110d] text-white">
                    {srv.name} — KSh {srv.price.toLocaleString()} ({srv.duration})
                  </option>
                ))}
              </select>
            </div>

            {/* Date, Time, Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[#c5a76a] text-xs font-bold tracking-wider uppercase mb-1.5">
                  DATE *
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setBookingDate(e.target.value)}
                  required
                  className="w-full px-3 py-3 bg-[#0f110d] border border-[#2a2e26] focus:border-[#c5a76a] text-white rounded-lg outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-[#c5a76a] text-xs font-bold tracking-wider uppercase mb-1.5">
                  TIME SLOT *
                </label>
                <select
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full px-3 py-3 bg-[#0f110d] border border-[#2a2e26] focus:border-[#c5a76a] text-white rounded-lg outline-none text-sm cursor-pointer"
                >
                  <option value="07:30">07:30 AM (Early Rise)</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="10:30">10:30 AM</option>
                  <option value="12:00">12:00 PM (Midday)</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:30">03:30 PM</option>
                  <option value="17:00">05:00 PM</option>
                  <option value="18:30">06:30 PM (Evening Glow)</option>
                </select>
              </div>

              <div>
                <label className="block text-[#c5a76a] text-xs font-bold tracking-wider uppercase mb-1.5">
                  GUESTS
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-3 py-3 bg-[#0f110d] border border-[#2a2e26] focus:border-[#c5a76a] text-white rounded-lg outline-none text-sm cursor-pointer"
                >
                  <option value={1}>1 Guest (Solo)</option>
                  <option value={2}>2 Guests (Couple/Duo)</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests (Group)</option>
                </select>
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-[#c5a76a] text-xs font-bold tracking-wider uppercase mb-1.5">
                SPECIAL REQUESTS / MASSAGE FOCUS AREAS (OPTIONAL)
              </label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                rows={2}
                placeholder="e.g. Focus on neck and shoulder stiffness, mild eucalyptus steam preference, celebrating a birthday..."
                className="w-full px-4 py-2.5 bg-[#0f110d] border border-[#2a2e26] focus:border-[#c5a76a] text-white rounded-lg outline-none text-sm"
              />
            </div>

            {/* Total Price Calculation Strip */}
            <div className="p-4 bg-black/40 border border-white/10 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-white/50 uppercase tracking-wider block">Estimated Total</span>
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
              className="w-full py-4 bg-[#c5a76a] hover:bg-[#d8b87b] text-black font-bold text-sm uppercase tracking-[2px] rounded-xl transition-all duration-300 shadow-xl shadow-[#c5a76a]/20 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              <span>CONFIRM BOOKING RESERVATION</span>
            </button>

            <p className="text-[11px] text-center text-white/50 flex items-center justify-center gap-1.5 pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c5a76a]" />
              <span>Pay with M-Pesa or Cash upon arrival. Free cancellation anytime.</span>
            </p>
          </form>
        </div>
      </section>

      {/* 4. Amenities & Guarantee Included */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="bg-[#161913] border border-[#2a2e26] p-6 rounded-xl flex items-start gap-4">
            <div className="p-3 bg-[#c5a76a]/15 text-[#c5a76a] rounded-lg shrink-0">
              <Droplets className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-cinzel text-base font-bold text-white mb-1">Eden Springs Hydration</h4>
              <p className="text-xs text-white/70">Pure chilled mineral spring water and hot organic herbal teas provided with every booking.</p>
            </div>
          </div>

          <div className="bg-[#161913] border border-[#2a2e26] p-6 rounded-xl flex items-start gap-4">
            <div className="p-3 bg-[#c5a76a]/15 text-[#c5a76a] rounded-lg shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-cinzel text-base font-bold text-white mb-1">Lockers & Fresh Linen</h4>
              <p className="text-xs text-white/70">Sterile cotton towels, robes, slippers, and individual key-coded security lockers.</p>
            </div>
          </div>

          <div className="bg-[#161913] border border-[#2a2e26] p-6 rounded-xl flex items-start gap-4">
            <div className="p-3 bg-[#c5a76a]/15 text-[#c5a76a] rounded-lg shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-cinzel text-base font-bold text-white mb-1">Certified Therapists</h4>
              <p className="text-xs text-white/70">Professional, accredited therapists ensuring respectful and tailored therapeutic touch.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
