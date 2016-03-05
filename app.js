

var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/html.html'))
});

io.on('connection', function(socket){
   var srvSockets = io.sockets.sockets;
   if(Object.keys(srvSockets).length === 1){
    io.emit('waiting for user', 'Waiting for the user');
    	}else{
    io.emit('user connected', 'Users connected!');
   }

	socket.on('disconnect', function(){
	    io.emit('user disconnected', 'User Disconnected')
	});

	socket.on('myClick', function () {
        socket.broadcast.emit('myClick');
    });

    socket.on('move', function(data){
    	socket.broadcast.emit('move', data);
    })

});

app.use(express.static(__dirname));

app.set('port', process.env.PORT || 8080);
http.listen(8080 || process.env.PORT, function () {
    console.log('Express server listening on port %d in %s mode', 8080, app.get('env'));
})

