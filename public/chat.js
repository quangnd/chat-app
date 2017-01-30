var socket = io();

$(document).ready(function(){
    let connectedUsername = '';
    let connected = false;
    let typing = false;

    if (!connectedUsername) {
        connectedUsername = prompt('Enter your nickname: ');
        $('#userOnlineList').append($('<li>').text(connectedUsername));
    }

    $('form').submit(function(){
        let message = $('#m').val();
        socket.emit('new message', message);
        
        $('#m').val('');
        return false;
    });

    socket.on('new message', function(data){
        $('#messages').append($('<li>').text(`${data.username}: ${data.message}`));
    });

    socket.on('login', function(data) {
        connected = true;

        addParticipantsMessage(data);
    })

    function addParticipantsMessage (data) {
        var message = '';
        if (data.numUsers === 1) {
             message += "there's 1 participant";
        } else {
             message += "there are " + data.numUsers + " participants";
        }

        $('#numUser').val(message);
        log(message);
    }


    function addChatMessage(data, options) {

    }
});

