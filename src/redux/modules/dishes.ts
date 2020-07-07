import {typedAction} from '../helpers';
import {AnyAction, Dispatch} from 'redux';
import axios from 'axios';
import { GET_DISHES } from '../../constants/ActionTypes';

export type Dish = {
    idMeal: number,
    strMeal: string,
    strMealThumb: string,
    strInstructions: string
};

type DishesState = {
    dishes: Dish[],
    loading: boolean
};

const initialState: DishesState = {
    dishes: [],
    loading: false
};

const setDishes = (dishes: Dish[]) => {
    return typedAction(GET_DISHES, dishes);
};
export { setDishes };

export const loadDishes = () => {
    return async (dispatch: Dispatch<AnyAction>) => {
        const dishes: Dish[] = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
            .then((response: any) => response.data);
        dispatch(setDishes(dishes));
    }
};

type DishesAction = ReturnType<typeof setDishes>;

export function dishesReducer(
    state: DishesState = initialState,
    action: DishesAction
): DishesState {
    switch (action.type) {
        case GET_DISHES:
            return {
                ...state,
                dishes: [...state.dishes, ...action.payload]
            }
        default:
            return state;
    }
}