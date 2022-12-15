'use strict';

let socket = require('../socket-client');

const { generateOrder, thankDriver } = require('./handlers');

socket.emit('JOIN', '1-206-FLOWERS');
socket.emit('GET_ALL', {id: '1-206-FLOWERS'})
const handleThanks = thankDriver(socket);
const callForPickUp = generateOrder(socket);

socket.on('DELIVERED', (payload) => handleThanks(payload));

setInterval(() => {
  callForPickUp()
}, 3000);