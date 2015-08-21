var socket = io();

socket.on('grow',function(message){
	console.log(message);
	var size = Math.random() * 50 + "px";
	d3.select("h1.change").transition().style("font-size", size);
})