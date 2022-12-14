'use strict';
/*
const eventPool = require('../eventPool');
const { pickupInTransit, deliveryHandler } = require('./handlers');

eventPool.on('PICKUP', driverHandler);

function driverHandler(payload){
  setTimeout(() => {
    pickupInTransit(payload);
  }, 1000);
  setTimeout(() => {
    deliveryHandler(payload);
  }, 2000);
}
*/

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');

socket.on('PICKUP', handleReceived);

function handleReceived(payload){
    console.log(`DRIVER: ${payload.orderId}`)
}

setInterval(() => {
    console.log(`DRIVER: payload PICKUP ${payload.orderId}`);
    socket.emit(`DRIVER: payload IN-TRANSIT ${payload.orderId}`);
}, 3000);