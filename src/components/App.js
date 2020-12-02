import React from 'react';
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Link
} from "react-router-dom";
import MainPage from '../components/main/MainPage'
import DogsIndex from '../components/dogs/DogsIndex'

function App() {
  return (
    <div className="App">
      <HashRouter>
      <Route path="/home"><MainPage /></Route>
      <Route path="/dogsindex" ><DogsIndex/></Route>
      </HashRouter>
    </div>
  );
}

export default App;
