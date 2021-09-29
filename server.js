const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getUserById, userLeave, getRoomUsers } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//html and css
app.use(express.static(path.join(__dirname, '_html_css')));

const botName = "Dulat Koke ";

//events while connection
io.on('connection', socket => {
    socket.on('joinRoom', ({username, room})=> {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);
        //welcoming
        socket.emit('message', formatMessage(botName, ' Welcome to ChatLass'));
        // broadcasting to everyone except the user
        socket.broadcast
            .to(user.room)
            .emit('message',formatMessage(botName, `${user.username} has joined the chat`));

        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });

    });
    socket.on('messageSubmit', (msg) => {
        user = getUserById(socket.id);
        io.to(user.room).emit('message', formatMessage( user.username, msg) );
    })
    socket.on('disconnect', () => {
        const userInfo = userLeave(socket.id);

        if (userInfo) {
            io.to(userInfo.room).emit('message', formatMessage(botName, userInfo.username + `  has left the chat`));
        }
        io.to(userInfo.room).emit('roomUsers', {
            room: userInfo.room,
            users: getRoomUsers(userInfo.room)
        });
    });
});


const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log('Server runs'));