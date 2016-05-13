import { REQUEST_ALGO, RECEIVE_ALGO } from '../actions/ketoMagicMealActions'

const initialState = { 
  mealPlanArray: [],
  chosenMealPlan: [],
  isProcessing: false
}

export function ketoMealPlan(state=initialState, action) {
  switch (action.type) {
    case REQUEST_ALGO:
      return Object.assign({}, state, {
        isProcessing: true
      })
    case RECEIVE_ALGO:
      return Object.assign({}, state, {
        isFetching: false,
        mealPlanArray: action.algoMeal
    })
    default:
      return state
  }
}