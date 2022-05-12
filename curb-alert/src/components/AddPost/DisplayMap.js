
import { useMemo } from "react";
import {
    useJsApiLoader,
    GoogleMap,
    Marker
} from '@react-google-maps/api'

export default function DisplayMap(postLat) {
    const x = parseFloat(postLat.postLat)
    const y = parseFloat(postLat.postLng)



    const center = useMemo(() => ({ lat: x, lng: y }), []);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,

    })

    if (!isLoaded) return <div>Loading...</div>;
    return (
        <GoogleMap zoom={12} center={center} mapContainerClassName="map-container">
            <Marker position={center} />
        </GoogleMap>
    );

}


