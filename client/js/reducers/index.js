import { combineReducers } from 'redux';
// import signup from './signup';
import login from './login';
import setCurrentUser from './setCurrentUser'
import signup from './signup';
import userAccDetails from './userAccDetails';
import adminSignup from './adminSignup';
import adminLogin from './adminLogin';
import clients from './clients';
import transactions from './transactions';

const rootReducer = combineReducers({
  setCurrentUser,
  login,
  signup,
  userAccDetails,
  adminSignup,
  adminLogin,
  clients,
  transactions
});

export default rootReducer;