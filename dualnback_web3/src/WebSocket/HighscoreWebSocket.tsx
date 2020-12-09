
class HighscoreWebSocket{

    start = async (callback:any) => {
        // Create WebSocket connection.
        const socket = new WebSocket('ws://localhost:8080');

        // Connection opened
        socket.addEventListener('open', function (event) {
            socket.send('Hello Server!');
        });

        // Listen for messages
        socket.addEventListener('message', function (event) {
            callback(event.data)
            console.log('Message from server ', event.data);
        });
    }
}

export default new HighscoreWebSocket();