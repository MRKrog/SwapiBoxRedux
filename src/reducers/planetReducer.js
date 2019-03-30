export const planetReducer = (state = [], action) => {
  switch(action.type) {
    case 'SAVE_PLANETS':
      return action.planets
    default:
      return state
  }
}
