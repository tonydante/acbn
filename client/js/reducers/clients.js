
import * as types from '../app/constants';


const initialState = {
  users: []
};

const clients = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_USERS_SUCCESS:
      return {
        ...state, ...action.payload
      };
    case types.CREATE_USERS_ERROR:
      return {};
    case types.GET_ALL_USERS_SUCCESS:
      return {
        ...state, ...action.payload
      };
    case types.GET_ALL_USERS_ERROR:
      return {};
    case types.UPDATE_CLIENT_SUCCESS:
      const { users } = state;
      const filteredUsers = users.filter(({ _id }) => _id !== action.payload._id);

      return {
        ...state, users: [...filteredUsers, action.payload]
      };
    case types.UPDATE_CLIENT_ERROR:
      return {};

    case types.AUTH_TRANSFER_FUNDS_SUCCESS:
      const updatedUsers = state.users;
      const filteredUnpdatedUsers = updatedUsers.filter(({ _id }) => _id !== action.payload._id);

      return {
        ...state, users: [action.payload, ...filteredUnpdatedUsers]
      };
    case types.AUTH_TRANSFER_FUNDS_ERROR:
      return {};

    case types.DELETE_USER_SUCCESS:
      const previousUsers = state.users;
      const newUsers = previousUsers.filter(({ _id }) => _id !== action.payload._id);

      return {
        ...state, users: [...newUsers]
      };
    case types.DELETE_USER_ERROR:
      return {};

    default:
      return state;
  }
};

export default clients;
