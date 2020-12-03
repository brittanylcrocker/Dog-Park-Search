import React from 'react';
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Link
} from "react-router-dom";

import MapContainer from '../components/main/Map.js'
import ParkCard from '../components/main/ParkCard'
import DogsIndex from '../components/dogs/DogsIndex'
import { Container, Grid } from '@material-ui/core';
import './App.css';
import img from "../components/main/img/icons8-dog-64.png"


function App(props) {
  return (
    <div className="App">
      <HashRouter>
        <nav id="headerStyle" className="navbar navbar-expand-lg navbar-dark bg-success">
          <div className="navbar-nav">
            <img src={img}/>
            <Link id="green" className="navbar-brand">Happy Tails</Link>
            <Link className="nav-link" to='/'>Dog Park Search</Link>
            <Link className="nav-link" to='/dogsindex'>Notes From Dogs Around The World</Link>
          </div>
        </nav>
        <Route exact path="/dogsindex" component={DogsIndex}></Route>
        <Route exact path="/" component={MapContainer}></Route>
        <Route exact path="/" component={ParkCard}></Route>
      </HashRouter>
    </div>
  );
}

export default App;
