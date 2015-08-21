var socket = io();

socket.on('grow',function(message){
	console.log(message);
	var size = Math.random() * 100 + "px";
	d3.select("h1.mutate").transition().style("font-size", size);
})