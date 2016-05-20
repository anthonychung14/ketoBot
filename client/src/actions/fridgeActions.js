import fetch from 'isomorphic-fetch'
import axios from 'axios'
import {reset} from 'redux-form';

const fridgeURL = "http://localhost:8000/fridge/items"
const fridgeSearch = "http://localhost:8000/fridge/search"

//DO ES SEARCH BASED ON ITEMS IN THIS ARRAY

export const START_FSEARCH = "START_FSEARCH"
export function requestFSearch(request) {
  return {
    type: START_FSEARCH,
    payload: request
  }
}

export const RECEIVE_FSEARCH = "RECEIVE_FSEARCH"
export function receiveFSearch(request, json) {
  console.log(json, "receiveFSearch")
  return {
    type: RECEIVE_FSEARCH,
    request,
    recipes: json
  }
}

export function fetchFSearch(request) {  
  return function(dispatch) {
    dispatch(requestFSearch)
    return fetch(`${fridgeSearch}`, {
        method: 'POST',
        headers: {
          'content-type': "application/json"      
        },
        body: JSON.stringify(request)
      })
      .then(response => response.json())
      .then(json => {        
        dispatch(receiveFSearch(request, json))
      })
  }
}


//ADD ITEMS TO ARRAY ON CLICK
export const ADD_FRIDGE = "ADD_FRIDGE"
export function addFridgeItem(item) {
  return {
    type: ADD_FRIDGE,
    payload: item
  }
}

export const DEL_FRIDGE = "DEL_FRIDGE"
export function delFridgeItem(item, items) {  
  const itemIndex = items.indexOf(item)
  const searchArray = items.slice(0, itemIndex).concat(items.slice(itemIndex+ 1))
  return {
    type: DEL_FRIDGE,
    payload: searchArray
  }
}

//GET ITEMS FROM FRIDGE
export const REQUEST_FRIDGE = "REQUEST_FRIDGE"
export function requestFridge(request) {
  return {
    type: REQUEST_FRIDGE,
    payload: request
  }
}


export const RECEIVE_FRIDGE = "RECEIVE_FRIDGE"
export function receiveFridge(request, response) {
  return {
    type: RECEIVE_FRIDGE,
    request,
    fridgeItems: response
  }
}

export function fetchFridge(request) {
  return function(dispatch) {
    dispatch(requestFridge(request))
    return fetch(`${fridgeURL}`)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveFridge(request, json))
      })
  }
}


//POST NEW ITEMS TO FRIDGE
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
        dispatch(finishFridgePost(formProps, json))
        dispatch(reset('fridgeForm'))
      })
  }
}