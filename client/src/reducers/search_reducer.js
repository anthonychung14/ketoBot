import { SEARCH_RECIPES, RECEIVE_SEARCH } from '../actions/searchRecipes'

const initialState = {
  isSearching: false,
  searchResults: []
}

export function search(state = initialState, action) {
  switch(action.type) {
    case SEARCH_RECIPES:
      return Object.assign({}, state, {
        isSearching: true
      })
    
    case RECEIVE_SEARCH:
      return Object.assign({}, state, {
        isSearching: false,
        searchResults: action.results
      })
    default:
      return state;
  }
}