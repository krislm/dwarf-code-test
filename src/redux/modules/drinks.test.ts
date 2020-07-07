// @ts-ignore
import { Drink, setDrinks } from './drinks';
import { GET_DRINKS } from '../../constants/ActionTypes';

// test data
const drinks: Drink[] = [{
    id: 123,
    name: 'Test drink',
    tagline: '',
    description: '',
    image_url: ''
}];

describe('drinks actions', () => {
    it(`${GET_DRINKS} should create an action to set drinks state`, () => {
        const expectedAction = { type: GET_DRINKS, payload: drinks };
        const result = setDrinks(drinks);
        expect(result).toEqual(expectedAction);
    })
});