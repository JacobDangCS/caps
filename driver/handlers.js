'use strict';

let socket = require('../socket-client');

const pickupInTransit = (socket) = (payload) => {
  console.log('Driver: picked up order: ', payload);
  socket.emit('IN_TRANSIT', payload);
}

const deliveryHandler = (socket) = (payload) => {
  console.log('Driver: order delivered: ', payload);
  socket.emit('DELIVERED', payload);
}


module.exports = { pickupInTransit, deliveryHandler };