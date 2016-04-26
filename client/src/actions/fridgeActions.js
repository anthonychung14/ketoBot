import fetch from 'isomorphic-fetch'
import axios from 'axios'

const fridgeURL = "http://localhost:8000/fridge/items"

export const START_FRIDGEPOST = "START_FRIDGEPOST"
export function startFridgePost(request) {  
  return {
    type: START_FRIDGEPOST,
    payload: request
  }
}

export const FINISH_FRIDGEPOST = "FINISH_FRIDGEPOST"
export function finishFridgePost(request, json) {
  return {
    type: FINISH_FRIDGEPOST,
    request,
    fridge: json
  }
}

export function postFridge(formProps) {
  return function(dispatch) {    
    dispatch(startFridgePost(formProps))
    return fetch(`${fridgeURL}`, {
      method: 'POST',    
      headers: {
        'content-type': "application/json"      
      },
      body: JSON.stringify(formProps)
      })
      .then(response => {
        return response.json()
      })
      .then(json => {        
        console.log(json, "dis be json")
        dispatch(finishFridgePost(formProps, json))
      })
  }
}