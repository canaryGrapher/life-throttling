'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPlaceById, getCityById, getStateById, getCountryByStateId } from '@/lib/utils';
import { BlogPost } from '@/components/BlogPost';
import { Navbar } from '@/components/Navbar';

export default function PlacePage() {
  const params = useParams();
  const router = useRouter();
  const stateId = params.stateId as string;
  const cityId = params.cityId as string;
  const placeId = params.placeId as string;
  
  const place = getPlaceById(stateId, cityId, placeId);
  const city = getCityById(stateId, cityId);
  const state = getStateById(stateId);
  const country = state ? getCountryByStateId(stateId) : null;

  useEffect(() => {
    if (!place || !city || !state) {
      router.push('/');
    }
  }, [place, city, state, router]);

  if (!place || !city || !state || !country) {
    return null;
  }

  const handleBack = () => {
    router.push(`/states/${stateId}/cities/${cityId}`);
  };

  return (
    <>
      <Navbar selectedCountryId={country.id} />
      <BlogPost place={place} onBack={handleBack} />
    </>
  );
}

