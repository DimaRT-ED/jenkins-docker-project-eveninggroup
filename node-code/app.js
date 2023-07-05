var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors= require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var menuRouter = require('./routes/menu');
var orderRouter = require('./routes/order');
var personalRouter = require('./routes/personal');
var chatRouter = require('./routes/chat');

var app = express();
// for http cookie token
app.use(cors({
  credentials: true
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/home', homeRouter);
app.use('/login',loginRouter);
app.use('/register', registerRouter);
app.use('/menu', menuRouter);
app.use('/order', orderRouter);
app.use('/personal', personalRouter);
app.use('/users', usersRouter);
app.use('/chat', chatRouter);


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
