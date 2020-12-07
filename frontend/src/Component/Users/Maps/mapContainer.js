import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export const MapContainer = (props) => {

  const mapStyles = {
    width: '250%',
    height: '120vh',
  };

  const latlng = props.latlng

  const displayMarkers = () => {
    if (!props.latlng) {
      return
    }
    return props.latlng.map((latlng, index) => {
      return <Marker key={index} id={index} position={{
        lat: parseFloat(latlng.latitude),
        lng: parseFloat(latlng.longitude)
      }}
        onClick={() => console.log("You clicked me!")} />
    })
  }

  return (
    <LoadScript
      googleMapsApiKey='AIzaSyAD0ljZQ6iObBbIIKqnPMI3I-ttV_rirMw'>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={8}
        center={{ lat:  latlng[0].latitude, lng:  latlng[0].longitude }}
      >
        {displayMarkers()}
      </GoogleMap>
    </LoadScript>
  )
}


export default MapContainer;
