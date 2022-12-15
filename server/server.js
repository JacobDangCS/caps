'use strict';
/*
const eventPool = require('./eventPool');
require('./driver/driver');
require('./vendor/vendor');

function logger(event, payload){
  const time = new Date();
  console.log('EVENT:', {event, time, payload});
}

eventPool.on('PICKUP',(payload) => logger('PICKUP', payload));
eventPool.on('IN_TRANSIT',(payload) => logger('IN_TRANSIT', payload));
eventPool.on('DELIVERED',(payload) => logger('DELIVERED', payload));
*/

require('dotenv').config();
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3002;

const server = new Server(PORT);
const Queue = require('./lib/messageClient');
//const socket = require('./socket-client');

const messages = server.of('/messages');
const messageQueue = new Queue();

//create a namespace

const caps = server.of('/caps');

caps.on('connection', (socket) => {
    console.log('socket connected to namespace!', socket.id);
    //how to join a room
});

messages.on('connection', (socket) => {
  console.log('socket connected to namespace /messages!', socket.id)
})

//connect server to clients
caps.on('connection', (socket) => {

  socket.on('JOIN', (room) => {
    socket.join(room);
    console.log(`Joined the ${room} room`)
});

    console.log('socket connected to CAPS!', socket.id);

   /* function logger(event, payload){
      const time = new Date();
      console.log('EVENT:', {event, time, payload});
    }
   */

   /* socket.on('PICKUP', (payload) => {
        console.log('PICKUP PAYLOAD', payload);
        logger('PICKUP PAYLOAD', payload);
        socket.broadcast.emit('PICKUP', payload);})
   */

      socket.on('PICKUP', (message) => {
        console.log('PICKUP PAYLOAD');
        let currentQueue = messageQueue.read(message.recipient);
        if(!currentQueue){
          let queueKey = messageQueue.store(message.recipient, new Queue());
          currentQueue = messageQueue.read(queueKey);
        }
        currentQueue.store(message.id, message);
        socket.broadcast.emit('PICKUP', message);})

    
    /* socket.on('IN_TRANSIT', (payload) => {
      console.log('PAYLOAD IN_TRANSIT', payload);
      logger('PAYLOAD IN_TRANSIT', payload);
      socket.broadcast.emit('IN_TRANSIT', payload);})
    */

      socket.on('IN_TRANSIT', (message) => {
        console.log('PAYLOAD IN_TRANSIT');
        let currentQueue = messageQueue.read(message.recipient);
        if(!currentQueue){
          let queueKey = messageQueue.store(message.recipient, new Queue());
          currentQueue = messageQueue.read(queueKey);
        }
        currentQueue.store(message.id, message);
        socket.broadcast.emit('IN_TRANSIT', message);})

  
  /* socket.on('DELIVERED', (payload) => {
    console.log('DELIVERED PAYLOAD', payload);
    logger('DELIVERED PAYLOAD', payload);
    socket.broadcast.emit('DELIVERED', payload);})
    */

    socket.on('DELIVERED', (message) => {
      console.log('DELIVERED');
      let currentQueue = messageQueue.read(message.recipient);
      if(!currentQueue){
        let queueKey = messageQueue.store(message.recipient, new Queue());
        currentQueue = messageQueue.read(queueKey);
      }
      currentQueue.store(message.id, message);
      socket.broadcast.emit('DELIVERED', message);})

    socket.on('RECEIVED', (payload) => {
      let currentQueue = messageQueue.read(message.recipient);
      if (!currentQueue){
        throw new Error('no queue created');
      }
      let message = currentQueue.remove(message.id);
      socket.to(message.id).emit('RECEIVED', message)
    })

    socket.on('RETRIEVE ALL', (message) => {
      console.log('Working!');
      let currentQueue = messageQueue.read(message.recipient);
      if (currentQueue && currentQueue.data){
        Object.keys(currentQueue.data).forEach(messageId => {
            socket.emit(currentQueue.data[messageId].event, currentQueue.read(messageId));
        });
      }
    })
});