import { combineReducers } from 'redux';
import { drinksReducer } from './modules/drinks';
import { dishesReducer } from './modules/dishes';
import { orderReducer } from './modules/order';

export const rootReducer = combineReducers({
    drinks: drinksReducer,
    dishes: dishesReducer,
    order: orderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;