import axios from 'axios'
import fetch from 'isomorphic-fetch'

const baseURL = "http://localhost:8000"
const ketoBot = "/ketoBot"
const recipes = "/recipes"
const recipe_nutrition = "/nutrition"

export const GET_RECIPES = "GET_RECIPES"

//NAV TO MODAL
export const OPEN_MODAL = "OPEN_MODAL"
export function openModal(element, nutrition) {  
  let recipeInfo = {}
  if (element) {
    recipeInfo = { recipe: element, nutrition }
  }
  return {
    type: OPEN_MODAL,
    payload: recipeInfo
  }
}

//REQUEST NUTRITIONAL INFO
export const REQUEST_NUTRITION = "REQUEST_NUTRITION"
export function requestNutrition(request) {
  return {
    type: REQUEST_NUTRITION,
    payload: request
  }
}

export const RECEIVE_NUTRITION = "RECEIVE_NUTRITION"
export function receiveNutrition(request, json) {  
  let newJSON = {};
  json.forEach((element, index) => {
     newJSON[element.r] = element
  })
  return {
    type: RECEIVE_NUTRITION,    
    request,
    nutrition: newJSON,
    receivedAt: Date.now()
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
    //TODO: error handling
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
    receivedAt: Date.now()
  }
}

export function fetchRecipes(request) {
  return function(dispatch) {
    dispatch(requestRecipes(request))    
    return fetch(baseURL+ketoBot+recipes)
      .then(response => response.json())
      .then(json => dispatch(receiveRecipes(request, json))
    )
    //TODO: error handling
  }
}
