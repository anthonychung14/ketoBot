import { createSelector } from 'reselect';

const mealPlan = (state) => state.mealPlan
const userMacros = (state) => state.userPlan

const fridgeFillers = (state) => state.mealPlan.fridgeFill
const fridgeMap = (state) => state.mealPlan.fridgeServings

const startMacros = {
  protein: 0,
  fat: 0,
  net_carb: 0,
  calories: 0
}

const startTotals = {
  "Info": "Totals",
  "Protein": 0,
  "Fat": 0,
  "Carbs": 0,
  "Calories": 0  
}

export const calcFillerSelector = createSelector(
  fridgeFillers, fridgeMap, (food, servings) => {    
    let startMacros = Object.assign({}, startTotals)
    return food.reduce((acc, recipe) => {
      acc['Protein'] += recipe.protein * servings[recipe.id]
      acc['Fat'] += recipe.fat * servings[recipe.id]
      acc['Carbs'] += (recipe.carbs - recipe.fiber) * servings[recipe.id]
      acc['Calories'] += recipe.calories * servings[recipe.id]
      return acc
    }, startMacros)
  }
)

export const calcTotalSelector = createSelector(  
  mealPlan, calcFillerSelector, (recipes, filler) => {    
    if (!filler) {
      let filler = Object.assign({}, {
        "Protein": 0,
        "Fat": 0,
        "Carbs": 0,
        "Calories": 0
      })
    }

    let newMacros = Object.assign({}, startMacros)
    recipes.chosenRecipes.reduce((acc, recipe) => {    
      for (var key in startMacros) {
        acc[key] += recipe.recipe.nutrition[key] * recipes.servingMap[recipe.recipe.recipe.id]
      }
      return acc;
    }, newMacros)

    let processedMacros = {
      'Info': 'Totals',
      'Protein': newMacros.protein + filler.Protein,
      'Carbs': newMacros.net_carb + filler.Carbs,
      'Fat': newMacros.fat + filler.Fat,
      'Calories': newMacros.calories + filler.Calories
    }
    return processedMacros
  }
)

export const calcRemaining = createSelector(  
  userMacros, calcTotalSelector, (macros, chosenTotals) => {
    //take chosenMacros and subtract all of the userMacros from it
    let totals = Object.assign({}, chosenTotals)
    totals['Protein'] = macros.userPlan['protein'] - chosenTotals['Protein']
    totals['Carbs'] = macros.userPlan['carbs'] - chosenTotals['Carbs']
    totals['Fat'] = macros.userPlan['fat'] - chosenTotals['Fat']
    totals['Calories'] = macros.userPlan['calories'] - chosenTotals['Calories']
    totals['Info'] = 'Remaining'
    return totals
  }
)
  
export const calcPercentCal = createSelector(  
  calcTotalSelector, userMacros, (calcTotal, userMacs) => {
    return calcTotal.Calories/userMacs.userPlan.calories
  }
)

export const calcPercentPro = createSelector(  
  calcTotalSelector, userMacros, (calcTotal, userMacs) => {
    return calcTotal.Protein/userMacs.userPlan.protein
  }
)

export const calcPercentFat = createSelector(  
  calcTotalSelector, userMacros, (calcTotal, userMacs) => {
    return calcTotal.Fat/userMacs.userPlan.fat
  }
)

export const calcPercentCarb = createSelector(  
  calcTotalSelector, userMacros, (calcTotal, userMacs) => {
    return calcTotal.Carbs/userMacs.userPlan.carbs
  }
)