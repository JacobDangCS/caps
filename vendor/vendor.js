'use strict';

const eventPool = require('../src/eventPool');
const Order = require('./order');

eventPool.on('delivered', (order) => {
    console.log(`Thank you, ${order.customer}`)
});


eventPool.on('new-order', (order) => {
    setTimeout(() => {
        eventPool.emit('pickup', order)
    }, 2000);
});

setInterval(() => {
    let order = new Order();
    eventPool.emit('new-order', order);
}, 8000);

let order = new Order();
eventPool.emit('new-order', order);