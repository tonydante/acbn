
import * as types from '../actions/constants';


const initialState = {
  user: []
};

const transactions = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_USER_TRANSACTIONS_SUCCESS:
      return {
        ...state, ...action.payload
      };
    case types.GET_ALL_USER_TRANSACTIONS_ERROR:
      return {};

    default:
      return state;
  }
};

export default transactions;
