import { REQUEST_FRIDGE, RECEIVE_FRIDGE, ADD_FRIDGE, START_FSEARCH, RECEIVE_FSEARCH } from '../actions/fridgeActions'

const initialState = {
  fridgeItems: [],
  searchTerms: [],
  recipes: [],
  isFetching: false,
  isSearching: false
}

export function fridge(state = initialState, action) {
  switch(action.type) {
    case REQUEST_FRIDGE:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_FRIDGE:
      return Object.assign({}, state, {
        isFetching: false,
        fridgeItems: action.fridgeItems
      })

//TODO: Make this a set. Not an array
    case ADD_FRIDGE:            
      return Object.assign({}, state, {
        searchTerms: state.searchTerms.concat(action.payload)
      })
    case START_FSEARCH:
      return Object.assign({}, state, {
        isSearching: true
      })
    case RECEIVE_FSEARCH:
      return Object.assign({}, state, {
        isSearching: false,
        recipes: action.recipes
      })
    default:
      return state;
  }
}