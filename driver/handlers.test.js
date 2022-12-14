'use strict';

const { pickupInTransit, deliveryHandler } = require('./handlers');
//const eventPool = require('../eventPool');

let socket = require('../socket-client');

jest.mock(('../socket-client').io, () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();

describe('Driver', () => {

  it('picks up order and emits in transit as expected', () => {
    const payload = {
      store: '1-206-flowers',
      orderId: 'test123',
      customer: 'Jacob',
      address: 'home',
    };
    pickupInTransit(socket)(payload);
    expect(console.log).toHaveBeenCalledWith('Driver: picked up order:', payload.orderId);
    expect(socket.emit).toHaveBeenCalledWith('IN_TRANSIT', payload);
  });

  it('delivers as expected', () => {
    const payload = {
      store: '1-206-flowers',
      orderId: 'test123',
      customer: 'Jacob',
      address: 'home',
    };
    deliveryHandler(socket)(payload);
    expect(console.log).toHaveBeenCalledWith('Driver: order delivered: ', payload);
    expect(socket.emit).toHaveBeenCalledWith('DELIVERED', payload);
  });
});