import { useMemo } from "react";
import {
    useJsApiLoader,
    GoogleMap,
    Marker
} from '@react-google-maps/api'

import { useQuery } from '@apollo/client';
import { QUERY_POSTS, } from '../../utils/queries'

export default function MasterMap() {

    const { loading, data } = useQuery(QUERY_POSTS);
    const posts = data?.posts || [];




    const center = useMemo(() => ({ lat: 41.43, lng: -81.7 }), []);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,

    })

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isLoaded) return <div>Loading...</div>;
    return (
        <GoogleMap zoom={10} center={center} mapContainerClassName="master-map-container">
            {posts.map(post => {
                < Marker center={{ lat: (parseFloat(post.itemLat)), lng: (parseFloat(post.itemLng)) }} ></Marker>
            })}

        </GoogleMap >
    );

}
