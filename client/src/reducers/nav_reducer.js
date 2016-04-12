import { OPEN_MODAL } from '../actions/items'

//if state switches off, clear the "active item state"
const modalState = {
  open: false,
  activeItem: null
}

export function modalReducer(state = modalState, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        open: !state.open,
        activeItem: action.payload
      }
    default:
      return state;
  }
}