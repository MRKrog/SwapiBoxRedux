import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { saveFavAmount } from '../../actions'
import Card from '../../components/Card/Card';


export class MovieContainer extends Component {
  constructor(props) {
    super(props);

  }

  handleFavBtn = (name, category) => {
    const favIndex = this.props[category].findIndex(card => card.name === name);
    this.changeFav(this.props[category][favIndex]);
    const totalFavs = this.findAllFavorites();
    this.props.storeFavAmount(totalFavs)
  }

  findAllFavorites = () => {
    const allFavorites = [...this.props.people, ...this.props.planets, ...this.props.vehicles]

    const favCards = allFavorites.filter(card => {
      return card.favorite === true;
    })
    console.log(favCards);
    return favCards.length
  }

  changeFav = (card) => {
    if(!card.favorite) {
      card.favorite = true
    } else {
      card.favorite = false
    }
  }


  render() {
    const { id } = this.props;
    let btnActive = 'btnActive';

    const cardsToDisplay = this.props.cardData.map((info, index) => (
      <Card info={info}
            handleFavBtn={this.handleFavBtn}
            key={index}
      />
    ))

    return (
      <div className="MovieContainer">
        <section className="MovieButtons">
          <NavLink to="/People">
            <button className={id === 'people' ? btnActive : ''} onClick={() => this.props.fetchPeople('people')}>People</button>
          </NavLink>
          <NavLink to="/Planets">
            <button className={id === 'planets' ? btnActive : ''} onClick={() => this.props.fetchPlanets('planets')}>Planets</button>
          </NavLink>
          <NavLink to="/Vehicles">
            <button className={id === 'vehicles' ? btnActive : ''} onClick={() => this.props.fetchVehicles('vehicles')}>Vehicles</button>
          </NavLink>
        </section>
        <div className="MovieInfoContainer">
          <section className="MovieCardContainer">
            <div className="MovieTitleDisplay"><h3>{id}</h3></div>
            <section className="MovieCardsDisplay">
            {cardsToDisplay}
            </section>
          </section>
          <section className="shadowBottom"></section>
        </div>
      </div>
    )
  }
}

MovieContainer.propTypes = {
  movieData: PropTypes.array
}

export const mapStateToProps = (state) => ({
  people: state.people,
  planets: state.planets,
  vehicles: state.vehicles,
  favAmount: state.favoriteTotal,
})

export const mapDispatchToProps = (dispatch) => ({
  storeFavAmount: (favorites) => dispatch(saveFavAmount(favorites))
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieContainer);
