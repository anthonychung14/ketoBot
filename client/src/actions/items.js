import axios from 'axios'
import fetch from 'isomorphic-fetch'

const baseURL = "http://localhost:8000"
const ketoBot = "/ketoBot"
const recipes = "/recipes"
const userDiet = "/users/diet"

const ES_URL = "http://localhost:9200"
const ES_REC = "/recipes/_search?q="

export const CREATE_GOAL = "CREATE_GOAL"
export const GET_RECIPES = "GET_RECIPES"
export const SEARCH_RECIPES = "SEARCH_RECIPES"


//NAV TO MODAL
export const OPEN_MODAL = "OPEN_MODAL"
export function openModal(element) {  
  return {
    type: OPEN_MODAL,
    payload: element || null
  }
}

export const REQUEST_NUTRITION = "REQUEST_NUTRITION"
export function requestNutrition() {
  return {
    type: REQUEST_NUTRITION,
    payload: request
  }
}

export const RECEIVE_NUTRITION = "RECEIVE_NUTRITION"
export function receiveNUTRITION(request, json) {
  return {
    type: RECEIVE_NUTRITION,
    request,
    nutrition: json,
    receivedAt: Date.now()
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

//DEFINE USER MACROS:
export const SELECT_MACROS = "SELECT_MACROS"
export function selectMacros (macros) {
  return {
    type: SELECT_MACROS,
    macros
  }
}

//COLLECT USER DATA
export function createDiet(props) {
  const request = axios.post(`${baseURL}${userDiet}`, props)
  alert("diet created!")
  return {
    type: CREATE_GOAL,
    payload: request
  }
}


//DEPRECATED

export function getRecipes() {  
  const request = axios.get(baseURL+ketoBot+recipes)
  return {
    type: GET_RECIPES,
    payload: request
  }
}

//ES Actions
export function searchRecipes(props) {
  const request = axios.get(`${ES_URL}${ES_REC}`+'"chicken"')  
  return {
    type: SEARCH_RECIPES,
    payload: request
  }
}
