import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const MovieInfo = ({ movieData }) => {
  return (
      <div className="MovieInfo">
        <div className="fade"></div>
        <section className="star-wars">
          <div className="crawl">
            <div className="title">
              <p>{movieData.title}</p>
              <h1>{movieData.release_date}</h1>
            </div>
            <p>{movieData.opening_crawl}</p>
          </div>
        </section>
        <NavLink to="/Explore">
          <button className="startBtn">Explore Movie</button>
        </NavLink>
      </div>
    )
}

MovieInfo.propTypes = {
  movieData: PropTypes.object
}

export default MovieInfo;
