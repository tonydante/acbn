import isEmpty from 'lodash/isEmpty';
import * as types from '../actions/constants';

export const initialState = {
  isAuthenticated: false,
  user: {},
  role: ''
};

const setCurrentUser = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
        role: action.role
      };
    default: return state;
  }
};
export default setCurrentUser;