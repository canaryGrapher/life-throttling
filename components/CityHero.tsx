'use client';

import React, { useRef, useEffect } from 'react';
import { City } from '../types';
import { MapPin } from './Icons';

export const ParallaxCityHero = ({ city }: { city: City }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Only animate if in viewport
      if (rect.top < viewportHeight && rect.bottom > 0) {
        // Calculate a gentle parallax offset
        // When rect.top is 0 (top of viewport), offset should be roughly centered
        // We move the image slightly slower than scroll
        const speed = 0.25;
        const offset = rect.top * speed;
        
        // Apply transform
        img.style.transform = `translateY(${offset}px) scale(1.1)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl mb-10 group bg-gray-900 z-0">
      <img 
        ref={imgRef}
        src={city.image} 
        alt={city.name} 
        className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover transition-transform duration-75 will-change-transform"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
      
      <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full z-20">
         <div className="flex items-center gap-2 text-white/70 text-sm font-bold uppercase tracking-widest mb-3">
            <MapPin className="w-4 h-4" />
            Explore City
         </div>
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div>
             <h2 className="text-5xl md:text-8xl font-serif font-bold text-white mb-4 leading-none">
                {city.name}
             </h2>
             <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed font-light">
                {city.description}
             </p>
           </div>
           
           {/* Decorative generic stat */}
           <div className="hidden md:block">
              <div className="flex -space-x-3 mb-2">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-md" />
                 ))}
              </div>
              <div className="text-white/60 text-xs font-medium text-right">{city.places.length} Spots Logged</div>
           </div>
         </div>
      </div>
    </div>
  );
};

