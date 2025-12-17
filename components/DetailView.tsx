'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { State, Place } from '../types';
import { ChevronRight, ArrowUpRight } from './Icons';
import { ParallaxCityHero } from './CityHero';

interface DetailViewProps {
  data: State;
  stateId?: string;
  onBack: () => void;
  onPlaceClick: (place: Place) => void;
}

export const DetailView: React.FC<DetailViewProps> = ({ data, stateId, onBack, onPlaceClick }) => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-background animate-in fade-in duration-500 pb-20">
      
      {/* State Hero Section - "Floating Card" Style */}
      <div className="p-4 pb-0">
        <div className="relative h-[85vh] w-full rounded-[2.5rem] overflow-hidden shadow-2xl">
          <img 
            src={data.image} 
            alt={data.name} 
            className="w-full h-full object-cover"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
             <div className="max-w-4xl">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6">
                 <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                 Currently Viewing
               </div>
               <h1 className="text-6xl md:text-[8rem] leading-[0.9] font-serif font-bold text-white mb-8 tracking-tight">
                 {data.name}
               </h1>
               <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
                 <p className="max-w-xl text-lg md:text-2xl text-white/80 font-light leading-relaxed">
                   {data.description}
                 </p>
                 <div className="h-px flex-1 bg-white/20 hidden md:block mb-4" />
                 <div className="text-white/60 font-mono text-sm">
                    {data.cities.length} CITIES / {data.cities.reduce((acc, c) => acc + c.places.length, 0)} SPOTS
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24 space-y-32">
        {data.cities.length === 0 ? (
           <div className="text-center py-20 border border-dashed border-border rounded-3xl">
             <h3 className="text-3xl font-serif text-muted-foreground mb-4">Uncharted Territory</h3>
             <p className="text-muted-foreground">We haven't logged any rides here yet.</p>
           </div>
        ) : (
          data.cities.map((city) => (
            <div key={city.id} className="scroll-mt-24">
              
              {/* City Hero with Parallax - Clickable to navigate to city page */}
              {stateId ? (
                <div 
                  onClick={() => router.push(`/states/${stateId}/cities/${city.id}`)}
                  className="cursor-pointer"
                >
                  <ParallaxCityHero city={city} />
                </div>
              ) : (
                <ParallaxCityHero city={city} />
              )}
              
              {/* Places Grid or Empty Message */}
              {city.places.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {city.places.map((place) => (
                     <div 
                      key={place.id}
                      onClick={() => onPlaceClick(place)}
                      className="group relative bg-card rounded-[2rem] overflow-hidden border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col h-[450px]"
                     >
                       <div className="relative h-[60%] overflow-hidden">
                         <img 
                           src={place.image} 
                           alt={place.name} 
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                         />
                         <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                         
                         <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-black text-xs font-bold px-3 py-1.5 rounded-full flex gap-1 items-center shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                           <ArrowUpRight className="w-3 h-3" />
                           View Log
                         </div>
                       </div>
                       
                       <div className="p-8 flex-1 flex flex-col justify-between relative bg-card">
                         <div>
                           <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
                             {place.tags.map(tag => (
                               <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-primary bg-primary/5 px-2 py-1 rounded-md border border-primary/10">
                                 {tag}
                               </span>
                             ))}
                           </div>
                           <h3 className="text-2xl font-bold font-serif mb-3 text-foreground group-hover:text-primary transition-colors">{place.name}</h3>
                           <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                             {place.description}
                           </p>
                         </div>
                         
                         <div className="flex items-center text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors mt-4">
                            Read More <ChevronRight className="w-4 h-4 ml-1" />
                         </div>
                       </div>
                     </div>
                   ))}
                </div>
              ) : (
                <div className="w-full py-16 text-center bg-muted/20 rounded-[2rem] border border-dashed border-border/60">
                  <p className="text-muted-foreground font-medium">No specific spots logged yet for {city.name}.</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};