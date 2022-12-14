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
const socket = io('http://localhost:3001/caps');

socket.on('DELIVERED', deliverHandler)

function deliverHandler(payload){
    console.log('VENDOR: Thank you for delivery', payload);
    socket.emit('VENDOR: order received', payload);
}