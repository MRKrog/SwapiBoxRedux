import React from 'react';
import { shallow } from 'enzyme';
import Favorite from './Favorite';

const totalFavs = 10;

describe('api', () => {
  let wrapper;
  let mockViewFavs;
  beforeEach(() => {
     mockViewFavs = jest.fn()
     
     wrapper = shallow(
       <Favorite favAmount={totalFavs}
                 viewAllFavs={mockViewFavs} />
     )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should on click invoke the viewAllFavs function', () => {
    const button = wrapper.find('button');
    button.simulate('click');
    expect(mockViewFavs).toHaveBeenCalled()
  })

})
