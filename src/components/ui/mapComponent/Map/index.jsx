import React, { useCallback, useEffect, useState } from 'react';
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';

import { MarkerList } from '../MarkerList';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 46.71109,
  lng: 1.7191036,
};

const apiKey = process.env.REACT_APP_MAP_KEY;

function Map({ realties = [], realty = false }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });
  console.log(3, realties);

  const [map, setMap] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [markers, setMarkers] = useState(realties);

  const handleActiveMarker = markerId => {
    if (markerId === activeMarker) {
      return;
    }

    setActiveMarker(markerId);
  };

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map && realty) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(realty);
      map.fitBounds(bounds);
    }
  }, [map, realty]);

  useEffect(() => {
    if (map && markers && markers?.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach(marker => {
        bounds.extend({
          lat: marker.latitude,
          lng: marker.longitude,
        });
      });
      map.fitBounds(bounds);
    }
  }, [map, markers]);

  useEffect(() => {
    if (!realty) {
      setMarkers(realties);
    }
  }, [realties]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      mapTypeId="hybrid"
    >
      {realty ? (
        <Marker position={realty} />
      ) : (
        <MarkerList
          markers={markers}
          handleActiveMarker={handleActiveMarker}
          activeMarker={activeMarker}
          setActiveMarker={setActiveMarker}
        />
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
