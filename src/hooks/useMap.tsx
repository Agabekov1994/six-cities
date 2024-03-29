import { MutableRefObject, useEffect, useState } from "react";
import { Map, TileLayer } from 'leaflet';

type City = {
    location: {
        latitude: number,
        longitude: number,
        zoom: number
    },
    name: string
}

function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: City): Map | null {
    const [map, setMap] = useState<Map | null>(null);

    let instance: Map;

    useEffect(() => {
        if (mapRef.current !== null && map === null) {

            if (instance) {
                instance.off();
                instance.remove();
            }

            instance = new Map(mapRef.current, {
                center: {
                    lat: city.location.latitude,
                    lng: city.location.longitude
                },
                zoom: 12
            });

            const layer = new TileLayer(
                'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
                {
                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                }
            );
            instance.addLayer(layer);
            setMap(instance);
        }
    }, [mapRef, map, city]);

    return map;
}

export default useMap;