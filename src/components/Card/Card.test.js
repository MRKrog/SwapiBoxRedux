import React from 'react';
import Card from './Card';
import { shallow } from 'enzyme';

const mockHandleFavBtn = jest.fn()

const info = {
      name: 'Luke Skywalker',
      category: "people",
      favorite: false,
      homeworld: "Tatooine",
      language: "Galactic Basic",
      name: "Luke Skywalker",
      population: "200000",
      species: "Human"
    }

describe('Card', () => {
  let wrapper;

  beforeEach(() => {
      wrapper = shallow(<Card info={info}
                              handleFavBtn={mockHandleFavBtn}
                              />)

  })

  it("should match snapshot when all data is passed correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should invoke handleFavBtn when button clicked and called with two name and category', () => {
    let button = wrapper.find('button')
    button.simulate('click')
    expect(mockHandleFavBtn).toHaveBeenCalledWith('Luke Skywalker', 'people')
  })

  it("should change its class to activeFav when favorite is true", () => {
    const newInfo = {
          name: 'Luke Skywalker',
          category: "people",
          favorite: true,
          homeworld: "Tatooine",
          language: "Galactic Basic",
          name: "Luke Skywalker",
          population: "200000",
          species: "Human"
        }

    let newWrapper = shallow(<Card info={newInfo} />)

    expect(newWrapper).toMatchSnapshot();
  });

})
