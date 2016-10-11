var app = require('express')();
var http = require('http').createServer(app);
var socketio = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

// connect
socketio.on('connection', function(socket){
	console.log('a user connected');

	// custom event
	socketio.on('publish', function(data){
		console.log('publish');
	});

	// disconnect
	socketio.on('disconnect', function(socket){
		console.log('disconnect');
	});
});



http.listen(8080, function(){
	console.log('listening on *:8080');
});