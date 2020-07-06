import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import {Home, Order, PickDish, PickDrinks, Receipt} from "./pages/";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/"><Home /></Route>
        <Route path="/dish"><PickDish /></Route>
        <Route path="/drinks"><PickDrinks /></Route>
        <Route path="/order"><Order /></Route>
        <Route path="/receipt"><Receipt /></Route>
      </Switch>
    </Router>
  );
}

export default App;
