'use client';

import React, { useRef, useState, useEffect } from 'react';
import { State, City, Place } from '../types';
import { ArrowUpRight, MapPin } from './Icons';

interface StateSlideshowProps {
  states: State[];
  onStateClick: (state: State) => void;
}

interface StateCardProps {
  state: State;
  index: number;
  onStateClick: (state: State) => void;
}

const StateCard: React.FC<StateCardProps> = ({ state, index, onStateClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Unobserve after it becomes visible to keep it visible
          if (cardRef.current) observer.unobserve(cardRef.current);
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the card is visible
        rootMargin: "0px"
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  // Calculate mock stats based on data
  const citiesCount = state.cities.length;
  const placesCount = state.cities.reduce((acc, city) => acc + city.places.length, 0);
  const previewImages = state.cities
    .flatMap((c): (Place | City)[] => c.places.length > 0 ? c.places : [c])
    .slice(0, 3)
    .map(item => item.image);

  return (
    <div 
      ref={cardRef}
      className="sticky top-24 min-h-[85vh] w-full container mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform duration-500 origin-top"
      style={{ 
        zIndex: index + 1,
      }}
    >
      {/* Background Image */}
      <img 
        src={state.image} 
        alt={state.name} 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(215,50%,20%)]/90 via-[hsl(215,50%,20%)]/40 to-transparent" />
      
      {/* Dark gradient from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />

      {/* Content Container */}
      <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-between">
        
        {/* Top Section: Title & Description */}
        <div className={`max-w-3xl pt-8 md:pt-16 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="flex items-center gap-2 text-white/80 mb-4 tracking-widest text-sm font-semibold uppercase">
             <MapPin className="w-4 h-4" />
             <span>Explore Region</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-sans font-bold text-white mb-6 uppercase leading-[0.9] tracking-tight">
            {state.name}
          </h2>
          <p className="text-lg md:text-2xl text-white/90 font-light max-w-xl leading-relaxed">
            {state.description}
          </p>
          
          <button 
            onClick={() => onStateClick(state)}
            className="mt-8 md:mt-12 bg-white text-black pl-8 pr-2 py-2 rounded-full font-bold text-lg flex items-center gap-4 hover:scale-105 transition-transform group"
          >
            Explore {state.name}
            <div className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </button>
        </div>

        {/* Bottom Section: Stats & "Agents" */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4 transition-all duration-1000 delay-300 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          
          {/* Stats */}
          <div className="flex gap-8 md:gap-16">
            <div>
              <div className="text-4xl md:text-5xl font-sans font-bold text-white">
                {citiesCount}+
              </div>
              <div className="text-white/70 text-sm uppercase tracking-wider mt-1">
                Cities Explored
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-sans font-bold text-white">
                {placesCount}+
              </div>
              <div className="text-white/70 text-sm uppercase tracking-wider mt-1">
                Hidden Gems
              </div>
            </div>
             {/* Removed Kilometers stat */}
          </div>

          {/* Top Spots Preview */}
          {previewImages.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="text-white font-semibold text-right">Top Spots</span>
              <div className="flex -space-x-4">
                {previewImages.map((img, i) => (
                  <div key={i} className="w-14 h-14 rounded-full border-2 border-white/20 overflow-hidden bg-gray-800">
                    <img src={img} alt="Place" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-14 h-14 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-xs font-bold">
                  5/5
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export const StateSlideshow: React.FC<StateSlideshowProps> = ({ states, onStateClick }) => {
  return (
    <div className="w-full px-4 pb-12 space-y-8">
      <div className="container mx-auto pt-12 pb-4">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
          Destinations
        </h2>
        <p className="text-muted-foreground mt-2 text-lg">Scroll to explore the regions</p>
      </div>

      {states.map((state, index) => (
        <StateCard 
          key={state.id}
          state={state}
          index={index}
          onStateClick={onStateClick}
        />
      ))}
    </div>
  );
};