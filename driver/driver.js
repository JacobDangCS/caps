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

//const socket = io('http://localhost:3001/caps');
const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');
const { pickupInTransit, deliveryHandler } = require('./handlers');
socket.on('PICKUP', driverHandler);


function driverHandler(payload){
  setTimeout(() => {
    pickupInTransit(socket)(payload);
  }, 3000);

  setTimeout(() => {
    deliveryHandler(socket)(payload);
  }, 6000);
}