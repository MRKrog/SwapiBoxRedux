import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Favorite = ({ favAmount, viewAllFavs }) => {
  return (
    <div className="Favorites">
      <NavLink to="/Favorites">
        <button onClick={viewAllFavs}>View Favorites<span className="count">{favAmount}</span></button>
      </NavLink>
    </div>
  )
}

Favorite.propTypes = {
  favAmount: PropTypes.number.isRequired,
  viewAllFavs: PropTypes.func.isRequired
}

export default Favorite;
