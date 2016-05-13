import fetch from 'isomorphic-fetch'
import moment from 'moment'

const baseURL = "http://localhost:8000"
const userAlgo = "/fridge/portionAlgo"

//The magic backend algorithm
export const REQUEST_ALGO = "REQUEST_ALGO"
export function requestAlgo(request) {
  return {
    type: REQUEST_ALGO,
    payload: request
  }
}

export function sendForAlgo(userData) {
  return function(dispatch) {
    dispatch(requestAlgo(baseURL+userAlgo))
    return fetch(baseURL+userAlgo, {
      method: 'POST',    
      headers: {
        'content-type': "application/json"      
      },
      body: JSON.stringify(userData)
      })
      .then(response => response.json())
      .then(json => dispatch(receiveAlgo(userData, json))
    )
  }
}

export const RECEIVE_ALGO = "RECEIVE_ALGO"
export function receiveAlgo(request, json) {
  //Do some fancy stuff to process the data you get back
  console.log("THE JASON ", json)
  return {
    type: RECEIVE_ALGO,    
    algoMeal: json
  }
}