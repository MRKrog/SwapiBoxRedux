import { cleanPeople, cleanPlanets, cleanVehicles } from '../fetchCleaners';

describe('fetchCleaners', () => {

  it('should return the updated data when cleanPeople is invoked', () => {
    const mockData = [
      {
        birth_year: "19BBY",
        created: "2014-12-09T13:50:51.644000Z",
        edited: "2014-12-20T21:17:56.891000Z",
        name: "Luke Skywalker",
        homeworld: "Tatooine",
        species: "Human",
        language: "Galactic Basic",
        population: "200000",
      },
      {
        birth_year: "112BBY",
        created: "2014-12-10T15:10:51.357000Z",
        edited: "2014-12-20T21:17:50.309000Z",
        name: "C-3PO",
        homeworld: "Tatooine",
        species: "Droid",
        language: "n/a",
        population: "200000",
      }
    ];

    const expected = [
      {
        name: "Luke Skywalker",
        homeworld: "Tatooine",
        species: "Human",
        language: "Galactic Basic",
        population: "200000",
        category: 'people',
        favorite: false
      },
      {
        name: "C-3PO",
        homeworld: "Tatooine",
        species: "Droid",
        language: "n/a",
        population: "200000",
        category: 'people',
        favorite: false
      }
    ];
    const result = cleanPeople(mockData)

    expect(result).toEqual(expected)
  })


  it('should return the updated data when cleanPlanets is invoked', () => {
    const mockData = [
      {
        climate: "temperate",
        diameter: "12500",
        gravity: "1 standard",
        name: "Alderaan",
        orbital_period: "364",
        population: "2000000000",
        terrain: "grasslands, mountains",
        residents: ["Leia Organa", "Bail Prestor Organa", "Raymus Antilles"],
      },
      {
        climate: "temperate, tropical",
        gravity: "1 standard",
        name: "Yavin IV",
        orbital_period: "4818",
        population: "1000",
        residents: [],
        rotation_period: "24",
        terrain: "jungle, rainforests",
      }
    ];

    const expected = [
      {
        name: "Alderaan",
        terrain: "grasslands, mountains",
        population: "2000000000",
        climate: "temperate",
        residents: ["Leia Organa", "Bail Prestor Organa", "Raymus Antilles"],
        category: 'planets',
        favorite: false
      },
      {
        name: "Yavin IV",
        terrain: "jungle, rainforests",
        population: "1000",
        climate: "temperate, tropical",
        residents: [],
        category: 'planets',
        favorite: false
      }
    ];

    const result = cleanPlanets(mockData)
    expect(result).toEqual(expected)
  })


  it('should return the updated data when cleanVehicles is invoked', () => {
    const mockData = [
      {
        cargo_capacity: "50000",
        consumables: "2 months",
        cost_in_credits: "150000",
        created: "2014-12-10T15:36:25.724000Z",
        crew: "46",
        edited: "2014-12-22T18:21:15.523587Z",
        length: "36.8",
        manufacturer: "Corellia Mining Corporation",
        max_atmosphering_speed: "30",
        model: "Digger Crawler",
        name: "Sand Crawler",
        passengers: "30",
        pilots: [],
        url: "https://swapi.co/api/vehicles/4/",
        vehicle_class: "wheeled",
      },
      {
        cargo_capacity: "50",
        consumables: "0",
        cost_in_credits: "14500",
        crew: "1",
        length: "10.4",
        manufacturer: "Incom Corporation",
        max_atmosphering_speed: "1200",
        model: "T-16 skyhopper",
        name: "T-16 skyhopper",
        passengers: "1",
        pilots: [],
        url: "https://swapi.co/api/vehicles/6/",
        vehicle_class: "repulsorcraft",
      }
    ];

    const expected = [
      {
        category: "vehicles",
        class: "wheeled",
        favorite: false,
        model: "Digger Crawler",
        name: "Sand Crawler",
        passenger: "30",
      },
      {
        category: "vehicles",
        class: "repulsorcraft",
        favorite: false,
        model: "T-16 skyhopper",
        name: "T-16 skyhopper",
        passenger: "1",
      }
    ];

    const result = cleanVehicles(mockData)
    expect(result).toEqual(expected)
  })

})
