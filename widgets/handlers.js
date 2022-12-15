'use strict';

let socket = require('../socket-client');
const Chance = require('chance');
const chance = new Chance();

let callforPickUp = generateOrder(socket);
callforPickUp(payload);

const generateOrder = (socket) = (payload = null) => {
  payload = payload ? payload : {
    store: 'acme-widgets',
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
    vendorId: 'acme-widgets',
    messageId: chance.guid(),
    driver: 'ourPS',
  };

  console.log('Vendor: order ready for pickup');
  socket.emit('PICKUP', payload);
}


const thankDriver = (socket) => (payload) => {
  console.log('Vendor: Thank you for delivering to: ', payload.customer);
  let newPayload = {
    id: payload.vendorId,
    messageId: payload.messageId,
  }
  socket.emit('RECEIVED', newPayload)
}

module.exports = { generateOrder, thankDriver };