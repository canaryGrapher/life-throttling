import { Country } from './types';

export const travelData: Country[] = [
  {
    id: "india",
    name: "India",
    heroTag: "Incredible India",
    image: "https://picsum.photos/id/1033/1920/1080",
    description: "A curated collection of journeys across the diverse landscapes, cities, mountains, deserts, and coasts.",
    states: [
      {
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
                content: `
# Solang Valley: An Adventure Paradise

Riding my bike up to Solang Valley was an experience etched in memory. The crisp mountain air, the winding roads, and the anticipation of seeing the snow-capped peaks up close.

Solang Valley is not just a destination; it's an emotion for every adventure seeker. Located about 14 km from Manali, it sits between Solang village and Beas Kund.

## The Ride
The tarmac leading up to the valley is mostly smooth, with a few rough patches that make the adventure motorbike suspension work its magic. The curves are inviting, urging you to lean in just a little more.

## What to Expect
- **Paragliding:** Soaring above the valley floor is a must-do.
- **Skiing:** In winters, this place transforms into a white wonderland.
- **Camping:** Several spots nearby offer riverside camping.

As I parked my bike and took a sip of hot tea from a local vendor, I realized this is why I ride. To find these pockets of peace amidst the chaos of the world.
                `
              },
              {
                id: "hadimba-temple",
                name: "Hadimba Temple",
                description: "An ancient cave temple dedicated to Hidimbi Devi.",
                image: "https://picsum.photos/id/1040/800/600",
                tags: ["Culture", "History", "Architecture"],
                lat: 32.2452,
                lng: 77.1870,
                content: "The Hadimba Devi Temple is a wooden temple located in the middle of the Van Vihar forest..."
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
                content: "Kaza is the heart of Spiti. The terrain is rugged, the air is thin, and the bike feels the altitude..."
              }
            ]
          }
        ]
      },
      {
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
      },
      {
        id: "kerala",
        name: "Kerala",
        image: "https://picsum.photos/id/1050/1200/800",
        description: "God's Own Country, known for its backwaters and tea plantations.",
        cities: [
             {
            id: "munnar",
            name: "Munnar",
            image: "https://picsum.photos/id/1051/800/600",
            description: "A hill station famous for its tea estates.",
            places: []
          }
        ]
      },
      {
        id: "ladakh",
        name: "Ladakh",
        image: "https://picsum.photos/id/1060/1200/800",
        description: "A region known for its dramatic landscapes and Buddhist culture.",
        cities: []
      }
    ]
  },
  {
    id: "nepal",
    name: "Nepal",
    heroTag: "Nepali Adobe",
    image: "https://picsum.photos/id/1018/1920/1080",
    description: "Riding through the roof of the world. Ancient temples, Sherpa culture, and the mighty Himalayas.",
    states: []
  }
];