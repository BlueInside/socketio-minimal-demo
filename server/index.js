const express = require('express');
const http = require('http'); // Import the HTTP module
const { Server } = require('socket.io'); // Import the Socket.IO module

const app = express();
const server = http.createServer(app); // Create an HTTP server instance from Express
const io = new Server(server, {
    cors: { origin: "*" } // Enable CORS for Socket.IO
});

// Serve static files or add routes (optional)
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the chat app!</h1>');
});

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for incoming messages
    socket.on('message', (message) => {
        console.log(message);
        // Broadcast the message to all connected clients
        io.emit('message', `${socket.id.substr(0, 2)} said: ${message}`);
    });

    // Handle user disconnects
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
server.listen(8080, () => {
    console.log('Listening on http://localhost:8080');
});

// Regular Websockets

// const WebSocket = require('ws')
// const server = new WebSocket.Server({ port: '8080' })

// server.on('connection', socket => { 

//   socket.on('message', message => {

//     socket.send(`Roger that! ${message}`);

//   });

// });



