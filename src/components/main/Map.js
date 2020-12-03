import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper, Listing, InfoWindow,} from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import $ from "jquery";
import { Container, Grid } from '@material-ui/core';
import './main.css'
import mapStyle from './mapStyle'
import ParkCard from './ParkCard'
import { Provider } from "./Context"
import { Button } from 'antd';

let parkMapper;
export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // for google map places autocomplete
      address: '',
      zoom: 14,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      placesService: {},
      markers: [],
      parkDetails: [],
      name: '',
      parkAddress: '',
      rating: '',
      imgUrl: '',

      previousZoom: {
        lat: 49.2827291,
        lng: -123.1207375
      },
      mapCenter: {
        lat: 49.2827291,
        lng: -123.1207375
      }

    };
    this.fetchPlaces = this.fetchPlaces.bind(this)
    this.onMouseoverMarker = this.onMouseoverMarker.bind(this)
    this.zoomOnMarker = this.zoomOnMarker.bind(this)
    this.updatePreviousZoom = this.updatePreviousZoom.bind(this)

  }


  handleChange = address => {
    this.setState({markers: []})
    this.setState({ address });
    console.log("handlChange", address)
  };

  handleSelect = address => {
    console.log(address)
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);

        // update center state
        this.setState({ mapCenter: latLng });
        this.setState({previousZoom: latLng})
      })
      .catch(error => console.error('Error', error));

      const placesRequest = {
        type: ['park'],
        query: 'dog park',
      };

      let imgUrlString;
      this.state.placesService.textSearch(placesRequest, ((response) => {
          console.log("response", response[2].rating)
        response.map((p) =>{
        if (p.photos) {
          let imgUrlString = p.photos[0].getUrl()
        } else {
          let imgUrlString = ''
        }
        this.state.markers.push({place_id: p.place_id, name: p.name, lng: p.geometry.location.lng(), lat: p.geometry.location.lat(), address: p.formatted_address, rating: p.rating, reviews: p.reviews, imgUrl: imgUrlString})}
        // console.log("lng", p.geometry.viewport.Sa.i, "lat", p.geometry.viewport.Ya.i)
      )
        console.log("markers", this.state.imgUrl)

      }))

  };

  // this.state.markers.push({name: p.name, lng: p.geometry.location.Scopes[0].a, lat: p.geometry.location.Scopes[0].b})

  fetchPlaces(mapProps, map) {
    console.log("fetchPlaces", mapProps)
    const {google} = mapProps;
    const service = new google.maps.places.PlacesService(map);
    this.setState({placesService: service})
}

zoomOnMarker (props, e) {
  console.log("e", e)
  console.log("map center", props)
  this.setState({mapCenter: {lat: props.position.lat, lng: props.position.lng}})
  this.setState({zoom: 18})
  // $('.parkCard').addClass('show')
  this.setState({name: props.name, parkAddress: props.address, rating: props.rating, imgUrl: props.imgUrl})
}

updatePreviousZoom(e) {
  console.log(e)
  this.setState({mapCenter: this.state.previousZoom})
  this.setState({zoom: 14})
}

onMouseoverMarker(props, marker, e) {

}
  render() {
    return (
      <div className="map-container">
        <h1 className="h1">Find A Dog Park Near You</h1>
          <div >
        <PlacesAutocomplete
          className="inline"
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                className='sr-only btn-outline-success'
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
              <div >
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                      >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            )}

          </PlacesAutocomplete>
          <div className="ml-3">
          <div className="d-flex justify-content-center ml-5">
          <button id="buttonStyle" className="btn btn-outline-success ml-5 m-1"
            onClick={this.updatePreviousZoom}
            >Zoom Out</button>
          </div>
          </div>
          </div>
            <div>
          <Map
            zoom={this.state.zoom}
            className="map"
            style={mapStyle}
            google={this.props.google}
            initialCenter={{
              lat: this.state.mapCenter.lat,
              lng: this.state.mapCenter.lng
            }}
            center={{
              lat: this.state.mapCenter.lat,
              lng: this.state.mapCenter.lng
            }}
            onReady={this.fetchPlaces}

          >
          {this.state.markers.map((park) =>
            <Marker
              onClick={this.zoomOnMarker}
              key={park.place_id}
              name={park.name}
              rating={park.rating}
              address={park.address}
              onMouseover={this.onMouseoverMarker}
              position={{
                lat: park.lat,
                lng: park.lng
              }} />

          )}
          <Marker
            position={{
              lat: this.state.mapCenter.lat,
              lng: this.state.mapCenter.lng
            }} />

          </Map>

        </div>
        <Provider value={this.state}>
        <ParkCard />
      </Provider>


      </div>
    )
  }
}






export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(MapContainer)
