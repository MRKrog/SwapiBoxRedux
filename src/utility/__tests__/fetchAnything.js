import { fetchAnything } from '../fetchAnything';

describe('fetchAnything', () => {
  let mockUrl;
  let mockMovie;

  beforeEach(() => {
    mockUrl = 'www.starwarsapi.com';
    mockMovie = {
      title: 'Return of Jedi',
      release_date: '12-12-2010',
      rating: 100
    }
    fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockMovie)
    }))
  })

  it('should call fetchAnything with supplied url', () => {
    fetchAnything(mockUrl)
    expect(fetch).toHaveBeenCalledWith(mockUrl)
  })

  it('should call fetchAnything and return the correct mockMovie', async () => {
    const result = await fetchAnything(mockUrl)
    expect(result).toEqual(mockMovie)
  })

  it('should throw the correct error Bad Inital Fetch Request at url', async () => {
   fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
      ok: false
    }))

    try {
      await fetchAnything(mockUrl)
    } catch (error) {
      expect(error.message).toBe("Bad Initial Fetch Request at www.starwarsapi.com")
    }
  })

})
