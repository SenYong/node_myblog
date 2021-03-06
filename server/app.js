var createError = require('http-errors');
var express = require('express');
var bodyParser = require("body-parser");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var route = require('./routes/index.js');
var app = express();

var debug = require('debug')('my-application'); // debug模块  
app.set('port', process.env.PORT || 3000); // 设定监听端口 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();  
}); 

route(app)




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express)
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

var server = app.listen(app.get('port'), function() {  
  debug('Express server listening on port ' + server.address().port);  
});

//module.exports = app;
