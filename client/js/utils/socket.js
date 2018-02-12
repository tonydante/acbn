import { store } from '../app';
import { GET_USERACCDETAILS_SUCCESS } from '../app/constants';

/* globals io */
const socket = io();

socket.on('updateClient', (payload) => {
  store.dispatch({
    type: GET_USERACCDETAILS_SUCCESS,
    details: payload,
  });
});

export default socket;
