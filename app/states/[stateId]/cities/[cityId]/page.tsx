'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCityById, getStateById, getCountryByStateId } from '../../../../../lib/utils';
import { ParallaxCityHero } from '../../../../../components/CityHero';
import { Navbar } from '../../../../../components/Navbar';
import { Place } from '../../../../../types';
import { ChevronRight, ArrowUpRight } from '../../../../../components/Icons';

export default function CityPage() {
  const params = useParams();
  const router = useRouter();
  const stateId = params.stateId as string;
  const cityId = params.cityId as string;
  
  const city = getCityById(stateId, cityId);
  const state = getStateById(stateId);
  const country = state ? getCountryByStateId(stateId) : null;

  useEffect(() => {
    if (!city || !state) {
      router.push('/');
    }
  }, [city, state, router]);

  if (!city || !state || !country) {
    return null;
  }

  const handlePlaceClick = (place: Place) => {
    router.push(`/states/${stateId}/cities/${cityId}/places/${place.id}`);
  };

  const handleBack = () => {
    router.push(`/states/${stateId}`);
  };

  return (
    <>
      <Navbar selectedCountryId={country.id} />
      <div className="min-h-screen bg-background animate-in fade-in duration-500 pb-20 pt-24">
        <div className="container mx-auto px-4 py-24 space-y-32">
          {/* City Hero with Parallax */}
          <ParallaxCityHero city={city} />
          
          {/* Places Grid or Empty Message */}
          {city.places.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {city.places.map((place) => (
                <div 
                  key={place.id}
                  onClick={() => handlePlaceClick(place)}
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
      </div>
    </>
  );
}

