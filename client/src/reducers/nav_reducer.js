import { OPEN_MODAL, FORM_MODAL } from '../actions/items'

//if state switches off, clear the "active item state"
const modalState = {
  openForm: false,
  openDisplay: false,
  activeItem: null
}

export function modalReducer(state = modalState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        openDisplay: !state.openDisplay,
        activeItem: action.payload
      }
    case FORM_MODAL:
      return {
        openForm: !state.openForm
      }
    default:
      return state;
  }
}