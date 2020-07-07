import React from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import { Switch, Route } from "react-router";
import './App.scss';
import {Home, PickDish, Receipt} from "./pages/";
import Nav from './components/nav';
import DrinksScreen from "./pages/PickDrinks";
import OrderScreen from "./pages/Order";
import {RootState} from "./redux";
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({ order: state.order });
type Props = ReturnType<typeof mapStateToProps>

const App: React.FC<Props> = ({ order }) => {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact><Home /></Route>
          <Route path="/dish" component={PickDish} />
          <Route path="/drinks" component={DrinksScreen} />
          <Route path="/order" component={OrderScreen} />
          <Route path="/receipt" component={Receipt} />
        </Switch>
      </Router>

      <div>
        <p>your order:</p>
        <p>drinks:</p>
        {order.drinks.map(drink =>
            <p key={drink.id}>{drink.name}</p>
        )}
        <p>dish: {order.dish?.strMeal}</p>
        <p>delivery: {order.dateTime}</p>
        <p>number of people: {order.numberOfPeople}</p>
        <p>email: {order.email}</p>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(App);
