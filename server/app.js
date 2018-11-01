var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
ejs=require('ejs');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express);//ejs能够识别后缀为’.html’的文件
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));//设置静态文件目录

app.use('/', index);
app.use('/users', users);

app.use(function(req, res, next){
  res.io = io;
  next();
});

//设置socket端口和监听
var port = 3001;
app.set('port', port);
server.listen(port);
//建立socket连接
io.on('connection', (socket)=>{
  require('./routes/websocket').websocket(socket,io);
});


/*io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world1' });
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('news', data);
  });
});*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

exports.app = app;
exports.io = io;
