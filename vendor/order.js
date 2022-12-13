'use strict';

const Chance = require('chance');

class Order {
    constructor(){
        this.store = chance.company();
        this.id = chance.guid();
        this.customer = chance.name();
        this.address = chance.address();
    }
}

module.exports = Order;