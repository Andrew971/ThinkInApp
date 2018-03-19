import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import {clockReducer} from './Reducers/clockReducer';
import {SignupReducer} from './Reducers/SignupReducer';
import {LoginReducer} from './Reducers/LoginReducer';
import {UserReducer} from './Reducers/UserReducer';
import {ForumReducer} from './Reducers/ForumReducer';
import {LabReducer} from './Reducers/LabReducer';
import {SearchReducer} from './Reducers/SearchReducer';
import {followReducer} from './Reducers/followReducer';

import rootSaga from './Sagas/rootSaga'


function createReducer(asyncReducers) {
  return combineReducers({
      clock: clockReducer,
      signup: SignupReducer,
      login:LoginReducer,
      user:UserReducer,
      forum:ForumReducer,
      lab:LabReducer,
      search:SearchReducer,
      follow:followReducer,
      ...asyncReducers
  });
}


export default function configureStore(initialState = {}) {
  // Create the store with thunk middleware
  const sagaMiddleware = createSagaMiddleware()

  const middlewares = [sagaMiddleware];

  const enhancers = [
      applyMiddleware(...middlewares),
  ];

  const store = createStore(
      createReducer(),
      initialState,
      compose(...enhancers)
  );
  sagaMiddleware.run(rootSaga)

  // Initialize it with no other reducers
  store.asyncReducers = {};
  return store;
}