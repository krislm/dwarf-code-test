import { combineReducers } from 'redux';
import { drinksReducer } from './modules/drinks';
import {dishesReducer} from "./modules/dishes";

export const rootReducer = combineReducers({
    drinks: drinksReducer,
    dishes: dishesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;