import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

import { fetchFSearch } from '../actions/fridgeActions'
import { fetchRecipes } from '../actions/items'

export default function configureStore(initialState) {
  const logger = createLogger({
    collapsed: true,
    predicate: () =>
    process.env.NODE_ENV === `development`, // eslint-disable-line no-unused-vars
  });

  const middleware = applyMiddleware(thunkMiddleware, logger);

  const store = middleware(createStore)(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  let prevState;
  store.subscribe(() => {
    let state = store.getState();
    if (prevState) {
      if (state.fridge.searchTerms.length !== prevState.fridge.searchTerms.length) {
        store.dispatch(fetchFSearch(state.fridge.searchTerms))
      }
    }
    prevState = state 
  })
  
//This is what logs everytime
  store.dispatch(fetchRecipes('Anthony')).then(() =>
    console.log(store.getState())
  )

  return store;
}
