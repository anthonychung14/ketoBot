//NAV TO MODAL
export const OPEN_MODAL = "OPEN_MODAL"
export function openModal(element, nutrition, ingreds) {  
  let recipeInfo = {}
  if (element) {
    recipeInfo = { recipe: element, nutrition, ingreds }
  }
  return {
    type: OPEN_MODAL,
    payload: recipeInfo
  }
}

export const FORM_MODAL = "FORM_MODAL"
export function formModal() {    
  return {
    type: FORM_MODAL
  }
}

export const STAPLE_MODAL = "STAPLE_MODAL"
export function stapleModal() {    
  return {
    type: STAPLE_MODAL
  }
}

export const ADD_PLAN_MODAL = "ADD_PLAN_MODAL"
export function addPlanModal(element) {
  return {
    type: ADD_PLAN_MODAL,
    payload: element
  }
}

export const HIDE_PLAN_MODAL = "HIDE_PLAN_MODAL"
export function hidePlanModal() {
  return {
    type: HIDE_PLAN_MODAL    
  }
}