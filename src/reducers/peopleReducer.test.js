import { peopleReducer } from './peopleReducer';
import { savePeople } from '../actions/index';

describe('peopleReducer', () => {

  it('should have a default state of an empty array', () => {
    const expected = [];
    const result = peopleReducer(undefined, {});
    expect(result).toEqual(expected);
  })

  it('should store all the people objects into state', () => {
    const expected = [{ name: 'Luke', age: 23 }]
    const action = savePeople(expected);
    const result = peopleReducer([], action)

    expect(result).toEqual(expected)
  })

})
