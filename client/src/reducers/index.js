import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { recipesUser } from './recipe_reducer';
import { search } from './search_reducer';
import { userPlan } from './userPlan_reducer';

import { modalReducer } from './nav_reducer';
import { modalStaple } from './modal_reducer';

import { fridge } from './fridge_reducer';
import { mealPlan } from './mealPlan_reducer';
import { staples } from './staple_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  modalStaple,
  modalState: modalReducer,
  recipesUser,
  search,
  userPlan,
  fridge,
  mealPlan,
  staples
});

export default rootReducer;
