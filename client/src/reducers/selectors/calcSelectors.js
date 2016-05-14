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

export const calcFillerSelector = createSelector(
  fridgeFillers, fridgeMap, (food, servings) => {
    food.reduce((acc, recipe) => {
      acc['Protein'] += recipe.protein * servings[recipe.id]
      acc['Fat'] += recipe.fat * servings[recipe.id]
      acc['Carbs'] += (recipe.carbs - recipe.fiber) * servings[recipe.id]
      acc['Calories'] += recipe.calories * servings[recipe.id]
      return acc
    }, {})
  }
)

export const calcTotalSelector = createSelector(  
  mealPlan, calcFillerSelector, (recipes, filler) => {    
    let newMacros = Object.assign({}, startMacros)
    recipes.chosenRecipes.reduce((acc, recipe) => {    
      for (var key in startMacros) {
        acc[key] += recipe.recipe.nutrition[key] * recipes.servingMap[recipe.recipe.recipe.id]
      }
      return acc;
    }, newMacros)

    let processedMacros = {
      'Info': 'Totals',
      'Protein': newMacros.protein,
      'Carbs': newMacros.net_carb,
      'Fat': newMacros.fat,
      'Calories': newMacros.calories
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
  

export const calcPercent = createSelector(
  calcTotalSelector, userMacros, (calcTotal, userMacs) => {
    return calcTotal.Calories/userMacs.userPlan.calories
  }
)

  //   Object.assign({}, macros, {
  //     macros.userPlan['protein']: macros.userPlan['protein'] - chosenTotals['protein'],
  //     macros.userPlan['fat']: macros.userPlan['fat'] - chosenTotals['fat'],
  //     macros.userPlan['net_carb']: macros.userPlan['net_carb'] - chosenTotals['net_carb'],
  //     macros.userPlan['calories']: macros.userPlan['calories'] - chosenTotals['calories']
  // })