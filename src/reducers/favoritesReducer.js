export const favoritesReducer = (state = 0, action) => {
  switch(action.type) {
    case 'UPDATE_COUNT':
      return action.favorites
    default:
      return state
  }
}
