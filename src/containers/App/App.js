import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { saveMovie, savePeople, savePlanets, saveVehicles } from '../../actions';

import { fetchAnything } from '../../utility/fetchAnything';
import { cleanPeople, cleanPlanets, cleanVehicles } from '../../utility/fetchCleaners';
import { fetchSpecies, fetchHomeworld, getAllPlanets } from '../../utility/api';

import MovieContainer from '../MovieContainer/MovieContainer';
import MovieInfo from '../../components/MovieInfo/MovieInfo';
import Favorite from '../../components/Favorite/Favorite';
import Loader from '../../components/Loader/Loader';

import logo from '../../images/starwars_logo.png';
import emblem from '../../images/star_emblem.png';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      error: '',
      loading: false,
      category: '',
      favCards: [],
    }
  }

  componentDidMount = () => {
    const movieNumber = Math.floor(Math.random() * 7) + 1
    const url = `https://swapi.co/api/films/${movieNumber}`;
    this.fetchMovie(url)
  }

  fetchMovie = async (url) => {
    try {
      const movie = await fetchAnything(url)
      this.props.storeMovie(movie)
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  fetchPeople = async (category) => {
    const url = `https://swapi.co/api/people`;

    if(!this.props.people.length) {
      try {
        this.handleLoadStart()
        const peopleData = await fetchAnything(url)
        const peopleSpecies = await fetchSpecies(peopleData.results)
        const peopleHomeworld = await fetchHomeworld(peopleSpecies)
        const allPeople = cleanPeople(peopleHomeworld)
        this.props.storePeople(allPeople);
      } catch (error) {
        this.setState({ error: error.message })
      }
    }
    this.setState({ category })
  }

  fetchPlanets = async (category) => {
    const url = `https://swapi.co/api/planets`;
    if(!this.props.planets.length) {
      this.handleLoadStart()
      try {
        const allPlanets = await fetchAnything(url)
        const allData = await getAllPlanets(allPlanets.results)
        const resolvedPlanets = cleanPlanets(allData)
        this.props.storePlanets(resolvedPlanets);
      } catch (error) {
        this.setState({ error: error.message })
      }
    }
    this.setState({ category })
  }

  fetchVehicles = async (category) => {
    const url = `https://swapi.co/api/vehicles`;
    if(!this.props.vehicles.length) {
      try {
        this.handleLoadStart()
        const vehicleData = await fetchAnything(url)
        const resolvedVehicles = await cleanVehicles(vehicleData.results)
        this.props.storeVehicles(resolvedVehicles);
      } catch (error) {
        this.setState({ error: error.message })
      }
    }
    this.setState({ category })
  }

  findAllFavorites = () => {
    const allFavorites = [...this.props.people, ...this.props.planets, ...this.props.vehicles]
    const favCards = allFavorites.filter(card => {
      return card.favorite === true;
    })
    return favCards
  }

  viewAllFavs = () => {
    const favCards = this.findAllFavorites()
    this.setState({
      category: 'favorites',
      favCards,
    })
  }

  handleLoadStart = () => {
    this.setState({
      loading: true
    })
  }

  render() {
    const { error, loading, category } = this.state;
    return (
      <div className="App">
        { error && <h2 className="error">{error}</h2> }
        <div className="MovieTitle">
          <NavLink to="/Explore">
            <h3><img src={emblem} alt="Star Wars" /></h3>
          </NavLink>
          <h1><img src={logo} alt="Star Wars" /></h1>
          <Favorite favAmount={this.props.favAmount}
                    viewAllFavs={this.viewAllFavs}
                    />
        </div>
        <Route exact path="/" render={() => {
          if(Object.keys(this.props.movie).length) {
            return <MovieInfo movieData={this.props.movie}
                              handleUser={this.handleUser} />
          } else {
            return <Loader loading={loading} />
          }
        }} />
        <Route exact path="/Explore" render={() => {
            return <MovieContainer id={'Explore'}
                                   fetchPeople={this.fetchPeople}
                                   fetchPlanets={this.fetchPlanets}
                                   fetchVehicles={this.fetchVehicles}
                                   cardData={[]} />
        }}/>
        <Route exact path="/People" render={() => {
          if(Object.keys(this.props.people).length) {
            return <MovieContainer id={category}
                                   fetchPeople={this.fetchPeople}
                                   fetchPlanets={this.fetchPlanets}
                                   fetchVehicles={this.fetchVehicles}
                                   cardData={this.props.people}
                                    />
          } else {
            return <Loader loading={loading} />
          }
        }}/>
        <Route exact path="/Planets" render={() => {
          if(Object.keys(this.props.planets).length) {
            return <MovieContainer id={category}
                                   fetchPeople={this.fetchPeople}
                                   fetchPlanets={this.fetchPlanets}
                                   fetchVehicles={this.fetchVehicles}
                                   cardData={this.props.planets} />
          } else {
            return <Loader loading={loading} />
          }
        }}/>
        <Route exact path="/Vehicles" render={() => {
          if(Object.keys(this.props.vehicles).length) {
            return <MovieContainer id={category}
                                   fetchPeople={this.fetchPeople}
                                   fetchPlanets={this.fetchPlanets}
                                   fetchVehicles={this.fetchVehicles}
                                   cardData={this.props.vehicles} />
          } else {
            return <Loader loading={loading} />
          }
        }}/>
        <Route exact path="/Favorites" render={() => {
            return <MovieContainer id={category}
                                   fetchPeople={this.fetchPeople}
                                   fetchPlanets={this.fetchPlanets}
                                   fetchVehicles={this.fetchVehicles}
                                   cardData={this.state.favCards} />
          }
        }/>
      </div>
    );
  }
}

App.propTypes = {
  storeMovie: PropTypes.func,
}

export const mapStateToProps = (state) => ({
  movie: state.movie,
  people: state.people,
  planets: state.planets,
  vehicles: state.vehicles,
  favAmount: state.favoriteTotal,
})

export const mapDispatchToProps = (dispatch) => ({
  storeMovie: (movie) => dispatch(saveMovie(movie)),
  storePeople: (people) => dispatch(savePeople(people)),
  storePlanets: (planets) => dispatch(savePlanets(planets)),
  storeVehicles: (vehicles) => dispatch(saveVehicles(vehicles)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
