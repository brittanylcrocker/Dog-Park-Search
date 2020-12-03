import React from 'react';
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Link
} from "react-router-dom";
import Nav from '../components/main/Nav'
import MainPage from '../components/main/MainPage'
import DogsIndex from '../components/dogs/DogsIndex'
import { Container } from '@material-ui/core';

function App() {
  return (
    <div className="App">
        <HashRouter>
        <Link to='/home'>Dog Park Search</Link>
        <Link to='/Dogsindex'>Notes From Dogs Around The World</Link>
        <Container maxWidth="sm">
          <Route path="/home"><MainPage /></Route>
          <Route path="/dogsindex" ><DogsIndex/></Route>
        </Container>
        </HashRouter>
    </div>
  );
}

export default App;
