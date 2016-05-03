import { REQUEST_STAPLES, RECEIVE_STAPLES } from '../actions/createMealPlan'


export const initialState = {
  stapleData: [],  
  isFetching: false
}

export function staples(state = initialState, action) {
  switch(action.type) {
    case REQUEST_STAPLES:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_STAPLES:
      return Object.assign({}, state, {
        isFetching: false,
        stapleData: action.stapleData        
      })
    default:
      return state
  }
}