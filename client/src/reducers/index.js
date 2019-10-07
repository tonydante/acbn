import { combineReducers } from 'redux';
import signup from './signup';
import userAccDetails from './userAccDetails';
import clients from './clients';
import transactions from './transactions';
import setCurrentUser from './setCurrentUser';


const rootReducer = combineReducers({
  setCurrentUser,
  transactions,
  userAccDetails,
  signup,
//   parcel,
clients
});

export default rootReducer;