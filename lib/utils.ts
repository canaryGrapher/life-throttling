import { travelData } from '../data';
import { Country, State, City, Place } from '../types';

export function getStateById(stateId: string): State | null {
  for (const country of travelData) {
    const state = country.states.find(s => s.id === stateId);
    if (state) return state;
  }
  return null;
}

export function getCityById(stateId: string, cityId: string): City | null {
  const state = getStateById(stateId);
  if (!state) return null;
  return state.cities.find(c => c.id === cityId) || null;
}

export function getPlaceById(stateId: string, cityId: string, placeId: string): Place | null {
  const city = getCityById(stateId, cityId);
  if (!city) return null;
  return city.places.find(p => p.id === placeId) || null;
}

export function getCountryByStateId(stateId: string): Country | null {
  for (const country of travelData) {
    const state = country.states.find(s => s.id === stateId);
    if (state) return country;
  }
  return null;
}

export function getAllPlaces(): Array<{ place: Place; city: City; state: State; country: Country }> {
  const result: Array<{ place: Place; city: City; state: State; country: Country }> = [];
  
  for (const country of travelData) {
    for (const state of country.states) {
      for (const city of state.cities) {
        for (const place of city.places) {
          result.push({ place, city, state, country });
        }
      }
    }
  }
  
  return result;
}

export { travelData };

