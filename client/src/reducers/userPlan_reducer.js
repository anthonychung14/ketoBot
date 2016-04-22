import { REQUEST_PLAN, RECEIVE_PLAN } from '../actions/userPlan'

const initialState = {
  isFetching: false,
  userPlan: {}
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
    default:
      return state;
  }
}