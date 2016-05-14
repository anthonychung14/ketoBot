import { ADD_PLAN_MODAL, HIDE_PLAN_MODAL, CLOSE_PLAN_MODAL } from '../actions/modalActions'

const initialState = {
  modalState: false,
  modalProps: null
}

export function modalStaple(state=initialState, action) {
  switch(action.type) {
    case ADD_PLAN_MODAL:
      return {
        modalState: true,
        modalProps: action.payload
      }
    case HIDE_PLAN_MODAL:
      return initialState
    case CLOSE_PLAN_MODAL:
      return initialState
    default:
      return state
  }
}