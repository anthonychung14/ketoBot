import { SEARCH_RECIPES } from '../actions/items'

const initialState = {
  searchTerm: "",
  searchResults: []
}

export function search(state = initialState, action) {
  switch(action.type) {
    case SEARCH_RECIPES:
      return {
        ...state,
        searchResults: action.payload.data
      }
    default:
      return state
  }
}