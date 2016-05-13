import fetch from 'isomorphic-fetch'
import moment from 'moment'

const baseURL = "http://localhost:8000"
const ketoBot = "/ketoBot/recipes"
const staples = "/ketoBot/staples"
import { formModal } from './items'

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
  
