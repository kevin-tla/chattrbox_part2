var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
    port: port
});

//Where old messages will be stored
var messages = [];
console.log('websockets server started');


/*
Echo Server: make server repeat any msgs sent to it
use:  wscat -c ws://localhost:3001, to connect
*/


ws.on('connection', function(socket) {
    console.log('client connection established');
    messages.forEach(function(msg) {
        socket.send(msg);
    });
    socket.on('message', function(data) {
        console.log('message received: ' + data);
        messages.push(data);
        ws.clients.forEach(function(clientSocket) {
            clientSocket.send(data);
        });
    });
});
