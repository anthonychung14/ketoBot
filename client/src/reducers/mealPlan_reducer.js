import { ADD_RECPLAN, ADD_STAPLEPLAN } from '../actions/items'
import { HIDE_PLAN_MODAL } from '../actions/modalActions'

const initialState = {
  chosenRecipes: [],
  fridgeFill: [],
  servingMap: {}
}

export function mealPlan(state=initialState, action) {
  switch(action.type) {
    case ADD_RECPLAN:      
      return Object.assign({}, state, {
        chosenRecipes: state.chosenRecipes.concat(action.payload),
        servingMap: 1        
      })

    case HIDE_PLAN_MODAL:
      var recipes = state.chosenRecipes.slice()
      var lastChosen = recipes.pop()      
      var idDelete = lastChosen.recipe.recipe.id
      var newMap = {...state.servingMap}
      delete(newMap[idDelete])

      return Object.assign({}, state, {
        chosenRecipes: recipes,
        servingMap: newMap
      })    

    case ADD_STAPLEPLAN:      
      var pickedRecipe = action.payload
      var recipeInfo = pickedRecipe.recipe      
      var recipeId = recipeInfo.recipe["id"]
      var newRecArray;
      if (state.servingMap[recipeId]) {
        newRecArray = state.chosenRecipes.slice()  
      } else {
        newRecArray = state.chosenRecipes.concat(pickedRecipe)
      }

      var newMap = Object.assign({}, state.servingMap)
      newMap[recipeId] = Number(action.payload.servings)

      return Object.assign({}, state, {
        chosenRecipes: newRecArray,
        servingMap: newMap
      })
    default:
      return state
  }
}
        // servingMap: Object.assign({}, state.servingMap, {
        //   recipeInfo.id: servingMap
        // })