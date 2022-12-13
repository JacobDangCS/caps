'use strict';

const eventPool = require('./eventPool');
const eventLogger = require('./eventLogger');

require('../driver/driver');
require('../vendor/vendor');

eventPool.on('pickup', (order) => {
    eventLogger('pickup', order);
;});

eventPool.on('in-transit', (order) => {
    eventLogger('in-transit', order);
;});

eventPool.on('delivered', (order) => {
    eventLogger('delivered', order);
;});