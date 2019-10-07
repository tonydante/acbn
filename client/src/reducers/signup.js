
import * as types from '../actions/constants';


const initialState = {
  firstname: '',
  lastname: '',
  userId: '',
  username: '',
  password: '',
  gender: 'male',
  address: '',
  identificationNumber: '',
  dob: '',
  phone: '',
  city: '',
  state: '',
  provice: '',
  materialStatus: '',
  nationality: '',
  accountNumber: '',
  accountType: '',
  zipcode: '',
  loggedIn: false,
};

const signup = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_USER_SUCCESS:
      return [
        ...state, action
      ];

    case types.CREATE_USER_ERROR:
      return [];
    default:
      return state;
  }
};

export default signup;