import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import SearchBox from './SearchBox';


class MapResults extends Component {
  static defaultProps = {
     center: {lat: 40.73, lng: -73.93},
     zoom: 12
  }


  render() {
    return(
      <div>
      <SearchBox />
        <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
      bootstrapURLKeys={{
            key: 'AIzaSyAFt_EhkhUgtcWfLbKPvv7a3s7FftlkqI8',
            language: 'en',
            libraries: 'places'
         }}

         defaultCenter={this.props.center}
         center={this.props.center}
         defaultZoom={this.props.zoom}
         onChildMouseEnter={this.onChildMouseEnter}
         onChildMouseLeave={this.onChildMouseLeave}
      />
      </div>
      </div>
    )
  }
}

export default MapResults
