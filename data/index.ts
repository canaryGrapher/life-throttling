import { Country } from '../types';
import * as CountriesData from "./countries"

export const travelData: Country[] = [
  CountriesData.India,
  CountriesData.Nepal,
];

// Re-export types for convenience
export type { Country, State, City, Place } from '../types';
