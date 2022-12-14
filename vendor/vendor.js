'use strict';
/*
const eventPool = require('../eventPool');
const { generateOrder, thankDriver } = require('./handlers');

eventPool.on('DELIVERED', thankDriver);

setInterval(() => {
  console.log('-----------new interval begins-----------');
  generateOrder();
}, 5000);
*/

let socket = require('../socket-client');

const { generateOrder, thankDriver } = require('./handlers');


socket.on('DELIVERED', thankDriver)

setInterval(() => {
  generateOrder(socket)()
}, 3000);