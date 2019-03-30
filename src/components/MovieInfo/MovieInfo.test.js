import React from 'react';
import MovieInfo from './MovieInfo';
import { shallow } from 'enzyme';

const handleUser = jest.fn();

describe('MovieInfo', () => {
  let wrapper;
  let movieMockData;

  beforeEach(() => {
    movieMockData = {
      title: "Revenge of the Sith",
      episode_id: 3,
      opening_crawl: "War! The Republic is crumbling nunder attacks by the ruthless Sith Lord",
      director: "George Lucas",
      producer: "Rick McCallum",
      release_date: "2005-05-19"
    }
    wrapper = shallow( <MovieInfo movieData={movieMockData} /> )
  })


  it("should match snapshot when all data is passed correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

})
