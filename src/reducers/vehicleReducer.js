export const vehicleReducer = (state = [], action) => {
  switch(action.type) {
    case 'SAVE_VEHICLES':
      return action.vehicles
    default:
      return state
  }
}
