import { REQUEST_RECIPES, RECEIVE_RECIPES, SELECT_MACROS } from '../actions/items'

const initialState = {
  isFetching: false,
  all: [],
  one: []
}

export function selectMacros(state = 'Anthony', action) {
  switch(action.type) {
    case SELECT_MACROS:
      return action.macros
    default:
      return state
  }
}

export function recipes(state = initialState, action) {
  switch(action.type) {
    case REQUEST_RECIPES:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_RECIPES:
      return Object.assign({}, state, {
        isFetching: false,
        all: action.recipes
      })
    default:
      return state;
  }
}


export function recipesUser(state={}, action) {
  switch(action.type) {
    case SELECT_MACROS:
    case "RECEIVE_RECIPES":
    case REQUEST_RECIPES:
      return Object.assign({}, state, {
        //Not sure about this line...
        macros: recipes(state[action.macros], action)
      })
    default:
      return state
  }
}


    // case GET_RECIPES:
    //   return {
    //     ...state,
    //     all: action.payload.data
    // }
