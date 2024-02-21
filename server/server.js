const express = require('express');
const app = express();
const http = require('http').createServer(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server: http });

const connectedClients = [];

app.use(express.static('../client'));

wss.on('connection', (ws) => { 
    console.log("New client connected");

    ws.on('message', (message) => {
        console.log('Received: ' + message)

        // Broadcast the message to all clients except the sender
        connectedClients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client Disconnected!');
    })
})

http.listen(3005, () => {
    console.log("App is listening at http://localhost:3005/");
});
