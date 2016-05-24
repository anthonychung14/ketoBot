import fetch from 'isomorphic-fetch'
import moment from 'moment'

const baseURL = "http://localhost:8000"
const ketoBot = "/ketoBot/recipes"
const staples = "/ketoBot/staples"
const postPlan = "/fridge/makePlan"
import { formModal } from './items'

export const MAKE_MEAL_PLAN = "MAKE_MEAL_PLAN"
export function postFinalMealPlan(element) {    
  return (dispatch, getState) => {
    const mealPlan = getState().mealPlan;           
    const finalItems = {
      mealPlan, element
    }    
    
    //struct of finalObject
    let finalMeal = {
      calories: 0,
      fat: 0,
      protein: 0,
      carbs: 0,
      eaten: 0,
      date: moment().format('MMM D, YYYY'),      
    }
    //iterate the diff algo items first
    finalMeal['calories'] = element.calories
    finalMeal['protein'] = element.totals.protein
    finalMeal['fat'] = element.totals.fat
    finalMeal['carbs'] = element.totals.carbs

    //iterate over chosenRecipes 
    mealPlan.chosenRecipes.forEach((elem, key) => {
      finalMeal['calories'] += elem.recipe.nutrition.calories * mealPlan.servingMap[elem.recipe.nutrition.r]
      finalMeal['protein'] += elem.recipe.nutrition.protein * mealPlan.servingMap[elem.recipe.nutrition.r]
      finalMeal['fat'] += elem.recipe.nutrition.fat * mealPlan.servingMap[elem.recipe.nutrition.r]
      finalMeal['carbs'] += elem.recipe.nutrition.net_carb * mealPlan.servingMap[elem.recipe.nutrition.r]
    })

    //iterate over fridgeFill
    mealPlan.fridgeFill.forEach((elem, key) => {
      finalMeal['calories'] += elem.calories
      finalMeal['protein'] += elem.protein
      finalMeal['carbs'] += elem.carbs
      finalMeal['fat'] += elem.fat
    })


    //finalMeal macros/total/diff assembled.     
    
    //first iterate over the element to push all chosen Algo
    const algoFridgeItems = element.items.map((item, key) => {
      return {
        name: item.name,
        typeof: 'algoFridge',
        foreignKey: item.id,
        calories: item.fat*9 + item.protein*4 + item.carbs*4,
        fat: item.fat,
        protein: item.protein,
        carbs: item.carbs,
        servings: item.servings,
        eaten: false
      }
    })

    //iterate over chosenRecipes
    //chosenRecipes with servingMap

    const chosenMealItems = mealPlan.chosenRecipes.map((item, key) => {
      const recipe = item.recipe
      return {
        name: recipe.recipe.title,
        typeof: 'userStaple',        
        foreignKey: recipe.recipe.id,
        calories: recipe.nutrition.calories,
        fat: recipe.nutrition.fat,
        protein: recipe.nutrition.protein,
        carbs: recipe.nutrition.net_carb, 
        servings: mealPlan.servingMap[recipe.recipe.id],
        eaten: false
      }
    })

    //iterate over fridge fill
    //fridgeFill with fridgeServings 
    const fridgeFillItems = mealPlan.fridgeFill.map((item, key) => {
      return {
        name: item.name,
        typeof: 'userFridge',
        foreignKey: item.id,
        calories: item.calories,
        fat: item.fat,
        protein: item.protein,
        carbs: item.carbs,
        servings: mealPlan.fridgeServings[item.id],
        eaten: false
      }
    })

    const finalItem = {
      finalMeal,
      finalMealItems: algoFridgeItems.concat(fridgeFillItems, chosenMealItems)      
    }

    console.log(finalItem['finalMealItems'], "are carbs here")
    
    const request = fetch(`${baseURL}${postPlan}`, {    
      method: 'POST',    
      headers: {
        'content-type': "application/json"      
      },
      body: JSON.stringify(finalItem)
      })
  
  return {
    type: MAKE_MEAL_PLAN,
    payload: finalMeal
    }
  }
}


export function createStaple(props, ingredData) {       
  //Convenience hash
  let foodHash = props.ingredient.reduce((prev, current) => {
    prev[current.name] = Number(current.servings)
    return prev
  }, {})

  //Create nutrition object
  let startNutrition = {
    calories: null,
    protein: null,
    fat: null,
    net_carb: null
  }

  const ingredCopy = ingredData.slice()
  let ingredServings = ingredCopy.map((element) => {              
    return Object.assign({}, element, {
      'servings': foodHash[element.name]      
    })        
  })

  //TODO: Refactor function to be less ugly
  //Calculates total nutrition based on serving
  let stapleNutrition = ingredServings.reduce((prev, current) => {
    if (!prev['calories']) {
      prev['calories'] = current['calories'] * current['servings']
      prev['protein'] = current['protein'] * current['servings']
      prev['fat'] = current['fat'] * current['servings']
      prev['net_carb'] = current['carbs'] * current['servings']
    } else {
      prev['calories'] += current['calories'] * current['servings']
      prev['protein'] += current['protein'] * current['servings']
      prev['fat'] += current['fat'] * current['servings']
      prev['net_carb'] += current['carbs'] * current['servings']    
    }
    return prev;
  }, startNutrition)

  //Assemble one large object to send home

  let recData = {
    title: props.stapleTitle,
    staple: true,
    date: moment().format('MMM D, YYYY'),
    image: [],
    time: "Lunch"
  }

  //recipe information
  const finalStaple = {
    recipe: recData,
    ingreds: ingredServings,
    nutrition: stapleNutrition
  }

  return function(dispatch) {
    dispatch(postStaple(finalStaple))  
  }
}

export const POST_STAPLE = "POST_STAPLE"
export function postStaple(finalStaple) {  
  const request = fetch(`${baseURL}${ketoBot}`, {    
    method: 'POST',    
    headers: {
      'content-type': "application/json"      
    },
    body: JSON.stringify(finalStaple)
  })
  return {
    type: POST_STAPLE,
    payload: finalStaple
  }
}

//GET STAPLES FROM PSQL
export const REQUEST_STAPLES = "REQUEST_STAPLES"
export function requestStaples(request) {
  return {
    type: REQUEST_STAPLES,
    payload: request
  }
}

export const RECEIVE_STAPLES = "RECEIVE_STAPLES"
export function receiveStaples(request, json) {
  //some logic to merge stapleData/ingredients/nutrients into one object

  let nutriJSON = {};
  json.stapleNutrition.forEach((element, index) => {
     nutriJSON[element.r] = element
  })

  let ingredJSON = {};
  json.stapleIngredients.forEach((element, index) => {     
     if (ingredJSON[element.r]) {
        ingredJSON[element.r].push(element)
     } else {
        ingredJSON[element.r] = [element]
     }     
  })

  let finalStaple = json.stapleData.map((element) => {
    let final = {}
    final['recipe'] = element
    final['nutrition'] = nutriJSON[element.id]
    final['ingreds'] = ingredJSON[element.id]
    return final
  })

  return {
    type: RECEIVE_STAPLES,
    request,
    stapleData: finalStaple
  }
}

export function fetchStaples(request) {
  return function(dispatch) {
    dispatch(requestStaples(request))    
    return fetch(baseURL+staples)
      .then(response => response.json())
      .then(json => dispatch(receiveStaples(request, json))
    )
  }
}
  
