'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { travelData } from '../../data';
import { Place } from '../../types';

// Dynamically import MapView to ensure it only loads on client side
const MapView = dynamic(() => import('../../components/MapView').then(mod => ({ default: mod.MapView })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50">
      <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
    </div>
  ),
});

export default function MapPage() {
  const router = useRouter();

  const handlePlaceClick = (place: Place) => {
    // Find the place's location in the data structure
    for (const country of travelData) {
      for (const state of country.states) {
        for (const city of state.cities) {
          const foundPlace = city.places.find(p => p.id === place.id);
          if (foundPlace) {
            router.push(`/states/${state.id}/cities/${city.id}/places/${place.id}`);
            return;
          }
        }
      }
    }
  };

  const handleBack = () => {
    router.push('/');
  };

  return <MapView data={travelData} onBack={handleBack} onPlaceClick={handlePlaceClick} />;
}

