'use strict';

const { generateOrder, thankDriver } = require('./handlers');
let socket = require('../socket-client');

jest.mock('../socket-client', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();

describe('Vendor', () => {
  it('emits order as expect', () => {
    const payload = {
      store: '1-206-flowers',
      orderId: 'test123',
      customer: 'Jacob',
      address: 'home',
    };
    generateOrder(payload);
    expect(console.log).toHaveBeenCalledWith('Vendor: order ready for pickup');
    expect(socket.emit).toHaveBeenCalledWith('PICKUP', payload);
  });
  it('thanks the driver', () => {
    thankDriver({customer: 'Jacob'});
    expect(console.log).toHaveBeenCalledWith('Vendor: Thank you for delivering to: ', 'Jacob');
  });
});