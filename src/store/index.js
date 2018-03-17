/**
 * Created by ttn on 18/11/16.
 */

import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';

/**
 * Passing reducers, initial state and middleware to store.
 */
function configureStore() {
  return createStore(
    reducers,
    applyMiddleware(thunk)
  );
}

const store = configureStore();

export default store;

