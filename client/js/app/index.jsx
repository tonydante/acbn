import React from 'react';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { applyMiddleware, createStore, compose } from 'redux';
import { setCurrentUser } from '../actions/user';
import setAuthToken from '../utils/setAuthToken';
import App from './App';
import rootReducer from '../reducers';
import initialState from './initialState';

const logger = createLogger();
const middleware = applyMiddleware(logger, thunk);

const configureStore = (state = {}) => createStore(
  rootReducer,
  state,
  compose(middleware, window.devToolsExtension ? window.devToolsExtension() : f => f)
);

const store = configureStore();
const app = document.getElementById('root');
const jwtToken = localStorage.jwtToken;
const adminAccessToken = localStorage.adminAccessToken;
if (jwtToken) {
  const decodedToken = jwt.decode(jwtToken);
  const hasExpired = decodedToken.exp - (Date.now() / 1000) < 0;
  if (!hasExpired) {
    setAuthToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
  } else {
    localStorage.removeItem('jwtToken');
  }
} else if (adminAccessToken) {
  const decodedAdminToken = jwt.decode(adminAccessToken);
  const hasTokenExpired = decodedAdminToken.exp - (Date.now() / 1000) < 0;
  if (!hasTokenExpired) {
    setAuthToken(localStorage.adminAccessToken);
    store.dispatch(setCurrentUser(jwt.decode(localStorage.adminAccessToken)));
  } else {
    localStorage.removeItem('jwtToken');

  }
} else {
  setAuthToken(false);
  store.dispatch(setCurrentUser({}));
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  app
);