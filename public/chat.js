var socket = io();

$(document).ready(function(){
    let connectedUsername = '';
    let connected = false;
    let typing = false;

    if (!connectedUsername) {
        connectedUsername = prompt('Enter your nickname: ');
        $('#userOnlineList').append($('<li>').text(connectedUsername));

        // Tell the server your username
      socket.emit('add user', connectedUsername);
    }

    $('form').submit(function(){
        let message = $('#m').val();
        socket.emit('new message', message);
        
        $('#m').val('');
        return false;
    });

    socket.on('new message', function(data){
        console.log(data.username + ' sent content:' + data.message);
        $('#messages').append($('<li>').text(`${data.username}: ${data.message}`));
    });

    socket.on('login', function(data) {
        console.log('Welcome to Socket.IO Chat –');
        connected = true;

        addParticipantsMessage(data);
    })

    socket.on('user joined', function(data){
        console.log(data.username + ' joined');
        addParticipantsMessage(data);
    })

    function addParticipantsMessage (data) {
        var message = '';
        if (data.numUsers === 1) {
             message += "there's 1 participant";
        } else {
             message += "there are " + data.numUsers + " participants";
        }

        console.log(message);
        $('#numUser').text(message);
        //log(message);
    }


    function addChatMessage(data, options) {

    }
});

