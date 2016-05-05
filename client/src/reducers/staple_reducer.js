import { REQUEST_STAPLES, RECEIVE_STAPLES, POST_STAPLE } from '../actions/createMealPlan'


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
    case POST_STAPLE:
      console.log(action.payload, "action from post staple")
      return Object.assign({}, state, {
        stapleData: state.stapleData.concat(action.payload)
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