import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as types from '../app/constants';
import history from '../utils/history';
import swal from 'sweetalert';
import setAuthToken from '../utils/setAuthToken';

export const setCurrentUser = user => ({
  type: types.SET_CURRENT_USER,
  user
});

const signupUserSuccess = user => ({ type: types.SIGN_UP_USER_SUCCESS, user });

const signupUserFail = user => ({ type: types.SIGNUP_USER_ERROR, user });

/**
 * @function userSignupRequest
 * @param { object } userData
 * @returns {object} dispatches an action
 * @description It makes an api call to register a new user
 */
export const userSignupRequest = userData => dispatch => axios.post('/api/v1/user/signup', userData)
  .then((response) => {
    dispatch(signupUserSuccess(response));
    const { token } = response.data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
    // Materialize.toast(response.data.message, 3000, 'rounded green');
    swal({
      title: "Oops!",
      text: response.data.message,
      icon: "success"
    });
    history.push('/dashboard');
  }).catch((err) => {
    dispatch(signupUserFail(err));
    // Materialize.toast(err.response.data.error, 3000, 'rounded red');
    swal({
      title: "Oops!",
      text: err.response.data.message,
      icon: "warning"
    });
  });



/**
 * @function userLoginRequest
 * @param { object } userData
 * @returns {object} dispatches an action
 * @description It makes an api call to log i a registered user
 */
const userLoginSuccess = user => ({ type: types.LOGIN_USER_SUCCESS, user });
const userLoginFailed = user => ({ type: types.LOGIN_USER_ERROR, user });

export const userLoginRequest = userData => dispatch => axios.post('/api/v1/user/signin', userData)
  .then((response) => {
    dispatch(userLoginSuccess(response));
    const { token } = response.data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
    // Materialize.toast(response.data.message, 3000, 'rounded green');
    swal({
      title: "Oops!",
      text: response.data.message,
      icon: "success"
    });
    history.push('/dashboard');
  })
  .catch((err) => {
    dispatch(userLoginFailed(err));
    // Materialize.toast(err.response.data.error, 3000, 'rounded red');
    swal({
      title: "Oops!",
      text: err.response.data.error,
      icon: "warning"
    });
  });

const logoutSuccess = user => ({
  type: types.LOGOUT_USER,
  user
});

/**
 * @function logout
 * @returns {object} dispatches an action
 * @description It logs out the user and deletes token from local storage
 */
export const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  dispatch(logoutSuccess());
  history.push('/');
};



/**
 * @function getUserDetails
 * @returns {object} dispatches an action
 * @description It logs out the user and deletes token from local storage
 */
const userDetailsSuccess = details => ({ type: types.GET_USERACCDETAILS_SUCCESS, details });
const userDetailsFailed = details => ({ type: types.GET_USERACCDETAILS_ERROR, details });

export const getUserAccDetails = () => dispatch => axios.get('/api/v1/user/useraccountdetails')
  .then((response) => {
    dispatch(userDetailsSuccess(response.data.user));
  })
  .catch((response) => {
    dispatch(userDetailsFailed(response));
  });
