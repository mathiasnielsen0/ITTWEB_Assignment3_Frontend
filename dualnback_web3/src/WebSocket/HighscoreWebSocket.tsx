const API_URL = window.location.hostname.includes("://localhost") ? "ws://localhost:5000" : " ws://obscure-refuge-32890.herokuapp.com/";
class HighscoreWebSocket{

    start = async (callback:any) => {
        // Create WebSocket connection.
        const socket = new WebSocket(API_URL);

        // Connection opened
        socket.addEventListener('open', function (event) {
            socket.send('Hello Server!');
        });

        // Listen for messages
        socket.addEventListener('message', function (event) {
            callback(JSON.parse(event.data))
            //console.log('Message from server ', JSON.parse(event.data));
        });
    }
}

export default new HighscoreWebSocket();