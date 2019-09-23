import * as types from '../app/constants';

const initialState = {
  username: '',
  password: '',
  isLoggedIn: false
}
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      return [
        ...state, action
      ];

    case types.LOGIN_USER_ERROR:
      return [];

    default:
      return state;
  }
};

export default loginReducer;
