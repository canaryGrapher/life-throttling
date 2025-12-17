export interface Place {
  id: string;
  name: string;
  description: string;
  image: string;
  content: string; // Markdown or long text
  tags: string[];
  lat: number;
  lng: number;
}

export interface City {
  id: string;
  name: string;
  image: string;
  description: string;
  places: Place[];
}

export interface State {
  id: string;
  name: string;
  image: string;
  description: string;
  cities: City[];
}

export interface Country {
  id: string;
  name: string;
  image: string;
  heroTag: string;
  description: string;
  states: State[];
}

export enum ViewState {
  HOME = 'HOME',
  STATE = 'STATE',
  CITY_PLACE = 'CITY_PLACE',
  MAP = 'MAP',
}