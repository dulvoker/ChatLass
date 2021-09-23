const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
//html and css
app.use(express.static(path.join(__dirname, '_html_css')));

//catching for connection
io.on('connection', socket => {
    console.log('Welcome');
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log('Server runs'));