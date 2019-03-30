import { planetReducer } from './planetReducer';
import { savePlanets } from '../actions/index';


describe('planetReducer', () => {
  it('should have a default state of an array', () => {
    const expected = [];

    const result = planetReducer(undefined, {});
    expect(result).toEqual(expected);
  })

  it('should store the planet object into its state', () => {
    const expected = [{ name: 'Luke', age: 23 }]
    const action = savePlanets(expected)
    const result = planetReducer([], action);

    expect(result).toEqual(expected)
  })

})
