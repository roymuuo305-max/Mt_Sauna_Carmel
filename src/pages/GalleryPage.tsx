import React, { useState, useEffect } from 'react';
import { PageSection, GalleryItem } from '../types';
import { PageBanner } from '../components/PageBanner';
import { GALLERY_DATA } from '../data/mockData';
import {
  Sparkles,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  Camera,
  Calendar,
  Layers,
  MapPin
} from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (section: PageSection) => void;
  onOpenBooking: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate, onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos (2)' },
    { id: 'massage', label: 'Therapeutic Session' },
    { id: 'steam', label: 'Herbal Boiler System' }
  ];

  const filteredItems = selectedCategory === 'all'
    ? GALLERY_DATA
    : GALLERY_DATA.filter((item) => item.category === selectedCategory);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;

      if (e.key === 'Escape') {
        setActiveLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : 0));
      } else if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, filteredItems.length]);

  const activePhoto = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  return (
    <div className="space-y-0">
      {/* 1. Page Header Banner */}
      <PageBanner
        title="SANCTUARY GALLERY"
        subtitle="Authentic visual tour featuring our Therapeutic Session and traditional Herbal Infusion Steam Boiler System in Machakos, Kenya."
        eyebrow="IMMERSIVE VISUALS"
        currentPage="gallery"
        onNavigate={onNavigate}
      />

      {/* 2. Gallery & Filter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-left">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setActiveLightboxIndex(null);
                }}
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

        {/* Gallery Grid (Centered 2-Column) */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8 mb-16">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxIndex(index)}
              className="group relative h-80 rounded-2xl overflow-hidden border border-[#2a2e26] bg-[#161913] cursor-pointer shadow-xl hover:border-[#c5a76a]/60 transition-all duration-500 transform hover:-translate-y-1"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Zoom Icon Button */}
              <div className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 border border-white/20 text-white group-hover:text-[#c5a76a] group-hover:border-[#c5a76a] transition-colors backdrop-blur-sm">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Text Information */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end text-left">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a76a] block mb-1">
                  {item.categoryLabel}
                </span>
                <h3 className="font-cinzel text-lg font-bold text-white mb-1.5 group-hover:text-[#c5a76a] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-white/70 leading-relaxed line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activePhoto && activeLightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-lg">
            <div className="relative max-w-4xl w-full bg-[#161913] border border-[#c5a76a] rounded-2xl overflow-hidden shadow-2xl flex flex-col text-left">
              {/* Close Button */}
              <button
                onClick={() => setActiveLightboxIndex(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/70 text-white/80 hover:text-white hover:bg-black border border-white/20 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Container with Prev/Next Controls */}
              <div className="relative h-[55vh] sm:h-[65vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.title}
                  className="w-full h-full object-contain"
                />

                {/* Left Navigation Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveLightboxIndex((activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black text-white hover:text-[#c5a76a] border border-white/20 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Right Navigation Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black text-white hover:text-[#c5a76a] border border-white/20 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Caption Strip */}
              <div className="p-6 bg-[#161913] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a76a] bg-[#c5a76a]/10 px-2.5 py-0.5 rounded">
                      {activePhoto.categoryLabel}
                    </span>
                    <span className="text-xs text-white/40">
                      Photo {activeLightboxIndex + 1} of {filteredItems.length}
                    </span>
                  </div>
                  <h3 className="font-cinzel text-xl font-bold text-white mb-1">
                    {activePhoto.title}
                  </h3>
                  <p className="text-xs text-white/70 max-w-xl">
                    {activePhoto.caption}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveLightboxIndex(null);
                    onOpenBooking();
                  }}
                  className="px-6 py-3 bg-[#c5a76a] text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#d8b87b] transition-all whitespace-nowrap shadow-lg shadow-[#c5a76a]/20"
                >
                  BOOK THIS EXPERIENCE
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Architecture & Ambiance Notes */}
        <div className="bg-[#161913] border border-[#2a2e26] rounded-2xl p-8 sm:p-10 mb-16 text-left shadow-xl">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#c5a76a] uppercase tracking-widest block mb-1">
              Sanctuary Architecture
            </span>
            <h3 className="font-cinzel text-2xl font-bold text-white mb-3">
              Crafted with Cedarwood, Stone & Mountain Air
            </h3>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-4">
              Every detail of our sanctuary has been engineered to foster tranquil sensory harmony. Handcrafted natural cedarwood benches release therapeutic terpenes when warmed, natural slate stones hold radiant residual warmth, and large shaded garden terraces allow fresh hill breezes to ease post-steam cool down.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <button
            onClick={onOpenBooking}
            className="px-8 py-4 bg-[#c5a76a] hover:bg-[#d8b87b] text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-[#c5a76a]/20 inline-flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>RESERVE YOUR SANCTUARY VISIT</span>
          </button>
        </div>
      </section>
    </div>
  );
};
