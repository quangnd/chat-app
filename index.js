var express = require('express')
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 3000;

app.use(express.static('public'));

io.on('connection', function(socket){
    console.log('a user connected!');

    socket.on('chat message', function(msg){ 
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function() {
        console.log('user disconnect');
    });
});

server.listen(port, function(){
    console.log('Server listening at port %d', port);
});