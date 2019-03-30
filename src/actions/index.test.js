import { saveMovie, savePeople, savePlanets, saveVehicles, saveFavAmount } from './index.js';

describe('Actions', () => {

  it('should return an object with SAVE_MOVIE', () => {
      const mockData = [];

      const expected = {
        type: 'SAVE_MOVIE',
        info: []
      }

      const result = saveMovie(mockData);
      expect(result).toEqual(expected);
  })

  it('should return an object with SAVE_PEOPLE', () => {
    const mockData = [];
    const expected = {
      type: "SAVE_PEOPLE",
      people: []
    }
    const result = savePeople(mockData)
  })

  it('should return an object with SAVE_PLANETS', () => {
    const mockData = [];
    const expected = {
      type: 'SAVE_PLANETS',
      planets: [],
    }
    const result = savePlanets(mockData)
  })

  it('should return an object with saveVehicles', () => {
    const mockData = [];
    const expected = {
      type: 'SAVE_VEHICLES',
      vehicles: []
    }
    const result = saveVehicles(mockData)
  })

  it('should return an object with UPDATE_COUNT and have a number in its favorites property', () => {
    const mockData = 10;
    const expected = {
      type: 'UPDATE_COUNT',
      favorites: 10
    }
    const result = saveFavAmount(mockData)
  })



})
