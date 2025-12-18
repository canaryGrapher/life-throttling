import { State } from '../../../types';

const Rajasthan: State = {
  id: "rajasthan",
  name: "Rajasthan",
  image: "https://picsum.photos/id/1047/1200/800",
  description: "The land of kings, vast deserts, and grand palaces.",
  cities: [
    {
      id: "jaipur",
      name: "Jaipur",
      image: "https://picsum.photos/id/1075/800/600",
      description: "The Pink City, famous for its Hawa Mahal and City Palace.",
      places: [
        {
          id: "amer-fort",
          name: "Amer Fort",
          description: "A majestic fort located high on a hill.",
          image: "https://picsum.photos/id/1076/800/600",
          tags: ["History", "Fort", "Architecture"],
          lat: 26.9855,
          lng: 75.8513,
          content: "Riding through the dusty roads of Rajasthan, the sight of Amer Fort standing tall is breathtaking..."
        }
      ]
    },
    {
      id: "jaisalmer",
      name: "Jaisalmer",
      image: "https://picsum.photos/id/1077/800/600",
      description: "The Golden City, located in the heart of the Thar Desert.",
      places: []
    }
  ]
};

export default Rajasthan