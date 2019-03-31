import { fetchAnything } from './fetchAnything';

export const getResidents = async (data) => {
  const residents = data.map(async resident => {
    const response = await fetchAnything(resident)
    const result = response.name
    return result
  })
  return Promise.all(residents)
}
