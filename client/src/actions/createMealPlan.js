import fetch from 'isomorphic-fetch'
import axios from 'axios'

const baseURL = "http://localhost:8000"
const ketoBot = "/ketoBot/recipes"

import { formModal } from './items'

export function createStaple(foodArray) {    
    formModal()
    return function(dispatch) {
      dispatch(postStaple(foodArray))  
    }
}

export const POST_STAPLE = "POST_STAPLE"
export function postStaple(food) {
  console.log(food, "should I assemble data here")

  const request = fetch(`${baseURL}${ketoBot}`, {    
    method: 'POST',    
    headers: {
      'content-type': "application/json"      
    },
    body: JSON.stringify(food)
  })
  return {
    type: POST_STAPLE,
    payload: request
  }
}
  
