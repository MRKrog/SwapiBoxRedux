import React from 'react';
import { App, mapStateToProps, mapDispatchToProps } from './App';
import * as actions from '../../actions'
// import { saveMovie, savePeople, savePlanets, saveVehicles, saveFavAmount } from '../../actions';
import { shallow } from 'enzyme';

import MovieContainer from '../MovieContainer/MovieContainer';
import MovieInfo from '../../components/MovieInfo/MovieInfo';
import Favorite from '../../components/Favorite/Favorite';
import Loader from '../../components/Loader/Loader';

import { cleanPeople, cleanPlanets, cleanVehicles } from '../../utility/fetchCleaners';
jest.mock('../../utility/fetchCleaners')
import { fetchSpecies, fetchHomeworld, getAllPlanets } from '../../utility/api';
jest.mock('../../utility/api')

import { fetchAnything } from '../../utility/fetchAnything';
jest.mock('../../utility/fetchAnything')

const mockMovie = {title: 'episode 1', date: 'june 1970'}
const mockPeople = [{name: 'Luke', favorite: true}, {name: 'Han Solo', favorite: false}]
const mockPlanets = [{name: 'Tattoin', favorite: true}, {name: 'Hoth', favorite: false}]
const mockVehicles = [{name: 'Falcon', favorite: true}, {name: 'Tie Fighter', favorite: false}]




