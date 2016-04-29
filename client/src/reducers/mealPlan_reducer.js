import { ADD_RECPLAN } from '../actions/items'

const initialState = {
  chosenRecipe: {},
  chosenStaple: {},
  fridgeFill: []
}

export function mealPlan(state=initialState, action) {
  switch(action.type) {
    case ADD_RECPLAN:
      return Object.assign({}, state, {
        chosenRecipe: action.payload
      })
    default:
      return state
  }
}