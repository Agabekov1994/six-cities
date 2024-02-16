import React, { useEffect, useRef } from "react";
import useMap from "../../hooks/useMap";
import 'leaflet/dist/leaflet.css';
import { Icon, Marker } from "leaflet";
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from "../const";

type Points = {
    id_card: number,
    is_active: boolean,
    bedrooms: number,
    city: {
        location: {
            latitude: number,
            longitude: number,
            zoom: number
        },
        name: string
    },
    description: string,
    goods: string[],
    host: {
        avatar_url: string,
        id: number,
        is_pro: true,
        name: string
    },
    id: number,
    images: string[],
    is_favorite: boolean,
    is_premium: boolean,
    location: {
        latitude: number,
        longitude: number,
        zoom: number
    },
    max_adults: number,
    preview_image: string,
    price: number,
    rating: number,
    title: string,
    type: string
}[];

type Point = {
    id_card: number,
    is_active: boolean,
    bedrooms: number,
    city: {
        location: {
            latitude: number,
            longitude: number,
            zoom: number
        },
        name: string
    },
    description: string,
    goods: string[],
    host: {
        avatar_url: string,
        id: number,
        is_pro: true,
        name: string
    },
    id: number,
    images: string[],
    is_favorite: boolean,
    is_premium: boolean,
    location: {
        latitude: number,
        longitude: number,
        zoom: number
    },
    max_adults: number,
    preview_image: string,
    price: number,
    rating: number,
    title: string,
    type: string
};

type City = {
    location: {
        latitude: number,
        longitude: number,
        zoom: number
    },
    name: string
}

type MapProps = {
    city: City,
    points: Points,
    selectedPoint: Point | undefined
}

const currentCustomIcon = new Icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [27, 39],
    iconAnchor: [20, 40]
});

const defaultCustomIcon = new Icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [27, 39],
    iconAnchor: [20, 40]
});

function Map(props: MapProps) {
    const { city, points, selectedPoint } = props;
    const mapRef = useRef(null);
    const map = useMap(mapRef, city);

    useEffect(() => {
        if(map) {
            points.forEach((point) => {
                const marker = new Marker({
                    lat: point.location.latitude,
                    lng: point.location.longitude
                });

                marker.setIcon(
                    selectedPoint !== undefined && point.title === selectedPoint.title
                    ? currentCustomIcon
                    : defaultCustomIcon
                ).addTo(map);
            });
        }
    },[map, points, selectedPoint]);

    return <div className="wrap__map" ref={mapRef}></div>
}

export default Map;