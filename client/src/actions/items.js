import axios from 'axios'
import fetch from 'isomorphic-fetch'

const baseURL = "http://localhost:8000"
const ketoBot = "/ketoBot"
const recipes = "/recipes"

const recipe_nutrition = "/nutrition"

export { fetchFridge } from './fridgeActions'

export const GET_RECIPES = "GET_RECIPES"


export const CALC_REMAIN = "CALC_REMAIN"
export function calcRemain(recipesArray) {
  return {
    type: CALC_REMAIN,
    payload: newAmount
  }
}

export function addAndCalc() {
  return function(dispatch, getState) {
    // dispatch(addStaplePlan())
    let chosenRecs = getState().mealPlan
    let userPlan = getState().userPlan.userPlan

    console.log(chosenRecs, userPlan, "DO THESE WORK")
    // dispatch(calcRemain(mealPlan))
  }  
}

export const ADD_STAPLEPLAN = "ADD_STAPLEPLAN"
export function addStaplePlan(element, chosenServings) {      
  var addedRecipe = Object.assign({}, {
    recipe: element,
    servings: chosenServings
  })
  return {
    type: ADD_STAPLEPLAN,
    payload: addedRecipe
  }
}

// ASYNC //

//GET NUTRITIONAL INFO
export const REQUEST_NUTRITION = "REQUEST_NUTRITION"
export function requestNutrition(request) {
  return {
    type: REQUEST_NUTRITION,
    payload: request
  }
}

export const RECEIVE_NUTRITION = "RECEIVE_NUTRITION"
export function receiveNutrition(request, json) {  
  let nutriJSON = {};
  json.nutrition.forEach((element, index) => {
     nutriJSON[element.r] = element
  })

  let ingredJSON = {};
  json.ingredients.forEach((element, index) => {     
     if (ingredJSON[element.r]) {
        ingredJSON[element.r].push(element)
     } else {
        ingredJSON[element.r] = [element]
     }     
  })
  
  return {
    type: RECEIVE_NUTRITION,    
    request,
    nutrition: nutriJSON,
    ingredients: ingredJSON,
  }
}

export function fetchNutrition(request) {
  return function(dispatch) {
    dispatch(requestNutrition(request))            
    let url = new URL(baseURL+ketoBot+recipe_nutrition)
    url.search = "ids="
    request.forEach(id => url.search += id+",")
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveNutrition(request, json))
      }
    )
  }
}

//GET RECIPES FROM PSQL
export const REQUEST_RECIPES = "REQUEST_RECIPES"
export function requestRecipes(request) {
  return {
    type: REQUEST_RECIPES,
    payload: request
  }
}

export const RECEIVE_RECIPES = "RECEIVE_RECIPES"
export function receiveRecipes(request, json) {
  return {
    type: RECEIVE_RECIPES,
    request,
    recipes: json,
  }
}

export function fetchRecipes(request) {
  return function(dispatch) {
    dispatch(requestRecipes(request))    
    return fetch(baseURL+ketoBot+recipes)
      .then(response => response.json())          
      .then(json => dispatch(receiveRecipes(request, json))      
    )
  }
}

