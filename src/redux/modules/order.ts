import {typedAction} from '../helpers';
import { Dispatch, AnyAction } from 'redux';
import {Dish} from "./dish";
import {Drink} from "./drinks";

export type Order = {
    dish: Dish | null;
    email: string;
    drinks: Drink[];
    dateTime: string;
    numberOfPeople: number;
}

type OrderState = {
    dish: Dish | null;
    email: string;
    drinks: Drink[];
    dateTime: Date;
    numberOfPeople: number;
}

const initialState: OrderState = {
    dish: null,
    email: '',
    drinks: [],
    dateTime: new Date(),
    numberOfPeople: 1,
};
const setOrder = (order: Order) => {
    return typedAction('order/SET_ORDER', { order });
};
const addDish = (dish: Dish) => {
    return typedAction('order/ADD_DISH', { dish });
};
const addDrink = (drink: Drink) => {
   return typedAction('order/ADD_DRINK', { drink });
};
const setEmail = (email: string) => {
    return typedAction('order/SET_EMAIL', { email });
};
const setDateTime = (dateTime: Date) => {
    return typedAction('order/SET_DATETIME', { dateTime });
};
const setNumberOfPeople = (numberOfPeople: number) => {
    return typedAction('order/SET_NUMBEROFPEOPLE', { numberOfPeople });
};

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
    switch (action.type) {
        case 'order/SET_ORDER':
            return {
                ...state,

            };
        case "order/ADD_DISH":
            return {
                ...state,
                dish: action.payload.dish
            }
        case "order/ADD_DRINK":
            return {
                ...state,
                drinks: [...state.drinks, action.payload.drink]
            };
        case "order/SET_DATETIME":
            return {
                ...state,
                dateTime: action.payload.dateTime
            };
        case "order/SET_EMAIL":
            return {
                ...state,
                email: action.payload.email
            };
        case "order/SET_NUMBEROFPEOPLE":
            return {
                ...state,
                numberOfPeople: action.payload.numberOfPeople
            };
        default:
            return state;
    }
}