import { ADD_RECPLAN, ADD_STAPLEPLAN } from '../actions/items'

const initialState = {
  chosenRecipes: [],
  fridgeFill: []
}

export function mealPlan(state=initialState, action) {
  switch(action.type) {
    case ADD_RECPLAN:
      return Object.assign({}, state, {
        chosenRecipes: state.chosenRecipes.concat(action.payload)
      })
    case ADD_STAPLEPLAN:
      return Object.assign({}, state, {
        chosenRecipes: state.chosenRecipes.concat(action.payload)
      })
    default:
      return state
  }
}