import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { setCurrentUser } from './actions';
import setAuthToken from './utils/SetAuthToken';
import rootReducer from './reducers';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const middleware = applyMiddleware(thunk);
const configureStore = (state = {}) => createStore(
    rootReducer,
    state,
    compose(
        middleware,
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
)
export const store = configureStore();
const { localStorage } = window;
// const jwtToken = localStorage && localStorage.getItem('jwtToken');
// const jwtToken = localStorage && localStorage.getItem('jwtToken');
// const decodedToken = jwt.decode(jwtToken);

// if (decodedToken) {
//     const hasExpired = decodedToken.exp - (Date.now() / 1000) < 0;
//     if (!hasExpired) {
//         setAuthToken(jwtToken);
//         store.dispatch(setCurrentUser(jwt.decode(jwtToken)));
//     } else {
//         localStorage.removeItem('jwtToken');
//     }
// } else {

// }


const { jwtToken, adminAccessToken } = localStorage;
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
     console.log(adminAccessToken, 'admintoken')
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
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
