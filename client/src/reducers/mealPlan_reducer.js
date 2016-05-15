import { ADD_RECPLAN, ADD_STAPLEPLAN, ADD_FILLERPLAN, SUBTRACT_FILLERPLAN } from '../actions/items'
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
      
    case SUBTRACT_FILLERPLAN:
      console.log(action.payload, "payload")
      var recipeOut = action.payload
      var fridgeCopy = state.fridgeFill.slice()
      var indexRecipe = fridgeCopy.indexOf(recipeOut)      
      var servings = state.fridgeServings[recipeOut.id]

      var servingMap = Object.assign({}, state.fridgeServings, {
        [recipeOut.id]:  servings - 1      
      })

      if (servingMap[recipeOut.id] === 0){
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
      newMap[recipeId] = Number(action.payload.servings)

      return Object.assign({}, state, {
        chosenRecipes: newRecArray,
        servingMap: newMap
      })
    default:
      return state
  }
}        