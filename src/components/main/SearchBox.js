import React from 'react';
import ReactDOM from 'react-dom';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';


const google = window.google;



class SearchBox extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    onPlacesChanged: PropTypes.func
  }
  render() {
    return <input ref="input" {...this.props} type="text"/>;
  }
  onPlacesChanged = () => {
    if (this.props.onPlacesChanged) {
      this.props.onPlacesChanged(this.searchBox.getPlaces());
    }
  }

  componentDidMount() {
    var input = ReactDOM.findDOMNode(this.refs.input);
    if (google) {
     this.searchBox = new google.map.places.SearchBox(input);
     this.searchBox.addListener('places_changed', this.onPlacesChanged);}
  }
  componentWillUnmount() {
    // https://developers.google.com/maps/documentation/javascript/events#removing
    google.maps.event.clearInstanceListeners(this.searchBox);
  }}


export default SearchBox;
