const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//html and css
app.use(express.static(path.join(__dirname, '_html_css')));

const botName = "Dulat Koke ";

//events while connection
io.on('connection', socket => {

    //welcoming
    socket.emit('message', formatMessage(botName, ' Welcomes you in Chatlass'));

    //broadcasting to everyone except the user
    socket.broadcast.emit('message', formatMessage(botName, ' has joined the chat'));

    socket.on('messageSubmit', (msg) => {
        io.emit('message', formatMessage("Username ", msg));
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    });
});


const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log('Server runs'));