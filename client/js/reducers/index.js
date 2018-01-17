import { combineReducers } from 'redux';
// import signup from './signup';
import login from './login';
import setCurrentUser from './setCurrentUser'
import signup from './signup';
import userAccDetails from './userAccDetails';

const rootReducer = combineReducers({
  setCurrentUser,
  login,
  signup,
  userAccDetails
});

export default rootReducer;