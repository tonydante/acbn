import * as types from '../app/constants';

const initialState = {
  username: '',
  password: '',
  isLoggedIn: false
}
const adminLogin = (state = initialState, action) => {
  switch (action.type) {
    case types.ADMIN_LOGIN_USER_SUCCESS:
      return [
        ...state, action
      ];

    case types.ADMIN_LOGIN_USER_ERROR:
      return [];

    default:
      return state;
  }
};

export default adminLogin;
