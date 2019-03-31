import React from 'react';
import { shallow } from 'enzyme';

import {MovieContainer, mapStateToProps, mapDispatchToProps} from './MovieContainer';

import * as actions from '../../actions'

const mockData = [
  {
    category: "people",
    favorite: false,
    homeworld: "Tatooine",
    language: "Galactic Basic",
    name: "Luke Skywalker",
    population: "200000",
    species: "Human",
  },
  {
    category: "people",
    favorite: false,
    homeworld: "Tatooine",
    language: "n/a",
    name: "C-3PO",
    population: "200000",
    species: "Droid",
  }
]
const category = 'people'
const mockTotalFavs = 10;
const mockPeople = [{name: 'Luke', favorite: true}, {name: 'Han Solo', favorite: false}]
const mockPlanets = [{name: 'Tattoin', favorite: true}, {name: 'Hoth', favorite: false}]
const mockVehicles = [{name: 'Falcon', favorite: true}, {name: 'Tie Fighter', favorite: false}]

describe('MovieContainer', () => {

  describe('MovieContainer Component', () => {
    let wrapper;
    let url;
    let mockStoreFavAmount;

    beforeEach(() => {
        mockStoreFavAmount = jest.fn()
        wrapper = shallow(<MovieContainer id={category}
                                          cardData={mockData}
                                          people={mockPeople}
                                          planets={mockPlanets}
                                          vehicles={mockVehicles}
                                          storeFavAmount={mockStoreFavAmount}
                                />)


    })

    it('should Match the Snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should invoke storeFavAmount when handleFavBtn is invoked', () => {
      wrapper.instance().handleFavBtn('Hoth', 'planets')

      expect(mockStoreFavAmount).toHaveBeenCalled()
    })

    it('should find all the favorite cards and return its length when findAllFavorites is invoked', () => {
      const favTotals = wrapper.instance().findAllFavorites()
      expect(favTotals).toEqual(4)
    })

    it('should change the cards property of favorite to true when changeFav is invoked', () => {
      const mockCard = {
        category: "people",
        favorite: true,
        homeworld: "Tatooine",
      }

      const expectedCard = {
        category: "people",
        favorite: false,
        homeworld: "Tatooine",
      }

      wrapper.instance().changeFav(mockCard)
      expect(mockCard).toEqual(expectedCard)
    })

  })

  describe('mapStateToProps', () => {

    it('should return an object with the correct properties', () => {
      const mockData = {
        movie: [],
        people: [],
        planets: [],
        vehicles: [],
        favAmount: undefined,
      }
      const expected = {
        people: [],
        planets: [],
        vehicles: [],
        favAmount: undefined,
      }

      const mockProps = mapStateToProps(mockData);
      expect(mockProps).toEqual(expected);
    })

  })

  describe('mapDispatchToProps', () => {

    it('should call dispatch storeMovie', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = actions.saveFavAmount(mockTotalFavs)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.storeFavAmount(mockTotalFavs)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

  })

})
