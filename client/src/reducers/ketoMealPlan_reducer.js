import { REQUEST_ALGO, RECEIVE_ALGO } from '../actions/ketoMagicMealActions'
import { OPEN_MODAL } from 'actions/modalActions'

const initialState = { 
  mealPlanArray: [],
  chosenMealPlan: [],
  isProcessing: false
}

export function ketoMealPlan(state=initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return Object.assign({}, state, {
        mealPlanArray: []
      })
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