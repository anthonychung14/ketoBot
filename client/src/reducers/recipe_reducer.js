import { REQUEST_RECIPES, RECEIVE_RECIPES, REQUEST_NUTRITION, RECEIVE_NUTRITION, SELECT_MACROS } from '../actions/items'

const initialState = {
  isFetching: false,
  all: []  
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

const nutritionState = {
  isFetching: false,
  nutrition: {},
  ingredients: {}
}

export function nutrition(state = nutritionState, action) {
  switch(action.type) {
    case REQUEST_NUTRITION:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_NUTRITION:
      return Object.assign({}, state, {
        isFetching: false,
        nutrition: action.nutrition,
        ingredients: action.ingredients
      })
    default:
      return state;
  }
}

export function recipesUser(state={}, action) {
  switch(action.type) {    
    case RECEIVE_RECIPES:
    case REQUEST_RECIPES:
      return Object.assign({}, state, {
        recipes: recipes(state[action.recipes], action)
      })
    case RECEIVE_NUTRITION:
    case REQUEST_NUTRITION:      
      return Object.assign({}, state, {
        recData: nutrition(state[action.recData], action),        
      })        
    default:
      return state
  }
}


// Remember what spread does? Figure it out
// case GET_RECIPES:
//   return {
//     ...state,
//     all: action.payload.data
// }
// export function selectMacros(state = 'Anthony', action) {
//   switch(action.type) {
//     case SELECT_MACROS:
//       return action.macros
//     default:
//       return state
//   }
// }
