import { fetchSpecies, fetchHomeworld, getAllPlanets } from '../api'

import { getResidents } from '../fetchResidents';
jest.mock('../fetchResidents')

import { fetchAnything } from '../fetchAnything';
jest.mock('../fetchAnything.js')


describe('api', () => {

  describe('fetchSpecies', () => {
    let mockPeople
    let mockSpecies

    beforeEach(() => {
      mockPeople = [
        {
          name: "Luke",
          gender: "male",
          species: "https://species.com",
          language: "https://home.com"
        },
        {
          name: "C-3PO",
          gender: "droid",
          species: "https://species.com",
          language: "https://home.com"
        }
      ]
      mockSpecies = { language: 'English', name: 'human'}

    })

    it('should fetchSpecies gets called expect fetchAnything to have been called', () => {
      fetchSpecies(mockPeople)
      expect(fetchAnything).toHaveBeenCalled()
    })

    it('should return an object with original data and language and speicies', async () => {
      fetchAnything.mockImplementation(() => Promise.resolve(mockSpecies))

      const expected = [
        {
          name: "Luke",
          gender: "male",
          language: 'English',
          species: 'human'
        },
        {
          name: "C-3PO",
          gender: "droid",
          language: 'English',
          species: 'human'
        }
      ]

      const result = await fetchSpecies(mockPeople)
      expect(result).toEqual(expected)

    })

  })

  describe('fetchHomeworld', () => {
    let mockPeople;
    let mockHomeworld;

    beforeEach(() => {
      mockPeople = [
        {
          name: "Luke",
          gender: "male",
          language: 'English',
          species: 'human'
        },
        {
          name: "C-3PO",
          gender: "droid",
          language: 'English',
          species: 'human'
        }
      ]

      mockHomeworld = { population: 20000, name: 'Tattoin' }

    })

    it('should fetchSpecies gets called expect fetchAnything to have been called', async () => {
      fetchHomeworld(mockPeople)
      expect(fetchAnything).toHaveBeenCalled()
    })

    it('should call fetchHomeworld and update mockPeople with the mockHomeworld data', async () => {
      fetchAnything.mockImplementation(() => Promise.resolve(mockHomeworld))

      const expected = [
        {
          name: "Luke",
          gender: "male",
          language: 'English',
          species: 'human',
          population: 20000,
          homeworld: 'Tattoin'
        },
        {
          name: "C-3PO",
          gender: "droid",
          language: 'English',
          species: 'human',
          population: 20000,
          homeworld: 'Tattoin'
        }
      ]

      const result = await fetchHomeworld(mockPeople)
      expect(result).toEqual(expected)

    })

  })

  describe('getAllPlanets', () => {
    let mockPlanets;
    let mockResidents;

    beforeEach(() => {

        mockPlanets = [
          {
            climate: "temperate",
            diameter: "12500",
            name: "Alderaan",
            population: "2000000000",
            residents: ["https://swapi.co/api/people/5/"]
          },
          {
            climate: "cold",
            diameter: "123124",
            name: "Hoth",
            population: "20",
            residents: ["https://swapi.co/api/people/1/"]
          }
        ]

        mockResidents = ['Leia Organa']
    })


    it('should when getAllPlanets is inoked it should call getResidents', () => {

      getAllPlanets(mockPlanets)
      expect(getResidents).toHaveBeenCalled()
    })

    it('should when getAllPlanets is called fetch mockResidents and update mockPlanets', async () => {

      getResidents.mockImplementation(() => Promise.resolve(mockResidents))

      const expected = [
        {
          climate: "temperate",
          diameter: "12500",
          name: "Alderaan",
          population: "2000000000",
          residents: ['Leia Organa']
        },
        {
          climate: "cold",
          diameter: "123124",
          name: "Hoth",
          population: "20",
          residents: ['Leia Organa']
        }
      ]

      const result = await getAllPlanets(mockPlanets)
      expect(result).toEqual(expected)
    })


  })

})
