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

/* let socket = require('../socket-client');
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
*/

const MessageClient = require('../lib/messageClient');
const driver = new MessageClient('driver');

driver.subscribe('PICKUP', (message) => {
  setTimeout(() => {
    let transitMessage = `DRIVER: Order ID ${message.order.id} from ${message.sender} to customer: ${message.order.customer}`;
    driver.publish('DELIVERED', {message});
    console.log(transitMessage);
  }, 2000);

  setTimeout(() => {
    let deliverMessage = `DRIVER: Order ID ${message.order.id} from ${message.sender} to customer: ${message.order.customer}`;
    driver.publish(deliverMessage);
    console.log(deliverMessage);
  }, 2000);
})