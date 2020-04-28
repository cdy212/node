var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//custom study
var tasksRouter = require('./study/0.tasks');
var ES6To10_Restful = require('./study/1.ES6To10_Restful');


var app = express();

//global config
global._db_kr_ajis = require("./properties.json")._db_kr_ajis;
global._db_kr_intra = require("./properties.json")._db_kr_intra;
global._db_kr_crewing = require("./properties.json")._db_kr_crewing;
const mssql = require('mssql')

  global.poolPromise  = new mssql.ConnectionPool(global._db_kr_ajis).connect();
  

//package-lock.json
//https://hyunjun19.github.io/2018/03/23/package-lock-why-need/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/ES6To10_Restful', ES6To10_Restful);


app.use('/tasks', tasksRouter);



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

module.exports = app;
