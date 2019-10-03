import { combineReducers } from 'redux';
import signup from './signup';
// import parcels from './parcels';
// import parcel from './parcel';
// import signin from './signin';
import setCurrentUser from './setCurrentUser';


const rootReducer = combineReducers({
  setCurrentUser,
//   signin,
  signup,
//   parcels,
//   parcel
});

export default rootReducer;