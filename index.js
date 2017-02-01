var express = require('express')
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 3000;

app.use(express.static('public'));

var numUsers = 0;
io.on('connection', function(socket){
    var addedUser = false;

    socket.on('new message', function(msg){ 
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: msg
        });
    });

    socket.on('add user', function(username){
        if (addedUser) return;

        // we store the username in the socket session for this client
        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers
        });

        //TODO: process user joined
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        })
    })
    socket.on('disconnect', function() {
        console.log('user disconnect');
        if (addedUser) {
            --numUser;
        }
    });
});

server.listen(port, function(){
    console.log('Server listening at port %d', port);
});