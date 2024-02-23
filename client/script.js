const protocol = window.location.protocol === 'http:' ? 'wss' : 'ws' ;
// deciding protocol here

//struct url
// const serverUrl = `${protocol}://${window.location.host}` ;
const serverUrl = `ws://localhost:3005` ;

const socket = new WebSocket(serverUrl);

socket.onopen = function(event){
    console.log(`connected to the WebSocket Server`)
};


socket.onmessage = function(event){
    const chatbox = document.getElementById(`chat-box`);
    const newMessage = document.createElement('div');
    
    if (typeof event.data === 'string') {
        // If the message is text, directly append it to the new div
        newMessage.textContent = event.data;
    } else {
        // If the message is binary, convert it to text
        const blob = new Blob([event.data]);
        const reader = new FileReader();
        reader.onload = function() {
            newMessage.textContent = reader.result;
        };
        reader.readAsText(blob);
    }
    
    chatbox.appendChild(newMessage);
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