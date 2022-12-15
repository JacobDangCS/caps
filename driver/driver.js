'use strict';

const socket = require('../server/socket-client');

const { pickupInTransit, deliveryHandler } = require('./handlers');
socket.on('PICKUP', driverHandler);

setInterval(() => {
  pickupInTransit(socket)()
}, 3000);

function driverHandler(payload){
  setTimeout(() => {
    pickupInTransit(payload)
  }, 3000);

  setTimeout(() => {
    deliveryHandler(payload);
  }, 6000);
}


socket.emit('GET_ALL', {id: 'ourPS'});
socket.emit('JOIN', 'ourPS');