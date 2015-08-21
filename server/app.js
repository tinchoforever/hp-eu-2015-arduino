var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



//io sockets would address to all the web-clients talking to this nodejs server
var io = require('socket.io')();

var sockets = [];
io.sockets.on('connection', function (socket) {
  console.log("new connnect"); 
  sockets.push(socket);
  //some web-client disconnects
  socket.on('disconnect', function (socket) {
    console.log("disconnect");
  });
  
  //some web-client sents in a msg
  socket.on('client', function (data) {
    console.log(data);
  });

  //we expect to get a ping from 
  //them saying what room they want to join
  socket.on('room', function(data) {
      if(socket.room){
          socket.leave(socket.room);
      }
      socket.room = data;
      console.log('new connection to: ' + data);
      socket.join(data);
    });


     
});

  var SerialPort = require("serialport").SerialPort;
  //Reemplazalo con el tuyo :)
  var port = "/dev/cu.usbmodem1411";
  var serialPort = new SerialPort(port, {
      baudrate: 115200
  });
  var receivedData = '';
  serialPort.on("open", function() {
      console.log('Arudino online!');
      serialPort.on('data', function(data) {
          

          receivedData += data.toString();
          // for (var i = 0; i < sockets.length; i++) {
          //      sockets[i].emit('grow',{size: receivedData});
          //    };
          console.log(receivedData);
          if (receivedData.indexOf('E') >= 0 && receivedData.indexOf('B') >= 0) {
           // save the data between 'B' and 'E'
             sendData = receivedData .substring(receivedData.indexOf('B') + 1, receivedData .indexOf('E'));
             receivedData = '';
             console.log('recieving', sendData);
             //uncomment me for broadcast! 
             
             // for (var i = 0; i < sockets.length; i++) {
             //   sockets[i].emit('grow',{size: receivedData});
             // };
           }

      });

  });
    
    
    
  process.on('SIGTERM', function () {
    if (server === undefined) return;
    server.close(function () {
      // Disconnect from cluster master
      process.disconnect && process.disconnect();
    });
});



app.io = io;
module.exports = app;
















