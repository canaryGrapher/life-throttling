import { State } from '../../../../types';
import shalimarBaghContent from "./srinagar/shalimar-bagh.md";

const JammuAndKashmir: State = {
    id: "jammu-and-kashmir",
    name: "Jammu and Kashmir",
    image: "https://picsum.photos/id/1050/1200/800",
    description: "The land of Kashmir, known for its beautiful valleys and mountains.",
    cities: [
        {
            id: "srinagar",
            name: "Srinagar",
            image: "https://picsum.photos/id/1036/800/600",
            description: "A high-altitude Himalayan resort town known for backpacking and skiing.",
            places: [
                {
                    id: "shalimar-bagh",
                    name: "Shalimar Bagh",
                    description: "Famous for adventure sports like paragliding and skiing.",
                    image: "https://ik.imagekit.io/canarygrapher/LifeThrottling/Places/Jammu%20and%20Kashmir/Srinagar/Cover%20-%20Shalimar%20Bagh_DvsewPUAK",
                    tags: ["Natural Beauty", "J&K"],
                    lat: 34.1495,
                    lng: 74.8729,
                    content: shalimarBaghContent
                },
            ]
        }
    ]
};

export default JammuAndKashmir;

