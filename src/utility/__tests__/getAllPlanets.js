import { fetchAnything } from '../fetchAnything';
import { getResidents } from '../fetchResidents';

jest.mock('../fetchAnything.js')

describe('getResidents', () => {
  let mockUrl;
  let mockResident;

  beforeEach(() => {
    mockUrl = ["https://swapi.co/api/people/5/"]
    mockResident = { name: "Leia Organa" }

  })

  it('should invoke fetchAnything when getResidents is called', () => {
    getResidents(mockUrl)
    expect(fetchAnything).toHaveBeenCalled()
  })

  it('should when return the mockResidents name when getResidents is invoked', async () => {
    fetchAnything.mockImplementationOnce(() => Promise.resolve(mockResident))

    const expected = ["Leia Organa"]
    const result = await getResidents(mockUrl);

    expect(result).toEqual(expected)
  })

})
