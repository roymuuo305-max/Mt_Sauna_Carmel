/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageSection, Booking } from './types';
import { INITIAL_BOOKINGS } from './data/mockData';
import { SideNav } from './components/SideNav';
import { Footer } from './components/Footer';
import { BookingConfirmationModal } from './components/BookingConfirmationModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

// Modular Multi-Page Views
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { BenefitsPage } from './pages/BenefitsPage';
import { ServicesPage } from './pages/ServicesPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPortal } from './components/AdminPortal';
import sanctuaryBgImage from './assets/images/sauna_bg_main_1787247412700.jpg';

export default function App() {
  // Read initial route from URL Hash, defaulting to 'home'
  const getInitialSection = (): PageSection => {
    const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
    const validSections: PageSection[] = ['home', 'about', 'benefits', 'services', 'gallery', 'contact', 'admin'];
    if (validSections.includes(hash as PageSection)) {
      return hash as PageSection;
    }
    return 'home';
  };

  const [currentSection, setCurrentSection] = useState<PageSection>(getInitialSection);
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const stored = localStorage.getItem('mt_carmel_bookings');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading bookings from localStorage', e);
    }
    return INITIAL_BOOKINGS;
  });

  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Sync state with URL hash changes (browser back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      const validSections: PageSection[] = ['home', 'about', 'benefits', 'services', 'gallery', 'contact', 'admin'];
      if (validSections.includes(hash as PageSection)) {
        setCurrentSection(hash as PageSection);
      } else {
        setCurrentSection('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync bookings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mt_carmel_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.error('Error saving bookings to localStorage', e);
    }
  }, [bookings]);

  const handleNavigate = (section: PageSection) => {
    setCurrentSection(section);
    window.location.hash = `#/${section}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = () => {
    handleNavigate('services');
    setTimeout(() => {
      const el = document.getElementById('booking-form-card');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const handleAddBooking = (newBookingData: Omit<Booking, 'id' | 'created_at' | 'status'>) => {
    const randomId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: Booking = {
      ...newBookingData,
      id: randomId,
      status: 'Pending',
      created_at: new Date().toISOString()
    };

    setBookings((prev) => [newBooking, ...prev]);
    setConfirmedBooking(newBooking);
  };

  const handleAddManualBooking = (newBookingData: Omit<Booking, 'id' | 'created_at' | 'status'>) => {
    const randomId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: Booking = {
      ...newBookingData,
      id: randomId,
      status: 'Confirmed',
      created_at: new Date().toISOString()
    };

    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleUpdateStatus = (id: string, newStatus: Booking['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  const handleDeleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#0b0c0a] text-white selection:bg-[#c5a76a] selection:text-black">
      {/* Global Sanctuary Background Image (Applies to the entire website & all pages) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <img
          src={sanctuaryBgImage}
          alt="Mt. Carmel Herbal Sauna & Massage Sanctuary Background"
          className="w-full h-full object-cover object-center transform scale-100"
          referrerPolicy="no-referrer"
        />
        {/* Light translucent tint so the photo is clearly and vividly visible while keeping text readable */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Dynamic Appear/Disappear Side Navigation Drawer */}
      <SideNav
        currentSection={currentSection}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
      />

      {/* Main Page View (Rendered Alone across full viewport with backdrop transparency) */}
      <main className="relative z-10 flex-1 w-full overflow-x-hidden transition-all duration-300">
        {currentSection === 'home' && (
          <div className="animate-fadeIn">
            <HomePage
              onNavigate={handleNavigate}
              onOpenBooking={handleOpenBooking}
            />
          </div>
        )}

        {currentSection === 'about' && (
          <div className="animate-fadeIn">
            <AboutPage
              onNavigate={handleNavigate}
              onOpenBooking={handleOpenBooking}
            />
          </div>
        )}

        {currentSection === 'benefits' && (
          <div className="animate-fadeIn">
            <BenefitsPage
              onNavigate={handleNavigate}
              onOpenBooking={handleOpenBooking}
            />
          </div>
        )}

        {currentSection === 'services' && (
          <div className="animate-fadeIn">
            <ServicesPage
              onAddBooking={handleAddBooking}
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {currentSection === 'gallery' && (
          <div className="animate-fadeIn">
            <GalleryPage
              onNavigate={handleNavigate}
              onOpenBooking={handleOpenBooking}
            />
          </div>
        )}

        {currentSection === 'contact' && (
          <div className="animate-fadeIn">
            <ContactPage
              onNavigate={handleNavigate}
              onOpenBooking={handleOpenBooking}
            />
          </div>
        )}

        {currentSection === 'admin' && (
          <div className="animate-fadeIn">
            <AdminPortal
              bookings={bookings}
              onUpdateStatus={handleUpdateStatus}
              onDeleteBooking={handleDeleteBooking}
              onAddManualBooking={handleAddManualBooking}
              onReturnToHome={() => handleNavigate('home')}
            />
          </div>
        )}
      </main>

      {/* Persistent Footer */}
      {currentSection !== 'admin' && (
        <Footer
          onNavigate={handleNavigate}
          onOpenBooking={handleOpenBooking}
        />
      )}

      {/* Interactive Booking Confirmation Dialog */}
      <BookingConfirmationModal
        booking={confirmedBooking}
        onClose={() => setConfirmedBooking(null)}
      />

      {/* Direct Floating WhatsApp Contact Button */}
      <WhatsAppFloatingButton />
    </div>
  );
}
