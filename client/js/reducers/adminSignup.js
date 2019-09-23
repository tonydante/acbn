
import * as types from '../app/constants';


const initialState = {
  username: '',
  password: '',
  loggedIn: false,
};

const adminSignup = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_UP_ADMIN_SUCCESS:
      return [
        ...state, action
      ];

    case types.SIGN_UP_ADMIN_ERROR:
      return [];
    default:
      return state;
  }
};

export default adminSignup;