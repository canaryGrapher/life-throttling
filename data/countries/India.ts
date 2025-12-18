import { Country } from '../../types';
import { IndianState } from '../states';

const India: Country = {
  id: "india",
  name: "India",
  heroTag: "Incredible India",
  image: "https://picsum.photos/id/1033/1920/1080",
  description: "A curated collection of journeys across the diverse landscapes, cities, mountains, deserts, and coasts.",
  states: [
    IndianState.HimachalPradesh,
    IndianState.Rajasthan,
    IndianState.Kerala,
    IndianState.Ladakh,
  ]
};

export default India