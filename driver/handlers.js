'use strict';


let socket = require('../socket-client');

const pickupInTransit = (socket) = (payload) => {
  console.log('Driver: picked up order: ', payload);
  socket.emit('IN_TRANSIT', payload);
  socket.emit('RECEIVED', )
}

const deliveryHandler = (socket) = (payload) => {
  console.log('Driver: order delivered: ', payload);
  let newPayload = {
    id: payload.driverId,
    messageId: payload.messageId,
  }
  socket.emit('DELIVERED', newPayload);
}


module.exports = { pickupInTransit, deliveryHandler };