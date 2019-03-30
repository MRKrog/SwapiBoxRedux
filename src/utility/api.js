import { fetchAnything } from './fetchAnything';

export const fetchSpecies = async (peopleData) => {
  const peopleResults = peopleData.map(async person => {
    const response = await fetchAnything(person.species)
    const speciesData = {...person, language: response.language, species: response.name }
    return speciesData;
  })
  return Promise.all(peopleResults);
}

export const fetchHomeworld = async (peopleData) => {
  const homeResults = peopleData.map(async person => {
      const response = await fetchAnything(person.homeworld)
      const homeData = { ...person, population: response.population, homeworld: response.name }
      return homeData;
  })
  return Promise.all(homeResults)
}

export const getAllPlanets = async (data) => {
  const planetsResults = data.map(async planet => {
    const response = await getResidents(planet.residents)
    const result = {...planet, residents: response }
    return result;
  })
  return Promise.all(planetsResults);
}

const getResidents = (data) => {
  const residents = data.map(resident => {
    return fetchAnything(resident)
      .then(result => (result.name))
  })
  return Promise.all(residents)
}
