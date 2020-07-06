import React from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import { Switch, Route } from "react-router";
import './App.scss';
import {Home, Order, PickDish, Receipt} from "./pages/";
import Nav from './components/nav';
import DrinksScreen from "./pages/PickDrinks";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact><Home /></Route>
          <Route path="/dish" component={PickDish} />
          <Route path="/drinks" component={DrinksScreen} />
          <Route path="/order" component={Order} />
          <Route path="/receipt" component={Receipt} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
