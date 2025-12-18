'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { travelData } from '../../../data';
import { State, Country } from '../../../types';
import { StateSlideshow } from '../../../components/StateSlideshow';
import { Navbar } from '../../../components/Navbar';
import { ArrowUpRight, ArrowUp, MapPin, Globe, Compass, ChevronDown } from '../../../components/Icons';

export default function CountryPage() {
  const params = useParams();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  const countryIdParam = (params.countryId as string) || '';

  const matchedCountry: Country | undefined = travelData.find(
    c => c.id.toLowerCase() === countryIdParam.toLowerCase()
  );

  const currentCountry = matchedCountry || travelData[0];

  // Redirect to first country if invalid id
  useEffect(() => {
    if (!matchedCountry) {
      const firstId = travelData[0]?.id;
      if (firstId) {
        router.replace(`/country/${firstId}`);
      }
    }
  }, [matchedCountry, router]);

  // Scroll detection for navbar / scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStateClick = (state: State) => {
    router.push(`/states/${state.id}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If we're in the middle of redirecting from an invalid country, render nothing
  if (!matchedCountry && countryIdParam) {
    return null;
  }

  // Calculate dynamic stats
  const totalRegions = currentCountry.states.length;
  const totalMemories = currentCountry.states.reduce(
    (acc, state) => acc + (state.cities?.length || 0),
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-primary selection:text-white">
      <Navbar selectedCountryId={currentCountry.id} isScrolled={isScrolled} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-screen p-4 pb-0 flex flex-col">
          <div className="relative flex-1 w-full rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700">
            {/* Hero Background */}
            <img
              key={currentCountry.image}
              src={currentCountry.image}
              alt={`${currentCountry.name} Background`}
              className="absolute inset-0 w-full h-full object-cover scale-105 animate-in fade-in duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />

            {/* Hero Content */}
            <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-center items-center text-center">
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 flex flex-col items-center">
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-8">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  <span className="text-xs font-bold tracking-[0.2em] uppercase">
                    Adventure Portfolio
                  </span>
                </div>

                <h1 className="text-6xl md:text-[9rem] leading-[0.9] font-serif font-medium text-white tracking-tight mb-8 drop-shadow-lg uppercase">
                  <span className="italic text-white/90">{currentCountry.heroTag}</span>
                </h1>

                <p className="max-w-xl text-lg md:text-xl text-white/80 font-light leading-relaxed mb-10">
                  {currentCountry.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <button
                    onClick={() =>
                      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
                    }
                    className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-3"
                  >
                    Start Exploring
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                  <Link
                    href="/map"
                    className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-3"
                  >
                    View Map
                    <MapPin className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Floating Stats */}
            <div className="absolute bottom-10 left-0 w-full px-6 flex justify-center">
              <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
                {/* Stats */}
                <div className="flex gap-4 p-1 rounded-3xl bg-black/20 backdrop-blur-2xl border border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                  {/* Region Stat Card */}
                  <div className="flex items-center gap-4 px-6 py-4 rounded-2xl hover:bg-white/5 transition-colors group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/40 transition-all"></div>
                      <div className="relative w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
                        <Globe className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-none">
                        {totalRegions}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/50 mt-1">
                        States Map
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-px h-12 bg-white/10 self-center"></div>

                  {/* Memory Stat Card */}
                  <div className="flex items-center gap-4 px-6 py-4 rounded-2xl hover:bg-white/5 transition-colors group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/40 transition-all"></div>
                      <div className="relative w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
                        <Compass className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-none">
                        {totalMemories}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/50 mt-1">
                        Cities Logged
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scroll Hint */}
                <div
                  className="flex flex-col items-center gap-2 text-white/40 group cursor-pointer"
                  onClick={() =>
                    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
                  }
                >
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold group-hover:text-white/60 transition-colors">
                    Discover Trail
                  </span>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5 transition-all animate-bounce">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vertical Slideshow of States */}
        <StateSlideshow states={currentCountry.states} onStateClick={handleStateClick} />

        <footer className="py-20 border-t border-border mt-12 bg-card">
          <div className="container mx-auto px-4 flex flex-col items-center text-center">
            <div className="font-serif text-3xl font-bold mb-4">
              LifeThrottling<span className="text-primary">.</span>
            </div>
            <p className="text-muted-foreground max-w-md mb-8">
              Capturing the essence of freedom through exploration. Exploring the unexplored
              trails and locations.
            </p>
            <div className="text-sm text-muted-foreground/60">The Yash Aryan Portfolio.</div>
          </div>
        </footer>
      </main>

      {/* Scroll To Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-24 right-6 z-40 p-3 rounded-full bg-secondary/80 backdrop-blur-md border border-border text-foreground shadow-lg transition-all duration-300 hover:bg-secondary hover:scale-110 ${
          isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
}


