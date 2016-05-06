import { ADD_RECPLAN, ADD_STAPLEPLAN } from '../actions/items'

const initialState = {
  chosenRecipes: [],
  fridgeFill: [],
  servingMap: {}
}

export function mealPlan(state=initialState, action) {
  switch(action.type) {
    case ADD_RECPLAN:      
      return Object.assign({}, state, {
        chosenRecipes: state.chosenRecipes.concat(action.payload)        
      })
    case ADD_STAPLEPLAN:      
      var pickedRecipe = action.payload
      var recipeInfo = pickedRecipe.recipe
      return Object.assign({}, state, {
        chosenRecipes: state.chosenRecipes.concat(pickedRecipe),
        servingMap: {}
      })
    default:
      return state
  }
}
        // servingMap: Object.assign({}, state.servingMap, {
        //   recipeInfo.id: servingMap
        // })