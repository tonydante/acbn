import axios from 'axios';
import jwt from 'jsonwebtoken';
import swal from 'sweetalert';
import * as types from '../app/constants';
import history from '../utils/history';
import setAuthToken from '../utils/setAuthToken';
import socket from '../utils/socket';

export const setCurrentUser = user => ({
  type: types.SET_CURRENT_USER,
  user
});

const createUserSuccess = user => ({
  type: types.CREATE_USER_SUCCESS, payload: user 
});

const createUserFail = user => ({ 
  type: types.CREATE_USER_ERROR, user 
});

/**
 * @function userSignupRequest
 * @param { object } userData
 * @returns {object} dispatches an action
 * @description It makes an api call to register a new user
 */
export const userSignupRequest = userData => dispatch => { 
  axios.post('/api/v1/user/signup', userData)
    .then((response) => {
      dispatch(createUserSuccess(response.data));
      swal({
        title: "Hi there!",
        text: response.data.message,
        icon: "success"
      });
      history.push('/admin/dashboard/clients');
    }).catch((err) => {
      dispatch(createUserFail(err));
      swal({
        title: "Oops!",
        text: err.response.data.error,
        icon: "warning"
      });
    });
};

/**
 * @function userLoginRequest
 * @param { object } user
 * @returns {object} dispatches an action
 * @description It makes an api call to log i a registered user
 */
const userLoginSuccess = user => ({ type: types.LOGIN_USER_SUCCESS, user });
const userLoginFailed = user => ({ type: types.LOGIN_USER_ERROR, user });

export const userLoginRequest = userData => dispatch => {
  axios.post('/api/v1/user/signin', userData)
    .then((response) => {
      dispatch(userLoginSuccess(response));
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
      swal({
        title: "Hi there!",
        text: response.data.message,
        icon: "success"
      });
      history.push('/dashboard');
    })
    .catch((err) => {
      if(err.response) {
        console.log('there was an error with the response')
      } else if (err.request) {
        console.log('there is a problem with ther request')
      } else {
        console.log(err, 'there seems to be an error')
      }
      dispatch(userLoginFailed(err));
      swal({
        title: "Oops!",
        text: err.response.data.error,
        icon: "warning"
      });
    });
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

/**
 * @function userLoginRequest
 * @param { object } userData
 * @returns {object} dispatches an action
 * @description It makes an api call to log i a registered user
 */
const adminLoginSuccess = user => ({ type: types.ADMIN_LOGIN_USER_SUCCESS, user });
const adminLoginFailed = user => ({ type: types.ADMIN_LOGIN_USER_ERROR, user });

export const adminLoginRequest = userData => dispatch => axios.post('/api/v1/admin/signin', userData)
  .then((response) => {
    dispatch(adminLoginSuccess(response));
    const { token } = response.data;
    localStorage.setItem('adminAccessToken', token);
    setAuthToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
    swal({
      title: "Hi there!",
      text: response.data.message,
      icon: "success"
    });
    history.push('/admin/dashboard/clients');
  })
  .catch((err) => {
    dispatch(adminLoginFailed(err));
    swal({
      title: "Oops!",
      text: err.response.data.error,
      icon: "warning"
    });
  });

/**
 * @function userSignupRequest
 * @param { object } userData
 * @returns {object} dispatches an action
 * @description It makes an api call to register a new user
 */
const signupAdminSuccess = user => ({ type: types.SIGN_UP_ADMIN_SUCCESS, user });

const signupAdminFail = user => ({ type: types.SIGN_UP_ADMIN_ERROR, user });

export const adminSignupRequest = userData => dispatch => axios.post('/api/v1/admin/signup', userData)
  .then((response) => {
    console.log(response, 'hello there')
    dispatch(signupAdminSuccess(response));
    const { token } = response.data;
    localStorage.setItem('adminAccessToken', token);
    setAuthToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
    swal({
      title: "Hi there!",
      text: response.data.message,
      icon: "success"
    });
    history.push('/admin/dashboard/clients');
  }).catch((err) => {
    dispatch(signupAdminFail(err));
    swal({
      title: "Oops!",
      text: err.response.data.error,
      icon: "warning"
    });
  });


/**
 * @function logout
 * @returns {object} dispatches an action
 * @description It logs out the user and deletes token from local storage
 */
const logoutSuccess = user => ({
  type: types.LOGOUT_USER,
  user
});

export const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken') || localStorage.removeItem('adminAccessToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  dispatch(logoutSuccess());
  history.push('/login');
};


/**
 * @function getAllUsers
 * @returns {object} dispatches an action
 * @description It fetches all user for the admin
 */
const getAllUsersSuccess = data => ({ type: types.GET_ALL_USERS_SUCCESS, payload: data });

const getAllUsersFailed = data => ({ type: types.GET_ALL_USERS_ERROR, data });

export const getAllUsers = (currentPage, limit) => dispatch => axios.get(`/api/v1/admin/clients?currentPage=${currentPage}&limit=${limit}`)
  .then((response) => {
    dispatch(getAllUsersSuccess(response.data));
  })
  .catch((error) => {
    dispatch(getAllUsersFailed(error));
    swal({
      title: "Oops!",
      text: 'could not fetch users',
      icon: "warning"
    });
  });

