var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
require('dotenv').config()


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var categoryRouter = require('./routes/category');
var favoriteRouter = require('./routes/favorite');
var billRouter = require('./routes/bill');
var postRouter = require('./routes/post');
var adminProductRouter = require('./routes/admin-product');
var adminPost = require('./routes/admin-post');
var adminCategory = require('./routes/admin-category');
var adminGiftCode = require('./routes/admin-giftcode');
var customRouter = require('./routes/custom');
var uploadImage = require('./routes/upload-image');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/category', categoryRouter);
app.use('/favorite', favoriteRouter);
app.use('/bill', billRouter);
app.use('/post', postRouter);
app.use('/admin-products', adminProductRouter);
app.use('/admin-post', adminPost);
app.use('/admin-category', adminCategory);
app.use('/admin-giftcode', adminGiftCode);
app.use('/custom', customRouter);
app.use('/upload-image', uploadImage);


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
