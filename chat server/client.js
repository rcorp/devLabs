/**
 * Connect to remote host
 * @param  {String} IP Address of remote host with Port No.
 * @return {Object}
 */
var socket = io.connect('http://localhost:1180');

/**
 * get User Name from url
 * @type {String} - url
 */
var myName = window.location.search.match(/=(\w+)/)[1];

// Some predefined/reserved socket events
/**
 * Checking Status of My Connection
 * If Connection gets disconnect, socket will try to auto-connect after some interval
 */
socket.on('reconnecting', function(data) {
    console.log('Trying to Re-Connect')
});

/**
 * If socket founds Connection then it started process of connection
 * this is connnecting
 */
socket.on('connecting', function() {
    console.log('Connecting')
})
/**
 * Event triggered when socket gets connected successfully
 */
socket.on('connect', function() {
    console.log('Connected')
});

/**
 * Though we have connected to the socket without any kind
 * of authorisation and any identity. Let's set up an identity
 * over the network. Set your name.
 * @param  {String} name Set your name on network
 */
function connectMe(name) {
    socket.emit('connectMe', {
        name: name
    });
    myName = name
}

/**
 * call connectMe function. It will emit a socket request to server
 * to set your name.
 * For this we will use socket.set and socket.get at server side
 */
connectMe(myName)

/**
 * User Defined Socket Handler/Event
 * @param  {String} name send by server
 * @return {[type]}
 */
socket.on('connectionEstablished', function(name) {
    console.log('Welcome: ' + name)
})

/**
 * Want to know who has just come onLine
 */
socket.on('onLine', function(name) {
    console.log(name + ' is now onLine')
})

/**
 * Send private message to someone,
 * server will append your name in 'From' 
 * at server side using socket.get
 * @param  {String} to  Send To
 * @param  {String} msg Message
 */
function privateMessage(to, msg) {
    socket.emit('privateMessage', {
        to: to,
        msg: msg
    });
}
/**
 * Receive New Private Message
 * data.type added by server
 */
socket.on('newPrivateMessage', function(data) {
    console.log(data.type + ' from ' + data.from + ': ' + data.msg)
})

/**
 * Send Public Message or broadcast(to all except me)
 * server will append your name in 'From' 
 * at server side using socket.get
 * @param  {String} msg Message
 */
function publicMessage(msg) {
    socket.emit('publicMessage', {
        from: myName,
        msg: msg
    });
}
/**
 * Receive New Public Message
 * data.type added by server
 */
socket.on('newPublicMessage', function(data) {
    console.log(data.type + ' from ' + data.from + ': ' + data.msg)
})

/**
 * Make some private rooms/group
 * @param  {String} group Name of the Group
 */
function createGroup(group, msg) {
    socket.emit('newGroup', {
        group: group
    });
}

/**
 * Acknowledgemenet from server, group created
 * data.from, data.msg added by server
 */
socket.on('groupCreated', function(data) {
    console.log(' from ' + data.from + ': ' + data.msg)
})

/**
 * Get List of available groups from server
 */
function getGroupList() {
    socket.emit('getGroupList');
}

/**
 * List of all groups from server
 */
socket.on('groupList', function(data) {
    console.log(' groupList ', data)
})

/**
 * Join a room/group
 * @param  {String} group Name of the group to join
 */
function joinGroup(group) {
    socket.emit('joinGroup', {
        group: group
    });
}

/**
 * Send group Messages (To All in Group except me)- Not Public Message(To All)
 * @param  {String} group GroupName in which you want to send message
 * @param  {String} msg   Message
 */
function groupMessage(group, msg) {
    socket.emit('groupMessage', {
        group: group,
        from: myName,
        msg: msg
    });
}

/**
 * Receive group message
 */
socket.on('groupMessage', function(data) {
    console.log('Group Mesage from ' + data.from + ': ' + data.msg)
})

/**
 * Leave a room/group
 * Stop receiving messages from a group
 * @param  {String} group Name of the group to Leave
 */
function leaveGroup(group) {
    socket.emit('leaveGroup', {
        group: group
    });
}

/**
 * Get Custom Notifications or Error messages from Server
 */
socket.on('notification', function(msg) {
    console.log(msg)
})




