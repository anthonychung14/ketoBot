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