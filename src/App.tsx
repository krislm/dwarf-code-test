import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.scss';
import {Home, Order, PickDish, PickDrinks, Receipt} from "./pages/";
import Nav from './components/nav';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route path="/"><Home /></Route>
          <Route path="/dish"><PickDish /></Route>
          <Route path="/drinks"><PickDrinks /></Route>
          <Route path="/order"><Order /></Route>
          <Route path="/receipt"><Receipt /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
