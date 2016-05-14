import { createSelector } from 'reselect';

const mealPlan = (state) => state.mealPlan
const userMacros = (state) => state.userPlan

const startMacros = {
  protein: 0,
  fat: 0,
  net_carb: 0,
  calories: 0
}

export const calcTotalSelector = createSelector(
  mealPlan, recipes => recipes.chosenRecipes.reduce((acc, recipe) => {    
    for (var key in startMacros) {
      acc[key] += recipe.recipe.nutrition[key] * recipes.servingMap[recipe.recipe.recipe.id]
    }
    return acc;
  }, startMacros)
)


// //TURNING CARB INTO NETCARB
// export const calcRemaining = createSelector(  
//   userMacros, calcTotalSelector, (macros, chosenTotals) => 
//     Object.keys(chosenTotals).reduce((acc, key) => {     
//       if (key === 'net_carb') {
//         acc['carbs'] = macros.userPlan['carbs'] - chosenTotals.net_carb
//         console.log("carb")
//       } else {
//         acc[key] = macros.userPlan[key] - chosenTotals[key]        
//       }
//       return acc      
//     }, {})
// )
  

export const calcPercent = createSelector(


)

  //   Object.assign({}, macros, {
  //     macros.userPlan['protein']: macros.userPlan['protein'] - chosenTotals['protein'],
  //     macros.userPlan['fat']: macros.userPlan['fat'] - chosenTotals['fat'],
  //     macros.userPlan['net_carb']: macros.userPlan['net_carb'] - chosenTotals['net_carb'],
  //     macros.userPlan['calories']: macros.userPlan['calories'] - chosenTotals['calories']
  // })