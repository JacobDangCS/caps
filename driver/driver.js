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
let socket = require('../socket-client');
const { pickupInTransit, deliveryHandler } = require('./handlers');
socket.on('PICKUP', driverHandler);

setInterval(() => {
  pickupInTransit(socket)()
}, 3000);

function driverHandler(payload){
  setTimeout(() => {
    pickupInTransit(payload)
  }, 3000);

  setTimeout(() => {
    deliveryHandler(payload);
  }, 6000);
}