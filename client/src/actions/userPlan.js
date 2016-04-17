import fetch from 'isomorphic-fetch'
import axios from 'axios'

const baseURL = "http://localhost:8000"
const userPlan = "/users/plan"

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

//POST DJANGO
//Search ES same time
  //with results of Elastic IDS, 
    //do one more GET from DJANGO based on that
  //when receive IDs, GET DJANGO
  //when finish, navigate to recipe


//COLLECT USER DATA
export function createDiet(props) {
  const request = fetch.post(`${baseURL}${userPlan}`, props)
  return {
    type: CREATE_GOAL,
    payload: request
  }
}

//ES Actions
export const SEARCH_RECIPES = "SEARCH_RECIPES"
export function searchRecipes(props) {
  const request = fetch(`${ES_URL}${ES_REC}`+'"chicken"')  
  return {
    type: SEARCH_RECIPES,
    payload: request
  }
}
