
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function Map() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDUPMnMfsAdmsgman0o3Hot2SR7EIxUr5E'
    });

    if (!isLoaded) return <div>Loading...</div>;
    return (

        <GMap></GMap>
    )
}


function GMap() {
    const center = useMemo(() => ({ lat: 41.4, lng: -81.7 }), []);

    return (
        <GoogleMap zoom={9} center={center} mapContainerClassName="map-container">
            <Marker position={{ lat: 41.4, lng: -81.7 }} />
        </GoogleMap>
    );
}
