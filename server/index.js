var express = require('express');
var app = express();
var http = require('http').createServer(app);
var socketio = require('socket.io')(http);

var PORT = 8080;

app.use('/css', express.static('css'));
app.use('/img', express.static('img'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

// connect
socketio.on('connection', function(socket){
	console.log('a user connected');

	// message
	socketio.on('message', function(msg){
		console.log('chat message');
		socketio.emit('chat message', msg);
	});

	// disconnect
	socketio.on('disconnect', function(socket){
		console.log('disconnect');
	});
});

http.listen(PORT, function(){
	console.log('listening on *:8080');
});
