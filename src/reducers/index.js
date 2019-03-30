import { combineReducers } from 'redux';

import { movieReducer } from './movieReducer';
import { peopleReducer } from './peopleReducer';
import { planetReducer } from './planetReducer';
import { vehicleReducer } from './vehicleReducer';
import { favoritesReducer } from './favoritesReducer';

export const rootReducer = combineReducers({
  movie: movieReducer,
  people: peopleReducer,
  planets: planetReducer,
  vehicles: vehicleReducer,
  favoriteTotal: favoritesReducer,
})
