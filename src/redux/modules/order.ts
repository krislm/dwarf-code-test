import {typedAction} from '../helpers';
import {AnyAction, Dispatch} from 'redux';
import {Dish} from './dishes';
import {Drink} from './drinks';
import {
    ADD_DISH,
    ADD_DRINK,
    REMOVE_DRINK,
    SET_DATETIME,
    SET_EMAIL,
    SET_NUMBEROFPEOPLE,
    SET_ORDER } from '../../constants/ActionTypes';

export type Order = {
    dish: Dish | null;
    email: string;
    drinks: Drink[];
    dateTime: string | null;
    numberOfPeople: number;
}

type OrderState = {
    dish: Dish | null;
    email: string;
    drinks: Drink[];
    dateTime: string | null;
    numberOfPeople: number;
}

const initialState: OrderState = {
    dish: null,
    email: '',
    drinks: [],
    dateTime: null,
    numberOfPeople: 1,
};
const setOrder = (order: Order) => {
    return typedAction(SET_ORDER, { order });
};
const addDish = (dish: Dish) => {
    return typedAction(ADD_DISH, { dish });
};
const addDrink = (drink: Drink) => {
   return typedAction(ADD_DRINK, { drink });
};
const removeDrink = (drink: Drink) => {
    return typedAction(REMOVE_DRINK, { drink });
};
const setEmail = (email: string) => {
    return typedAction(SET_EMAIL, { email });
};
const setDateTime = (dateTime: string) => {
    return typedAction(SET_DATETIME, { dateTime });
};
const setNumberOfPeople = (numberOfPeople: number) => {
    return typedAction(SET_NUMBEROFPEOPLE, { numberOfPeople });
};

export { setOrder, addDish, addDrink, removeDrink, setEmail, setDateTime, setNumberOfPeople };

export const loadExistingOrder = () => {
    return async (dispatch: Dispatch<AnyAction>) => {
        const existingOrderString = localStorage.getItem('SUNSET_PREVIOUS-ORDER');
        const existingOrder = existingOrderString ? JSON.parse(existingOrderString) : null;
        dispatch(setOrder(existingOrder));
    };
};

type OrderAction = ReturnType<typeof setOrder | typeof addDish | typeof addDrink | typeof setEmail | typeof setDateTime | typeof setNumberOfPeople>;

export function orderReducer(
    state: OrderState = initialState,
    action: OrderAction
): OrderState {
    console.log(action.type, action.payload);
    switch (action.type) {
        case SET_ORDER:
            return {
                ...state,

            };
        case ADD_DISH:
            return {
                ...state,
                dish: action.payload.dish
            }
        case ADD_DRINK:
            return {
                ...state,
                drinks: [...state.drinks, action.payload.drink]
            };
        case SET_DATETIME:
            return {
                ...state,
                dateTime: action.payload.dateTime
            };
        case SET_EMAIL:
            return {
                ...state,
                email: action.payload.email
            };
        case SET_NUMBEROFPEOPLE:
            return {
                ...state,
                numberOfPeople: action.payload.numberOfPeople
            };
        default:
            return state;
    }
}