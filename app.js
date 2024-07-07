const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set view engine to EJS
app.set('view engine', 'ejs');

// Set the static files directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render('index');
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
