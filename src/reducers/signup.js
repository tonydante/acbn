// import * as types from '../actions/constants';

export const initialState = {
  username: '',
  password: '',
  isLoading: false,
};

const signup = (state = initialState, action) => {
  switch (action.type) {
    // case types.SIGN_UP_USER_SUCCESS:
    //   return {
    //     ...state, ...action.user
    //   };

    // case types.SIGN_UP_USER_ERROR:
    //   return {};
    default:
      return state;
  }
};

export default signup;