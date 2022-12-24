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

const { io } = require('socket.io-client');
const vendor = io('http://localhost:3001/caps');

const { generateOrder, thankDriver } = require('./handlers');

vendor.on('DELIVERED', thankDriver)

setInterval(() => {
  generateOrder(vendor)()
}, 3000);