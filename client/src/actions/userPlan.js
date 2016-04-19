import fetch from 'isomorphic-fetch'
import axios from 'axios'

const baseURL = "http://localhost:8000"
const userPlan = "/users/plan"
const ketoBot = "/ketoBot"
const recipeSearch = "/recipes/search"

const ES_URL = "http://localhost:9200"
const ES_REC = "/recipes/_search?q="


///POST USER PLAN
export const POST_PLAN = "POST_PLAN"
export function postPlan(props) {  
  const request = axios({
    url: `${baseURL}${userPlan}`,
    method: 'POST',    
    headers: {
      'content-type': "application/json"      
    },
    data: JSON.stringify(props)
  })
  return {
    type: POST_PLAN,
    payload: request
  }
}

export function postProcess(request) {
  return function(dispatch) {
    dispatch(postPlan(request))      
    dispatch(searchRecipes(request))      
  }
}

//TODO:
  //1. do one more GET from DJANGO based on that
    //2. when receive IDs, GET DJANGO
    //3. when finish, navigate and render them

//ES Actions
export const SEARCH_RECIPES = "SEARCH_RECIPES"
export function searchRecipes(props) {  
  return {
    type: SEARCH_RECIPES,
    payload: request
  }
}

export function receieveSearch(request, json) {
  return {
    type: RECEIVE_SEARCH,
    request,
    results: json    
  }
}

// const request = axios({
//   url: `${baseURL}${ketoBot}${recipeSearch}`,
//   method: 'POST',
//   headers: {
//     'content-type': "application/json"      
//   },
//   data: JSON.stringify(props)     
// })  

export const RETRIEVE_SEARCH = "RETRIEVE_SEARCH"
export function retrieveSearch(formProps) {
  return function(dispatch) {
    dispatch(SEARCH_RECIPES(formProps))
    return fetch()
      .then(results => console.log(results, "here are results"))
  }
}

