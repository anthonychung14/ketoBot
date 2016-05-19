import { ADD_RECPLAN, ADD_STAPLEPLAN, SUBTRACT_STAPLEPLAN, ADD_FILLERPLAN, SUBTRACT_FILLERPLAN } from '../actions/items'
import { HIDE_PLAN_MODAL } from '../actions/modalActions'

const initialState = {
  chosenRecipes: [],
  fridgeFill: [],
  fridgeServings: {},
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
    case SUBTRACT_STAPLEPLAN:      
      var recipeOut = action.payload
      var stapleCopy = state.chosenRecipes.slice()
      var indexRecipe = stapleCopy.indexOf(recipeOut)      
      var servings = state.servingMap[recipeOut.recipe.id]
      
      var servingMap = Object.assign({}, state.servingMap, {
        [recipeOut.recipe.id]: servings - 1      
      })      

      if (servingMap[recipeOut.recipe.id] === 0) {
        stapleCopy.splice(indexRecipe, 1)  
        delete servingMap[recipeOut.recipe.id]
      }

      return Object.assign({}, state, {
        chosenRecipes: stapleCopy,
        servingMap: servingMap
      })
      
    case SUBTRACT_FILLERPLAN:
      var recipeOut = action.payload
      var fridgeCopy = state.chosenRecipes.slice()
      var indexRecipe = fridgeCopy.indexOf(recipeOut)      
      var servings = state.fridgeServings[recipeOut.id]

      var servingMap = Object.assign({}, state.fridgeServings, {
        [recipeOut.id]:  servings - 1      
      })

      if (servingMap[recipeOut.id] === 0) {
        fridgeCopy.splice(indexRecipe, 1)  
        delete servingMap[recipeOut.id]
      }
      
      return Object.assign({}, state, {
        fridgeFill: fridgeCopy,
        fridgeServings: servingMap
      })
    case ADD_FILLERPLAN:      
      var recipe = action.payload.recipe
      var servings = Number(action.payload.servings)
      var id = recipe.id
      var newMap;
      
      if (state.fridgeServings[id]) {
        newMap = Object.assign({}, state.fridgeServings, {
          [id]: state.fridgeServings[id] + servings
        })
        return Object.assign({}, state, {
          fridgeFill: state.fridgeFill.slice(),
          fridgeServings: newMap
        })
      }
      
      else {
        newMap = Object.assign({}, state.fridgeServings, {
          [id]: servings
        })
        return Object.assign({}, state, {
          fridgeFill: state.fridgeFill.concat(recipe),
          fridgeServings: newMap
        })
      }

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
      if (newMap[recipeId]) {
        newMap[recipeId] += Number(action.payload.servings)
      } else {
        newMap[recipeId] = Number(action.payload.servings)
      }

      return Object.assign({}, state, {
        chosenRecipes: newRecArray,
        servingMap: newMap
      })
    default:
      return state
  }
}        