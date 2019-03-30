
export const saveMovie = (info) => ({
  type: 'SAVE_MOVIE',
  info
})

export const savePeople = (people) => ({
  type: 'SAVE_PEOPLE',
  people
})

export const savePlanets = (planets) => ({
  type: 'SAVE_PLANETS',
  planets
})

export const saveVehicles = (vehicles) => ({
  type: 'SAVE_VEHICLES',
  vehicles
})

export const saveFavAmount = (favorites) => ({
  type: "UPDATE_COUNT",
  favorites
})
