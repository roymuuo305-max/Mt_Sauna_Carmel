import React, { useState, useEffect } from 'react';
import { GALLERY_DATA } from '../data/mockData';
import { GalleryItem } from '../types';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos (2)' },
    { id: 'massage', label: 'Therapeutic Session' },
    { id: 'steam', label: 'Herbal Boiler System' }
  ];

  const filteredItems = activeCategory === 'all'
    ? GALLERY_DATA
    : GALLERY_DATA.filter((item) => item.category === activeCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-xs md:text-sm font-semibold tracking-[4px] text-[#c5a76a] uppercase mb-2">
          AUTHENTIC SANCTUARY
        </p>
        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-[2px]">
          SANCTUARY GALLERY
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto mt-4 text-sm sm:text-base font-light">
          Authentic visual tour featuring our Therapeutic Session and traditional Herbal Infusion Steam Boiler System in Machakos, Kenya.
        </p>
        <div className="w-20 h-1 bg-[#c5a76a] mx-auto mt-4 rounded-full" />
      </div>

      {/* Filter Categories */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                isActive
                  ? 'bg-[#c5a76a] text-black shadow-md shadow-[#c5a76a]/20'
                  : 'bg-[#161913] text-white/70 hover:text-white hover:bg-white/10 border border-[#2a2e26]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Photo Grid (Centered 2-Column) */}
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setLightboxIndex(index)}
            className="group relative h-72 rounded-xl overflow-hidden border border-[#2a2e26] bg-[#161913] cursor-pointer shadow-lg hover:border-[#c5a76a]/60 transition-all duration-300 transform hover:-translate-y-1"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              loading="lazy"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

            {/* Hover Expand Icon */}
            <div className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-[#c5a76a] opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4" />
            </div>

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
              <span className="text-[10px] font-bold text-[#c5a76a] uppercase tracking-widest block mb-1">
                {item.categoryLabel}
              </span>
              <h3 className="font-cinzel text-lg font-bold text-white mb-1 group-hover:text-[#c5a76a] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-white/70 line-clamp-2">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left / Prev */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/60 hover:bg-[#c5a76a] hover:text-black text-white transition-all border border-white/10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right / Next */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/60 hover:bg-[#c5a76a] hover:text-black text-white transition-all border border-white/10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Detail Card */}
          <div className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <img
              src={filteredItems[lightboxIndex].imageUrl}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
            />
            <div className="mt-4 text-center max-w-2xl px-4">
              <span className="text-xs font-bold text-[#c5a76a] uppercase tracking-widest">
                {filteredItems[lightboxIndex].categoryLabel} ({lightboxIndex + 1} / {filteredItems.length})
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mt-1">
                {filteredItems[lightboxIndex].title}
              </h3>
              <p className="text-sm text-white/80 mt-2 font-light">
                {filteredItems[lightboxIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
