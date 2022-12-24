'use strict';

//let socket = require('../socket-client');
const Chance = require('chance');
const chance = new Chance();


const generateOrder = (socket) => (payload = null) => {
  payload = payload ? payload : {
    store: '1-206-flowers',
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };

  console.log('Vendor: order ready for pickup');
  socket.emit('PICKUP', payload);
}

//let callforPickUp = generateOrder(socket);
//callforPickUp(payload);

function thankDriver(payload){
  console.log('Vendor: Thank you for delivering to: ', payload.customer);
}

module.exports = { generateOrder, thankDriver };