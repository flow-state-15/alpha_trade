const express = require('express');
const WebSocket = require('ws');

const app = express();

const socket_server = app.listen(9000, () => {
  console.log('WebSocket server listening on port 9000');
});

const wss = new WebSocket.Server({ server: socket_server });

wss.on('connection', (ws, req) => {
  console.log('New WebSocket connection');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  ws.send('Hello, client!');
});

module.exports = {
    wss,
    socket_server
}