// @ts-ignore
import { Dish, setDishes } from './dishes';
import { GET_DISHES } from '../../constants/ActionTypes';

// test data
const dishes: Dish[] = [{
    idMeal: 123,
    strMeal: 'Test dish',
    strMealThumb: '',
    strInstructions: ''
}];

describe('dishes actions', () => {
    it(`${GET_DISHES} should create an action to set dishes state`, () => {
        const expectedAction = { type: GET_DISHES, payload: dishes };
        const result = setDishes(dishes);
        expect(result).toEqual(expectedAction);
    })
})