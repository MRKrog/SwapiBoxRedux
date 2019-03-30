export const peopleReducer = (state = [], action) => {
  switch(action.type) {
    case 'SAVE_PEOPLE':
      return action.people
    default:
      return state
  }
}
