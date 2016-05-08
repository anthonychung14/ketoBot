import { ADD_RECPLAN, ADD_STAPLEPLAN } from '../actions/items'

const initialState = {
  chosenRecipes: [],
  fridgeFill: [],
  servingMap: {}
}

export function mealPlan(state=initialState, action) {
  console.log("adding stapleplan", action.type)
  switch(action.type) {
    case ADD_RECPLAN:      
      return Object.assign({}, state, {
        chosenRecipes: state.chosenRecipes.concat(action.payload),
        servingMap: 1        
      })
    case ADD_STAPLEPLAN:      
      var pickedRecipe = action.payload
      var recipeInfo = pickedRecipe.recipe      
      var recipeId = recipeInfo.recipe["id"]
      var newMap = Object.assign({}, state.servingMap)
      newMap[recipeId] = action.payload.servings
      
      return Object.assign({}, state, {
        chosenRecipes: state.chosenRecipes.concat(pickedRecipe),
        servingMap: newMap
      })
    default:
      return state
  }
}
        // servingMap: Object.assign({}, state.servingMap, {
        //   recipeInfo.id: servingMap
        // })