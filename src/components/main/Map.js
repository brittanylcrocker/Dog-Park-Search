import React, {useState} from 'react'
import { GoogleMap, LoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import { withScriptjs } from "react-google-maps";


const containerStyle = {
  width: '700px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const libraries = ["places"];

function handlePlacesChanged(e) {
  console.log(e)
}

const divStyle = {
  border: '5px solid black',
  padding: '5px',
  marginTop: '20px'

};


function Map(props) {
  return (
    <div>
    <LoadScript
      googleMapsApiKey=
      libraries={["places"]}
    >

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
      <StandaloneSearchBox
      style={{zIndex: '5'}}
      style={divStyle}
      onPlacesChanged={handlePlacesChanged}
      >
      <input type="text" placeholder="Search place here"
      style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              marginLeft: "-120px"
            }}
      />
      </StandaloneSearchBox>
      </GoogleMap>
    </LoadScript>
    </div>
  )
}

export default Map
