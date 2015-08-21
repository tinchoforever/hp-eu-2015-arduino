var socket = io();

socket.on('grow',function(message){
	console.log(message);
})