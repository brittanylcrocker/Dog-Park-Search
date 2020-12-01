import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper, Listing} from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

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

      mapCenter: {
        lat: 49.2827291,
        lng: -123.1207375
      }
    };
    this.fetchPlaces = this.fetchPlaces.bind(this)
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

      this.state.placesService.textSearch(placesRequest, ((response) => {
          // console.log("response", response)
        response.map((p) =>
        // console.log(p.geometry.location.lat())
        this.state.markers.push({name: p.name, lng: p.geometry.location.lng(), lat: p.geometry.location.lat()})
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

        <Map
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
            label={park.name}
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
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ()
})(MapContainer)
