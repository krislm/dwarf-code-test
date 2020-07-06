import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {Home, Order, PickDish, PickDrinks, Receipt} from "./pages/";

const App = () => {
  return (
    <div>
      <Router>
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
