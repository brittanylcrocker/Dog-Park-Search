import React from 'react';
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Link
} from "react-router-dom";
import Nav from '../components/main/Nav'
import MapContainer from '../components/main/Map.js'
import ParkCard from '../components/main/ParkCard'
import ParkCard2 from '../components/main/ParkCard2'
import DogsIndex from '../components/dogs/DogsIndex'
import { Container, Grid } from '@material-ui/core';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(props) {
  return (
    <div className="App">
        <HashRouter>
        <header className="navbar navbar-expand-lg navbar-dark p-3 ">
        <Link class="btn btn-sm btn-outline-success p-2 m-1" to='/'>Dog Park Search</Link>
        <Link class="btn btn-sm btn-outline-success p-2 m-1 " to='/Dogsindex'>Notes From Dogs Around The World</Link>
        </header>
        <div>
              <MapContainer />
        </div>

        <div className="parkCard">
              <ParkCard />
        </div>
            <Route path="/dogsindex" ><DogsIndex/></Route>
        </HashRouter>
    </div>
  );
}

export default App;
