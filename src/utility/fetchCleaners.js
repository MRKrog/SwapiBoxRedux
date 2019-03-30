
export const cleanPeople = (peopleData) => {
  const people = peopleData.map(person => {
    return {
      name: person.name,
      homeworld: person.homeworld,
      species: person.species,
      language: person.language,
      population: person.population,
      category: 'people',
      favorite: false
    }
  })
  return people;
}

export const cleanPlanets = (data) => {
  const cleanData = data.map(planet => {
    return {
      name: planet.name,
      terrain: planet.terrain,
      population: planet.population,
      climate: planet.climate,
      residents: planet.residents,
      category: 'planets',
      favorite: false
    }
  })
  return cleanData;
}

export const cleanVehicles = (data) => {
  const vehicleResults = data.map(vehicle => {
    return {
      name: vehicle.name,
      model: vehicle.model,
      class: vehicle.vehicle_class,
      passenger: vehicle.passengers,
      category: 'vehicles',
      favorite: false
    }
  })
  return vehicleResults;
}
