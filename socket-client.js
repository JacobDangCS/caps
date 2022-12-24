'use strict';

//const Event = require('events');
//const eventPool = new Event();

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');

module.exports = socket;