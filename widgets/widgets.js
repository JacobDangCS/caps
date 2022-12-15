'use strict';



let socket = require('../socket-client');

const { generateOrder, thankDriver } = require('./handlers');

socket.emit('JOIN', 'acme-widgets');
socket.emit('GET_ALL', {id: 'acme-widgets'})
const handleThanks = thankDriver(socket);
const callForPickUp = generateOrder(socket);

socket.on('DELIVERED', (payload) => handleThanks(payload));

setInterval(() => {
  callForPickUp()
}, 3000);