import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper, Listing} from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import $ from "jquery";

const containerStyle = {
  position: 'absolute',
  width: '75%',
  height: '75%',
  margin: '0 auto',
  border: '1px solid blue',
  'align-items': 'center',
  'justify-content': 'center',
  'border': '5px solid green'
}


let parkMapper;
export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // for google map places autocomplete
      address: '',

      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      placesService: {},
      markers: [],
      parkDetails: [],

      mapCenter: {
        lat: 49.2827291,
        lng: -123.1207375
      }
    };
    this.fetchPlaces = this.fetchPlaces.bind(this)
    this.onMouseoverMarker = this.onMouseoverMarker.bind(this)
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
        console.log("markers", this.state.markers)

      }))

  };

  // this.state.markers.push({name: p.name, lng: p.geometry.location.Scopes[0].a, lat: p.geometry.location.Scopes[0].b})

  fetchPlaces(mapProps, map) {
    console.log("fetchPlaces", mapProps)
    const {google} = mapProps;
    const service = new google.maps.places.PlacesService(map);
    this.setState({placesService: service})
}

onMouseoverMarker(props, marker, e) {
  $('.park-details').empty()
  $('.park-details').append('<div id="parkCard"></div>')
  $('#parkCard').css({'z-index': '99', 'position': 'absolute'})
  let parkName = (`<p>Name: ${props.name} Address: ${props.address} Rating: ${props.rating}</p>`)
  $('#parkCard').css({'border': '1px solid black', 'height': '20vh', 'width': '20vh'})
  let parkImage = (`<img href=${props.imgUrl}>`)
  $('#parkCard').append(parkName)
  $('#parkCard').append(parkImage)
}
  render() {
    return (
      <div id='googleMaps'>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
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
        <div className="row">
          <Map
            containerStyle={containerStyle}
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
        <div class="park-details">

        </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(MapContainer)
