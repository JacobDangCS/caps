'use strict';

require('dotenv').config();
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3002;

const server = new Server(PORT);
const Queue = require('./lib/queue');
//const socket = require('./socket-client');

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
  socket.onAny((event, payload) => {
    const time = new Date();
    console.log('EVENT:', { event, time, payload });
  });

  socket.on('JOIN', (id) => {
    socket.join(id);
    console.log(`Joined the ${id} room`);

  });

  console.log('socket connected to CAPS!', socket.id);

  function logger(event, payload) {
    const time = new Date();
    console.log('EVENT:', { event, time, payload });
  }


  socket.on('PICKUP', (payload) => {
    console.log('PICKUP PAYLOAD', payload);
    let currentQueue = messageQueue.read(payload.driverId);
    if (!currentQueue) {
      let queueKey = messageQueue.store(payload.driverId, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    currentQueue.store(payload.messageId, payload);
    socket.broadcast.emit('PICKUP', payload);
  });

  socket.on('IN_TRANSIT', (payload) => {
    console.log('PAYLOAD IN_TRANSIT', payload);
    logger('PAYLOAD IN_TRANSIT', payload);
    socket.broadcast.emit('IN_TRANSIT', payload);
  });


  socket.on('DELIVERED', (payload) => {
    console.log('DELIVERED');
    let currentQueue = messageQueue.read(payload.vendorId);
    if (!currentQueue) {
      let queueKey = messageQueue.store(payload.vendorId, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    currentQueue.store(payload.messageId, payload);
    socket.to(payload.vendorId).emit('DELIVERED', payload);
  });

  socket.on('RECEIVED', (payload) => {
    let currentQueue = messageQueue.read(payload.id);
    if (!currentQueue) {
      throw new Error('no vendor queue made');
    }
    currentQueue.remove(payload.messageId);
  });

  socket.on('GET_ALL', (payload) => {
    console.log('Working!');
    let currentQueue = messageQueue.read(payload.id);
    if (currentQueue && currentQueue.data) {
      Object.keys(currentQueue.data).forEach(message => {
        if (payload.id !== 'ourPS') {
          socket.emit('DELIVERED', currentQueue.read(message));
        } else {
          socket.emit('PICKUP', currentQueue.read(message))
        }
      });
    }
  });
});