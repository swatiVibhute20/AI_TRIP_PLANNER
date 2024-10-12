import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';

// Initialize Mapbox access token
mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

function MapPage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const longitude = searchParams.get('longitude');
    const latitude = searchParams.get('latitude');

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [longitude, latitude], // starting position [lng, lat]
            zoom: 12 // starting zoom
        });

        new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);

        // Clean up the map when the component unmounts
        return () => map.remove();
    }, [longitude, latitude]);

    return (
        <div>
            <h1>Map View</h1>
            <div id="map" style={{ height: '400px', width: '100%' }}></div>
        </div>
    );
}

export default MapPage;
