import { favoritesReducer } from './favoritesReducer';
import { saveFavAmount } from '../actions/index';

describe('favoritesReducer', () => {

  it('should have a default state of 0', () => {
    const expected = 0;
    const result = favoritesReducer(undefined, {})
    expect(result).toEqual(expected)
  })


})
