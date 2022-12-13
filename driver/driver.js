'use strict';

const eventPool = require('../src/eventPool');

eventPool.on('pickup', (order) => {
    setTimeout(() => {
       console.log(`DRIVER: picked up ${order.id}`)
       eventPool.emit('in-transit', order) 
    }, 2000);

    setTimeout(() => {
        console.log(`DRIVER: delivered ${order.id}`)
        eventPool.emit('delivered', order) 
     }, 4000);
});