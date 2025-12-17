import React from 'react';
import { State } from '../types';
import { ChevronRight, MapPin } from './Icons';

interface StateGridProps {
  states: State[];
  onStateClick: (state: State) => void;
}

export const StateGrid: React.FC<StateGridProps> = ({ states, onStateClick }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 text-foreground">
        Explore Destinations
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
        {states.map((state, index) => {
          // Create a bento-like pattern: some items span 2 columns or 2 rows
          const isLarge = index === 0 || index === 3; 
          const spanClass = isLarge ? "md:col-span-2 md:row-span-2" : "md:col-span-1 md:row-span-1";
          
          return (
            <div 
              key={state.id}
              onClick={() => onStateClick(state)}
              className={`group relative overflow-hidden rounded-3xl cursor-pointer ${spanClass} shadow-sm hover:shadow-xl transition-all duration-500`}
            >
              <img 
                src={state.image} 
                alt={state.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                <div className="transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="flex items-center gap-1 text-white/80 text-xs uppercase tracking-wider mb-2">
                    <MapPin className="w-3 h-3" />
                    <span>State</span>
                  </div>
                  <h3 className={`font-serif font-bold text-white ${isLarge ? 'text-4xl' : 'text-2xl'}`}>
                    {state.name}
                  </h3>
                  <p className={`text-gray-300 mt-2 line-clamp-2 text-sm ${isLarge ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity duration-300'}`}>
                    {state.description}
                  </p>
                  
                  <div className="mt-4 flex items-center text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 gap-2">
                    <span>Discover Places</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};