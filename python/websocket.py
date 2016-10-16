#!/usr/bin/env python
from flask import Flask, render_template, session, request
from flask_socketio import SocketIO, emit, join_room, leave_room, \
    close_room, rooms, disconnect

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
socketio = SocketIO(app)

@app.route('/')
def index():
	# return render_template('index.html')
	return 'aa'

@socketio.on('my event')
def test_message():
	emit('my response', {'message' : 'get'})

if __name__ == '__main__':
	socketio.run(app)