import fetch from 'isomorphic-fetch'
import axios from 'axios'

import { retrieveSearch } from './searchRecipes'

const baseURL = "http://localhost:8000"
const userPlan = "/users/plan"
const ketoBot = "/ketoBot"
const recipeSearch = "/recipes/search"


///POST USER PLAN
export const POST_PLAN = "POST_PLAN"
export function postPlan(props) {    
  const request = fetch(`${baseURL}${userPlan}`, {    
    method: 'POST',    
    headers: {
      'content-type': "application/json"      
    },
    body: JSON.stringify(props)
  })
  return {
      type: POST_PLAN,
      payload: request
  }  
}

export function postProcess(request, router) {
  return function(dispatch) {
    dispatch(postPlan(request))      
    dispatch(retrieveSearch(request))
      .then(() => {
        router.push('recipes')
      })
  }
}

//GET USER DATA
export const REQUEST_PLAN = "REQUEST_PLAN"
export function requestPlan(request) {
  return {
    type: REQUEST_PLAN,
    payload: request
  }
}

export const RECEIVE_PLAN = "RECEIVE_PLAN"
export function receivePlan(request, json) {
  return {
    type: RECEIVE_PLAN,
    request,
    userPlan: json
  }
}

export function fetchPlan(request) {
  return function(dispatch) {
    dispatch(requestPlan(request))
    return fetch(`${baseURL}${userPlan}`, {
      method: 'GET'
    })
      .then(response => {        
        return response.json()
      })
      .then(json => {
        let parsed = JSON.parse(json)
        dispatch(receivePlan(request, parsed))
    })
  }
}

