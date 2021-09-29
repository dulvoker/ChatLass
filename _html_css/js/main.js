const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const socket = io();

const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix:true,
});

//separating by Blocks
socket.emit('joinRoom', {username, room});

socket.on('roomUsers', ( {room, users} ) => {
    updateRoomName(room);
    updateUsersInRoom(users);
});

socket.on('message', message => {
    console.log(message);
    outputFormattedMessage(message);

    //chat page is always on the bottom with the newest messages
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

// sending message
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    socket.emit('messageSubmit', msg);

    //clear input blank and focus on message
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

function outputFormattedMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span> </p> <p class="text">${message.text}</p>`
    document.querySelector('.chat-messages').appendChild(div);
}

function updateRoomName(room) {
    roomName.innerText = room;
}

function updateUsersInRoom(users) {
    userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}