import React from 'react'
import Loader from './Loader'
import { shallow } from 'enzyme';

describe('Loader', () => {
  let wrapper;
  let loadStatus = true;

  beforeEach(() => {
    wrapper = shallow(<Loader loading={loadStatus} />)
  })

  it('should match the snapshot when rendered', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have a class of loading-true if loading prop is equal to true', () => {
    const favoriteImage = wrapper.find('img')
    // console.log(favoriteImage);
    expect(favoriteImage.hasClass('loading-true')).toBe(true);
  })

  it('should not have a class loading-true is loading prop is equal to false', () => {
    wrapper.setProps({ loading: false })
    const favoriteImage = wrapper.find('img')
    expect(favoriteImage.hasClass('loading-true')).toBe(false)
  })

})
