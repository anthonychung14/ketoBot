import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { recipesUser, selectMacros } from './recipe_reducer';
import { search } from './search_reducer';
import { modalReducer } from './nav_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  modalState: modalReducer,
  recipesUser,
  selectMacros,
  search,
});

export default rootReducer;
