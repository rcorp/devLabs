/**
 * require socket.io and coonect to port , here port no is 1180
 */
var io = require('socket.io').listen(1180);
/**
 * An object to store Socket object of every user by name
 * @type {Object}
 */
var onLine = {}
/**
 * An object to store all groups name
 * @type {Object}
 */
var group = {};

var onLine = {}
var onLineBySocket = {};
/**
 * On Connection - When a client gets connected
 * @param  {Object} socket An Object to identifiy the remote user
 * or client. Every client has its own unique socket. This socket
 * variable corresponds to the client who has just initiated any
 * socket event. 
 * Many user can initiate same socket event simultaneously but
 * Under this block, Socket will remain unique for every one.
 * Socket object will belong to the client whose has just 
 * communicated with server
 */
io.sockets.on('connection', function(socket) {
	/**
	 * A simple socket event at server side.
	 * Set up an identity over the network. Set client's name
	 * using socket.set function.
	 * @param  {String} name Set your name on network
	 */
	socket.on('connectMe', function(data) {
		socket.set('name', data.name)
		onLine[data.name] = socket
		onLineBySocket[socket.id] = data.name
		socket.get('name', function (err, name) {
			if(!err) {
				// send back acknowledgement to the client requested for
				// connectMe or registeration over this socket network
				socket.emit('connectionEstablished', name)
				// notify all remote user about this new socket or client
				socket.broadcast.emit('onLine',name)
			}
	    });
	});

	/**
	 * Predefined/Reserved event
	 * whenever a client gets disconnecte from server, this event 
	 * gets triggered
	 * @return {[type]}      [description]
	 */
    socket.on('disconnect', function() {
    	console.log(onLineBySocket, 'onLineBySocket')
		socket.get('name', function (err, name) {
			if(!err) {
		    	socket.broadcast.emit('notification', name + ' is now offLine')
			}
	    });
    })

	/**
	 * Socket Handler for sending private message to someone,
	 * @param  {String} to  Send To
	 * @param  {String} msg Message
	 */
	socket.on('privateMessage', function(data) {
		socket.get('name', function (err, name) {
			if(!err) {
				// get the user from list by its name to get its socket, 
				// then emit event privateMessage
				// again here we want to make you clear
				// that every single client connection has its own
				// unique SOcket Object, we need to get this Socket object
				// to communicate with every other client. The socket variable
				// in this scope is the client who wants to send the private 
				// message but the socket of the receiver is not know.
				// Get it from the saved list when connectMe handlers gets called
				// by each user.
				onLine[data.to].emit('newPrivateMessage',{from:name, msg:data.msg, type:'Private Msg'})
			}
	    });
	});


	/**
	 * Send Public Message or broadcast(to all except the sender itself)
	 */
	socket.on('publicMessage', function(data) {
		socket.broadcast.emit('newPublicMessage',{from:data.from, msg:data.msg, type:'Public Msg'})
	});

	/**
	 * Make and store some private rooms/group. For creating room
	 * socket.io itself has no role, we are just saving it in an object
	 * and we will refer this object when client wants to join
	 * any group
	 */
	socket.on('newGroup', function(data) {
		group[data.group] = data.group
		socket.emit('groupCreated',{from:'server', msg:'group ' + data.group + ' created'})
	});

	/**
	 * send object to client which stores all group name
	 */
	socket.on('getGroupList', function(data) {
		socket.emit('groupList',group)
	});

	/**
	 * Join a room/group
	 */
	socket.on('joinGroup', function(data) {
		if(group[data.group]) {
			socket.join(data.group)
			socket.emit('notification','You have joined ' + data.group)
		} else {
			socket.emit('notification','group ' + data.group + " doesn't exist")
		}
	});

	/**
	 * Leave a room/group
	 */
	socket.on('leaveGroup', function(data) {
		if(group[data.group]) {
			socket.leave(data.group)
			socket.emit('notification','You have Left ' + data.group)
		} else {
			socket.emit('notification','group ' + data.group + " doesn't exist")
		}
	});

	/**
	 * Broadcast message to every member of particular group
	 * using broadcast.to
	 */
	socket.on('groupMessage', function(data) {
		if(group[data.group]) {
			socket.broadcast.to(group[data.group]).emit('groupMessage',{from:data.from, msg:data.msg})
			socket.emit('notification','Message send')
		} else {
			socket.emit('notification','group ' + data.group + " doesn't exist")
		}
	});
});
