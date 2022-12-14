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

//create a namespace

const caps = server.of('/caps');

caps.on('connection', (socket) => {
    console.log('socket connected to namespace!', socket.id);
    //how to join a room

});

//connect server to clients
caps.on('connection', (socket) => {

  socket.on('JOIN', () => {
    socket.join(room);
    console.log(`Joined the ${room} room`)
});

    console.log('socket connected to CAPS!', socket.id);

    function logger(event, payload){
      const time = new Date();
      console.log('EVENT:', {event, time, payload});
    }
    socket.on('PICKUP', (payload) => {
        console.log('PICKUP PAYLOAD', payload);
        logger('PICKUP PAYLOAD', payload);
        socket.broadcast.emit('PICKUP', payload);
    })

    
    socket.on('IN_TRANSIT', (payload) => {
      console.log('PAYLOAD IN_TRANSIT', payload);
      logger('PAYLOAD IN_TRANSIT', payload);
      socket.broadcast.emit('IN_TRANSIT', payload);
  })

  
  socket.on('DELIVERED', (payload) => {
    console.log('DELIVERED PAYLOAD', payload);
    logger('DELIVERED PAYLOAD', payload);
    socket.broadcast.emit('DELIVERED', payload);


})
});