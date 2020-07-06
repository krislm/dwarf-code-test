import {typedAction} from '../helpers';
import { Dispatch, AnyAction } from 'redux';
import axios from 'axios';

export type Drink = {
    id: number,
    name: string,
    tagline: string,
    description: string,
    image_url: string
};

type DrinksState = {
    drinks: Drink[];
    loading: boolean;
};

const initialState: DrinksState = {
    drinks: [],
    loading: false
};

const setDrinks = (drinks: Drink[]) => {
    return typedAction('drinks/GET_DRINKS', drinks);
};

// Action creator returning a thunk!
export const loadDrinks = () => {
    return async (dispatch: Dispatch<AnyAction>) => {
        const drinks: Drink[] = await axios.get('https://api.punkapi.com/v2/beers').then(response => response.data);
        console.log('drinks', drinks)
        dispatch(setDrinks(drinks));
    };
};

type DrinksAction = ReturnType<typeof setDrinks>;

export function drinksReducer(
    state: DrinksState = initialState,
    action: DrinksAction
): DrinksState {
    switch (action.type) {
        case 'drinks/GET_DRINKS':
            return {
                ...state,
                drinks: [...state.drinks, ...action.payload]
            };
        default:
            return state;
    }
}