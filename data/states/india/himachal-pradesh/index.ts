import { State } from '../../../../types';
import solangValleyContent from './manali/solang-valley.md';
import hadimbaTempleContent from './manali/hadimba-temple.md';
import kazaContent from './spiti/kaza.md';

const HimachalPradesh: State = {
  id: "himachal-pradesh",
  name: "Himachal Pradesh",
  image: "https://picsum.photos/id/1018/1200/800",
  description: "Land of Gods, majestic mountains, and lush valleys.",
  cities: [
    {
      id: "manali",
      name: "Manali",
      image: "https://picsum.photos/id/1036/800/600",
      description: "A high-altitude Himalayan resort town known for backpacking and skiing.",
      places: [
        {
          id: "solang-valley",
          name: "Solang Valley",
          description: "Famous for adventure sports like paragliding and skiing.",
          image: "https://picsum.photos/id/1025/800/600",
          tags: ["Adventure", "Snow", "Sports"],
          lat: 32.3166,
          lng: 77.1500,
          content: solangValleyContent
        },
        {
          id: "hadimba-temple",
          name: "Hadimba Temple",
          description: "An ancient cave temple dedicated to Hidimbi Devi.",
          image: "https://picsum.photos/id/1040/800/600",
          tags: ["Culture", "History", "Architecture"],
          lat: 32.2452,
          lng: 77.1870,
          content: hadimbaTempleContent
        }
      ]
    },
    {
      id: "spiti",
      name: "Spiti Valley",
      image: "https://picsum.photos/id/1015/800/600",
      description: "A cold desert mountain valley located high in the Himalayas.",
      places: [
        {
          id: "kaza",
          name: "Kaza",
          description: "The subdivisional headquarters of the remote Spiti Valley.",
          image: "https://picsum.photos/id/1016/800/600",
          tags: ["Desert", "Remote", "Monastery"],
          lat: 32.2252,
          lng: 78.0709,
          content: kazaContent
        }
      ]
    }
  ]
};

export default HimachalPradesh;
