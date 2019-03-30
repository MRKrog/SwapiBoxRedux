import { movieReducer } from './movieReducer';
import { saveMovie } from '../actions/index';


describe('movieReducer', () => {

  it('should have a default state of an empty array', () => {
    const expected = [];
    const result = movieReducer(undefined, {});
    expect(result).toEqual(expected);
  })

  it('should store the movie object into its state', () => {
    const expected = [{ name: 'Luke', age: 23 }];
    const action = saveMovie(expected)
    const result = movieReducer([], action)
    expect(result).toEqual(expected)
  })


})
