import fetch from 'isomorphic-fetch'
import axios from 'axios'

const baseURL = "http://localhost:8000"
const ketoBot = "/ketoBot"
const recipeSearch = "/recipes/search"

//ELASTICSEARCH
export const SEARCH_RECIPES = "SEARCH_RECIPES"
export function searchRecipes(props) {  
  return {
    type: SEARCH_RECIPES,
    payload: props
  }
}

export const RECEIVE_SEARCH = "RECEIVE_SEARCH"
export function receiveSearch(request, json) {
  return {
    type: RECEIVE_SEARCH,
    request,
    results: json    
  }
}

export function retrieveSearch(formProps) {
  return function(dispatch) {
    dispatch(searchRecipes(formProps))
    return axios.post(baseURL+ketoBot+recipeSearch, {       
       headers: {
        'content-type': "application/json"
      },
      data: JSON.stringify(formProps)     
    })
    .then(results => {
        let searchRecipe = results.data.searchRecipe
        let searchNutrition = results.data.searchNutrition
        let mergedRecipe = searchRecipe.map((element) => {
           let found;
           searchNutrition.forEach((match) => {
              if(match['r'] === element['id']) {
                found = match
            }
           })
          return Object.assign({}, element, found)   
        })
        dispatch(receiveSearch(formProps, mergedRecipe))
    })       
  }
}