import { REQUEST_PLAN, RECEIVE_PLAN, REQUEST_MEAL_PLAN, RECEIVE_MEAL_PLAN } from '../actions/userPlan'

const initialState = {
  isSearching: false,  
  userPlan: {},
  isFetching: false,
  chosenMealPlans: []
}

export function userPlan(state = initialState, action) {
  switch(action.type) {
    case REQUEST_PLAN:
      return Object.assign({}, state, {
        isSearching: true
      })
    case RECEIVE_PLAN:
      return Object.assign({}, state, {
        isSearching: false,
        userPlan: action.userPlan
      })
    case REQUEST_MEAL_PLAN:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_MEAL_PLAN:
      return Object.assign({}, state, {
        isFetching: false,
        chosenMealPlans: action.mealPlans
      })
    default:
      return state;
  }
}