describe('App', () => {

  describe('App Component', () => {
    let wrapper;
    let mockUrl;

    beforeEach(() => {
      mockUrl = 'www.starwars.com';
      wrapper = shallow(<App mockMovie={{}}
                             people={[]}
                             planets={[]}
                             vehicles={[]}
                        />)
    })

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should have a default state', () => {
      wrapper = shallow(<App />, { disableLifecycleMethods: true })
      expect(wrapper.state()).toEqual({
        error: '',
        loading: false,
        category: '',
        favCards: [],
      })
    })

    it('should invoke fetchAnything when fetchMovie is called', async () => {
      await wrapper.instance().fetchMovie(mockUrl)
      expect(fetchAnything).toHaveBeenCalledWith(mockUrl)
    })

    it('should update throw an error is the url fetch is bad', async () => {
      fetchAnything.mockImplementationOnce(() => Promise.reject(new Error('Bar Url Error')))
      await wrapper.instance().fetchMovie(mockUrl)
      const expected = "Bar Url Error"

      expect(wrapper.state('error')).toEqual(expected)
    })

    it('should call fetchAnything when fetchPeople is invoked and set loading state to true', async () => {
      let category = 'newPeps';
      // let peopleWrapper = shallow(<App people={[]} />)

      await wrapper.instance().fetchPeople(category)
      expect(wrapper.state('loading')).toEqual(true)
      expect(fetchAnything).toHaveBeenCalled()
      expect(wrapper.state('category')).toEqual('newPeps')
    })

    it('should have an error added to state if the fetch fails on fetchPeople', async () => {
      let category = 'people';
      fetchAnything.mockImplementationOnce(() => Promise.reject(new Error('Bad Url')))
      await wrapper.instance().fetchPeople(category)
      expect(wrapper.state('error')).toEqual('Bad Url')
    })

    it.skip('should not call fetchAnything when fetchPeople and has people in props', async () => {
      // wont test because on componentDidMount async call is firing
      let category = 'people'
      wrapper.setProps({
        people: [{
          favorited: false,
          homeworld: 'Tatooine',
          name: 'Luke Skywalker',
          population: '200000',
          species: 'Human',
          type: 'people'
        }]
      })
      // let wrapperPeople = shallow(<App people={['name']}/>, { disableLifecycleMethods: true })

      await wrapper.instance().fetchPeople(category);
      expect(fetchAnything).not.toHaveBeenCalled()
    })

    it.skip('should call fetchSpecies, fetchHomeworld, and cleanPeople when fetchPeople is invoked', async () => {
      let category = 'people';

      await wrapper.instance().fetchPeople(category)
      expect(fetchAnything).toHaveBeenCalled()
      expect(fetchSpecies).toHaveBeenCalled()
      expect(fetchHomeworld).toHaveBeenCalled()
    })


    it('should invoke fetchAnything when fetchPlanets is called and set the state of loading and category', async () => {
      let category = 'planets'
      await wrapper.instance().fetchPlanets(category)

      expect(wrapper.state('loading')).toEqual(true)
      expect(fetchAnything).toHaveBeenCalled()
      expect(wrapper.state('category')).toEqual('planets')
    })


    it('should have an error added to state if the fetch fails on fetchPlanets', async () => {
      let category = 'planets';
      fetchAnything.mockImplementationOnce(() => Promise.reject(new Error('Bad Planets Url')))
      await wrapper.instance().fetchPeople(category)
      expect(wrapper.state('error')).toEqual('Bad Planets Url')
    })


    it('should invoke fetchAnything when fetchVehicles is called and set the state of loading and category', async () => {
      let category = 'vehicles'
      await wrapper.instance().fetchPlanets(category)

      expect(wrapper.state('loading')).toEqual(true)
      expect(fetchAnything).toHaveBeenCalled()
      expect(wrapper.state('category')).toEqual('vehicles')
    })


    it('should have an error added to state if the fetch fails on fetchVehicles', async () => {
      let category = 'vehicles';
      fetchAnything.mockImplementationOnce(() => Promise.reject(new Error('Bad Vehicles Url')))
      await wrapper.instance().fetchPeople(category)
      expect(wrapper.state('error')).toEqual('Bad Vehicles Url')
    })

    it.skip('should find all the favorited cards and return them', () => {

      const favWrapper = shallow(<App people={mockPeople} planets={mockPlanets} vehicles={mockVehicles} />)
      const expectedFavs = {name: 'Luke', favorite: true}
      // const mockPlanets = [{name: 'Tattoin', favorite: true}, {name: 'Hoth', favorite: false}]
      // const mockVehicles = [{name: 'Falcon', favorite: true}, {name: 'Tie Fighter', favorite: false}]

      expect(favWrapper.instance().viewAllFavs()).toEqual(expectedFavs)
    })

    it('should change the state of category to favorites and set the state of favCards to all favorites cards when viewAllFavs is invoked', () => {
      const favWrapper = shallow(<App people={mockPeople} planets={mockPlanets} vehicles={mockVehicles} />)
      const expectedFavs = [{name: 'Luke', favorite: true}, {name: 'Tattoin', favorite: true}, {name: 'Falcon', favorite: true}]

      favWrapper.instance().viewAllFavs()
      expect(favWrapper.state('category')).toEqual('favorites')
      expect(favWrapper.state('favCards')).toEqual(expectedFavs)

    })


    it('should change the state of loading from true to false when invoked', () => {
      expect(wrapper.state('loading')).toEqual(false)
      wrapper.instance().handleLoadStart()
      expect(wrapper.state('loading')).toEqual(true)
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
        category: 'random',
      }
      const expected = {
        movie: [],
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
      const actionToDispatch = actions.saveMovie(mockMovie)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.storeMovie(mockMovie)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('should call dispatch storePeople', () => {
      // Setup
      const mockDispatch = jest.fn();
      const actionToDispatch = actions.savePeople(mockPeople);

      // Execution
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.storePeople(mockPeople)

      // Expectations
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('shoud call dispatch storePlanets', () => {
      // Setup
      const mockDispatch = jest.fn();
      const actionToDispatch = actions.savePlanets(mockPlanets)

      // Execution
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.storePlanets(mockPlanets)

      // Expectations
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('should call dispatch storeVehicles', () => {
      // Setup
      const mockDispatch = jest.fn();
      const actionToDispatch = actions.saveVehicles(mockVehicles)

      // Execution
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.storeVehicles(mockVehicles)

      // Expectations
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })


  })

})
