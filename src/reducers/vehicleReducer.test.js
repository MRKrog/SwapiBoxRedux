import { vehicleReducer } from './vehicleReducer';
import { saveVehicles } from '../actions/index';

describe('vehicleReducer', () => {

  it('should have a defualt state of an empty array', () => {
      const expected = [];
      const result = vehicleReducer(undefined, {})

      expect(result).toEqual(expected)
  })

  it('should add all objects to the state array when passed', () => {
    const expected = [{ name: 'Luke', age: 23 }]
    const action = saveVehicles(expected);
    const result = vehicleReducer([], action)

    expect(result).toEqual(expected)
  })

})
