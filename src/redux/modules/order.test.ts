// @ts-ignore
import { Dishes } from './dishes';
import {addDish, addDrink, Order, removeDrink, setDateTime, setEmail, setNumberOfPeople, setOrder} from './order';
import {
    ADD_DISH,
    ADD_DRINK,
    REMOVE_DRINK,
    SET_DATETIME,
    SET_EMAIL,
    SET_NUMBEROFPEOPLE,
    SET_ORDER } from '../../constants/ActionTypes';
import { Drink } from './drinks';

// test data
const dish: Dishes = {
    idMeal: 123,
    strMeal: 'Test Meal',
    strMealThumb: '',
    strInstructions: ''
};
const drink: Drink = {
    id: 123,
    name: 'Test drink',
    tagline: '',
    description: '',
    image_url: ''
};
const dateTime: Date = new Date();
const email: string = 'test@email.com';
const numberOfPeople: number = 3;
const order: Order = {
    dish,
    drinks: [drink],
    dateTime,
    email,
    numberOfPeople
};

describe('order actions', () => {
    it(`${ADD_DISH} should create an action to add a dish`, () => {
        const expectedAction = { type: ADD_DISH, payload: { dish } };
        const result = addDish(dish);
        expect(result).toEqual(expectedAction);
    });
    it(`${ADD_DRINK} should create an action to add a drink`, () => {
        const expectedAction = { type: ADD_DRINK, payload: { drink } };
        const result = addDrink(drink);
        expect(result).toEqual(expectedAction);
    });
    it(`${REMOVE_DRINK} should create an action to remove a drink`, () => {
        const expectedAction = { type: REMOVE_DRINK, payload: {drink} };
        const result = removeDrink(drink);
        expect(result).toEqual(expectedAction);
    });
    it(`${SET_DATETIME} should create an action to set date & time`, () => {
        const expectedAction = { type: SET_DATETIME, payload: { dateTime } };
        const result = setDateTime(dateTime);
        expect(result).toEqual(expectedAction);
    });
    it(`${SET_EMAIL} should create an action to set email`, () => {
        const expectedAction = { type: SET_EMAIL, payload: { email } };
        const result = setEmail(email);
        expect(result).toEqual(expectedAction);
    });
    it(`${SET_NUMBEROFPEOPLE} should create an action to set number of people`, () => {
        const expectedAction = { type: SET_NUMBEROFPEOPLE, payload: { numberOfPeople } };
        const result = setNumberOfPeople(numberOfPeople);
        expect(result).toEqual(expectedAction);
    });
    it(`${SET_ORDER} should create an action to set order`, () => {
        const expectedAction = { type: SET_ORDER, payload: { order } };
        const result = setOrder(order);
        expect(result).toEqual(expectedAction);
    })
});