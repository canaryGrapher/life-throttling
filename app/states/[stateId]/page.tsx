'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DetailView } from '../../../components/DetailView';
import { Navbar } from '../../../components/Navbar';
import { getStateById, getCountryByStateId } from '../../../lib/utils';
import { Place } from '../../../types';

export default function StatePage() {
  const params = useParams();
  const router = useRouter();
  const stateId = params.stateId as string;
  
  const state = getStateById(stateId);
  const country = state ? getCountryByStateId(stateId) : null;

  useEffect(() => {
    if (!state) {
      router.push('/');
    }
  }, [state, router]);

  if (!state || !country) {
    return null;
  }

  const handlePlaceClick = (place: Place) => {
    // Find the city that contains this place
    for (const city of state.cities) {
      const foundPlace = city.places.find(p => p.id === place.id);
      if (foundPlace) {
        router.push(`/states/${stateId}/cities/${city.id}/places/${place.id}`);
        return;
      }
    }
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <>
      <Navbar selectedCountryId={country.id} />
      <DetailView 
        data={state} 
        stateId={stateId}
        onBack={handleBack} 
        onPlaceClick={handlePlaceClick} 
      />
    </>
  );
}

