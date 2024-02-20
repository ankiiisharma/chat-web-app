const protocol = window.location.protocol === 'http:' ? 'wss' : 'ws' ;
// deciding protocol here

//struct url
// const serverUrl = `${protocol}://${window.location.host}` ;
const serverUrl = `ws://localhost:3005` ;

const socket = new WebSocket(serverUrl);

socket.onopen = function(event){
    console.log(`connected to the WebSocket Server`)
};

socket.onerror = function(error){
    console.error('WebSocket Error:', error)
};

const button = document.getElementById("send-btn");

button.addEventListener('click', () => {
    const messageInput = document.getElementById('chat-input');
    const message = messageInput.value.trim();
 
    if(message){
        socket.send(message)
        messageInput.value = ''
    }
});