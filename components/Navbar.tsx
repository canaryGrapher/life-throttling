'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { travelData } from '../data';
import { ChevronDown, MapPin } from './Icons';

interface NavbarProps {
  selectedCountryId?: string;
  isScrolled?: boolean;
  showOnMap?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  selectedCountryId,
  isScrolled: externalIsScrolled,
  showOnMap = false 
}) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(externalIsScrolled ?? false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  
  // Derive country from the URL if not explicitly provided
  const pathSegments = pathname.split('/').filter(Boolean);
  const routeCountryId = pathSegments[0] === 'country' ? pathSegments[1] : undefined;
  const effectiveCountryId = selectedCountryId ?? routeCountryId ?? travelData[0].id;

  const currentCountry =
    travelData.find(c => c.id.toLowerCase() === effectiveCountryId.toLowerCase()) ||
    travelData[0];
  
  // Handle scroll if not externally controlled
  useEffect(() => {
    if (externalIsScrolled !== undefined) return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [externalIsScrolled]);

  // Determine if we should show white text (on hero sections)
  const isHeroSection =
    pathname.startsWith('/country/') || pathname.startsWith('/states/');
  const shouldUseWhiteText = !isScrolled && isHeroSection && !showOnMap;

  if (showOnMap) {
    return null; // Don't show navbar on map page
  }

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${isScrolled ? 'bg-background/80 backdrop-blur-xl border-border/40 py-4' : 'bg-transparent border-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link 
          href={`/country/${currentCountry.id}`}
          className={`font-serif text-2xl font-bold tracking-tight cursor-pointer flex items-center gap-1 ${shouldUseWhiteText ? 'text-white' : 'text-foreground'}`}
        >
          LifeThrottling<div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link 
            href="/map"
            className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${shouldUseWhiteText ? 'text-white hover:bg-white/10' : 'text-foreground hover:bg-muted'}`}
          >
            <MapPin className="w-4 h-4" />
            View Map
          </Link>

          <div className="relative">
            <button 
              onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
              className={`flex items-center gap-3 font-medium px-5 py-2.5 rounded-full transition-all duration-300 border ${shouldUseWhiteText ? 'bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-md' : 'bg-secondary/50 text-foreground border-border hover:bg-secondary'}`}
            >
              <span className="text-sm tracking-wide uppercase font-semibold">{currentCountry.name}</span>
              <ChevronDown className={`w-4 h-4 opacity-70 transition-transform duration-300 ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown Logic */}
            {isCountryDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsCountryDropdownOpen(false)}></div>
                <div className="absolute right-0 top-full mt-2 w-56 bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 ring-1 ring-black/5 z-50">
                  <div className="p-1">
                    {travelData.map(c => {
                      const isActive =
                        c.id.toLowerCase() === currentCountry.id.toLowerCase();
                      return (
                        <Link
                          key={c.id}
                          href={`/country/${c.id}`}
                          onClick={() => setIsCountryDropdownOpen(false)}
                          className={`block px-4 py-3 text-sm rounded-xl cursor-pointer transition-colors ${
                            isActive
                              ? 'bg-primary/10 text-primary font-semibold'
                              : 'text-foreground hover:bg-muted'
                          }`}
                        >
                          {c.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

