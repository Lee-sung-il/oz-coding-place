import axios from "axios";

export interface Place {
    id: string;
    title: string;
    description: string;
    image: {
        src: string,
        alt: string
    }
    lat: number;
    lon: number;
}

export async function PlaceData():Promise<Place[]> {
    try {
        const response = await axios.get("http://localhost:3000/places");
        return response.data.places;
    }catch(error){
        console.log(error);
        return [];
    }
}