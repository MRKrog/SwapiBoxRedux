export const movieReducer = (state = [], action) => {
  switch(action.type) {
    case 'SAVE_MOVIE':
      return action.info
    default:
      return state
  }
}
