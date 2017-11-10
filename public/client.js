var socket = io();

socket.on('connect', function() {
    console.log('connected to the server');
});

socket.on('disconnect', function() {
    console.log('disconnected from the server');
});

jQuery('#roomName').on('submit', function(e) {
    e.preventDefault();
    jQuery.ajax({
        url: '/userId',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            text: jQuery('[name=room]').val()
        })
    }).done((res) => {
        console.log(res);
        var addressID = res._id;
        window.location.assign("http://localhost:3000/rooms/" + addressID);
    });
});

jQuery('#joinRoom').on('submit', function(e) {
    e.preventDefault();
    jQuery.ajax({
        url: '/getuserId',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            text: jQuery('[name=roomCode]').val()
        })
    }).done((res) => {
        console.log(res);
        var addressID = res._id;
        window.location.assign("http://localhost:3000/rooms/" + addressID);
    });
});