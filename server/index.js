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

	// 
	socket.on('c2s_message', function(msg){
		console.log('client message : ' + JSON.parse(msg)['message']);
		socketio.emit('s2c_message', msg);
	});

	socket.on('other message', function(msg){
		console.log('other message');
		socket.emit('other message', msg);
	});

	// disconnect
	socket.on('disconnect', function(socket){
		console.log('disconnect');
	});
});

http.listen(PORT, function(){
	console.log('listening on *:' + PORT);
});

// すべてのメッセージは'c2s_messageに流す'
// そこから、すべてのClientへ送信する