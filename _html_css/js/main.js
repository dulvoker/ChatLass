const chatForm = document.getElementById('chat-form');
const socket = io();

socket.on('message', message => {
    console.log(message);
    outputFormattedMessage(message);
})

// sending message
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    socket.emit('messageSubmit', msg);
});

function outputFormattedMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta"> Dulat <span>time</span> </p> <p class="text">${message}</p>`
    document.querySelector('.chat-messages').appendChild(div);
}