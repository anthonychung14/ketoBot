import fetch from 'isomorphic-fetch'
import axios from 'axios'

const baseURL = "http://localhost:8000"
const ketoBot = "/ketoBot"

export const CREATE_STAPLE = "CREATE_STAPLE"
export function createStaple(foodArray) {
  const request = fetch(`${baseURL}${userPlan}`, {    
    method: 'POST',    
    headers: {
      'content-type': "application/json"      
    },
    body: JSON.stringify(foodArray)
  })
  return {
      type: CREATE_STAPLE,
      payload: request
  }  
}