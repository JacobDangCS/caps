'use strict';

const { io } = require('socket.io-client');
const SOCKET_URL = process.env.SOCKET_URL || 'http://localhost:3002/messages';
const socket = client.connect(SOCKET_URL);

class MessageClient {
    constructor(client){
        this.client = client;
        this.socket = socket;
        this.socket.emit('JOIN', client);
        this.socket.on('JOIN', (id) => {
            console.log('Joined client queue', id);
        });
    }
    
    publish(event, payload){
        this.socket.emit(event, payload);
    }
    
    subscribe(event, eventHandler){
        this.socket.on(event, eventHandler);
    }
}

module.exports = MessageClient;
