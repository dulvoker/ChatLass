const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//html and css
app.use(express.static(path.join(__dirname, '_html_css')));

//events while connection
io.on('connection', socket => {

    //welcoming
    socket.emit('message', 'Welcome to ChatLass');

    //broadcasting to everyone except the user
    socket.broadcast.emit('message', 'New user has joined the chat');

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    })
});


const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log('Server runs'));