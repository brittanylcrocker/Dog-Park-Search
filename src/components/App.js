import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MainPage from '../components/main/MainPage'
import DogsIndex from '../components/dogs/DogsIndex'

function App() {
  return (
    <div className="App">
      <MainPage />
      <Router>
      <Link to="/dogsindex">Dogs around the world</Link>
      <Switch>
      <Route path="/dogsindex">
      <DogsIndex/>
      </Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
