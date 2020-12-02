import React, { Component } from 'react';
import SearchBox from './SearchBox';
import GoogleMap from './Map';
import './main.css';

class MainPage extends Component {
  render () {
  return (
    <div>
      <GoogleMap/>
    </div>
  )}
}

export default MainPage