/**
 * @function getAllUsers
 * @returns {object} dispatches an action
 * @description It fetches all user for the admin
 */
const getTransactionsSuccess = data => ({ type: types.GET_ALL_USER_TRANSACTIONS_SUCCESS, payload: data });

const getTransactionsFailed = users => ({ type: types.GET_ALL_USER_TRANSACTIONS_ERROR, users });

export const getTransactions = () => dispatch => {
  axios.get('/api/v1/user/transactions')
    .then((response) => {
      dispatch(getTransactionsSuccess(response.data));
    })
    .catch((error) => {
      dispatch(getTransactionsFailed(error));
      swal({
        title: "Oops!",
        text: 'could not fetch users',
        icon: "warning"
      });
    });
};

/**
 * 
 * 
 * @param {any} id 
 * @param {any} updatedInfo 
 * @description this action allows the admin update the user detail
 */

const updateClienInfotSuccess = data => ({ type: types.UPDATE_CLIENT_SUCCESS, payload: data });
const updateClientInfoFailed = client => ({ type: types.UPDATE_CLIENT_ERROR, client });

export const updateClientInfo = (id, updatedInfo) => dispatch => {
  axios.put(`/api/v1/admin/client?id=${id}`, updatedInfo)
    .then((response) => {
      dispatch(updateClienInfotSuccess(response.data.updatedDetails));
      swal({
        title: "Hi there!",
        text: response.data.message,
        icon: "success"
      });
      history.push('/admin/dashboard/clients');
    })
    .catch((error) => {
      dispatch(updateClientInfoFailed(error));
      swal({
        title: "Oops!",
        text: 'could not fetch users',
        icon: "warning"
      });  
    });
};


/**
 * 
 * @description this action allows the user make transfer
 * @param {any} transferData 
 */

const transferSuccess = data => ({ type: types.TRANSFER_FUNDS_SUCCESS, payload: data });
const transferFailed = transfer => ({ type: types.TRANSFER_FUNDS_ERROR, transfer });

export const transfer = (transferData) => dispatch => axios.post('/api/v1/user/transfer', transferData).then((res) => {
  dispatch(transferSuccess(res.data.transferSuccess));
  swal({
    title: "Hi there!",
    text: res.data.message,
    icon: "success"
  });
  history.push('/dashboard');
}).catch((error) => {
  dispatch(transferFailed(error));
  if (error.response.data.message === 'Token Unavailable') {
    swal("Write something here:", {
      text: 'Please enter transfer token below',
      content: "input",
      showLoaderOnConfirm: true
    })
      .then((value) => {
        if (value === '98778') {
          if (value) {
            history.push('/taxcode');
          }        
        }
      });
  } else {
    swal({
      title: "Oops!",
      text: `Sorry ${error.response.data.message}`,
      icon: "warning"
    });
  }
});


/**
 * 
 * @description this action allows the user make transfer
 * @param {any} transferData 
 */

const depositSuccess = data => ({ type: types.DEPOSIT_FUNDS_SUCCESS, payload: data });
const depositFailed = deposit => ({ type: types.DEPOSIT_FUNDS_ERROR, deposit });

export const deposit = (id, depositData) => dispatch => {
  axios.put(`/api/v1/admin/deposit?id=${id}`, depositData).then((res) => {
    dispatch(depositSuccess(res.data.depositeSuccess));
    swal({
      title: "Hi there!",
      text: res.data.message,
      icon: "success"
    });
    history.push('/admin/dashboard/clients');
  }).catch((error) => {
    dispatch(depositFailed(error));
    if (error) {
      swal({
        title: "Oops!",
        text: `Sorry ${error.response.data.message}`,
        icon: "warning"
      });
    }
  });
};

/**
 * 
 * @description this action allows the user make transfer
 * @param {any} transferData 
 */

const authTransferSuccess = data => ({ type: types.AUTH_TRANSFER_FUNDS_SUCCESS, payload: data });
const authTransferFailed = transferToken => ({ type: types.AUTH_TRANSFER_FUNDS_ERROR, transferToken });

export const authTransfer = (id, transferToken) => dispatch => axios.put(`/api/v1/admin/client/updateusertoken?id=${id}`, transferToken).then((res) => {
  dispatch(authTransferSuccess(res.data.updatedDetails));
  socket.emit('isActive', res.data.updatedDetails);
}).catch((error) => {
  dispatch(authTransferFailed(error));
  swal({
    title: "Oops!",
    text: `Sorry ${error.response.data.message}`,
    icon: "warning"
  });
});

const deleteUserSuccess = user => ({ type: types.DELETE_USER_SUCCESS, payload: user });

const deleteUserError = user => ({ type: types.DELETE_USER_ERROR, user });

export const deleteUser = id => dispatch => axios.delete(`/api/v1/admin/client?id=${id}`)
  .then((response) => {
    dispatch(deleteUserSuccess(response.data));
    swal({
      title: "Hi there!",
      text: response.data.message,
      icon: "success"
    });
  })
  .catch((error) => {
    dispatch(deleteUserError(error));
    swal({
      title: "Oops!",
      text: `Sorry ${error.response.data.message}`,
      icon: "warning"
    });
  });
