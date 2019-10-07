import socket from 'socket.io';
import { store } from '../index';
import { GET_USERACCDETAILS_SUCCESS } from '../actions/constants';

/* globals io */
const socket =  io.connect();

socket.on('updateClient', (payload) => {
  store.dispatch({
    type: GET_USERACCDETAILS_SUCCESS,
    details: payload,
  });
});

export default socket;
