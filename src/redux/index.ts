import { combineReducers } from 'redux';
import { drinksReducer } from './modules/drinks';

export const rootReducer = combineReducers({
    drinks: drinksReducer
});

export type RootState = ReturnType<typeof rootReducer>;