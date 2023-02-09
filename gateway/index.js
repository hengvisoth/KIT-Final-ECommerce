var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var proxy = require('express-http-proxy')
var app = express();

app.use('/api/blog', proxy('http://localhost:3002', ))
app.use('/api/users', proxy('http://localhost:5000'))
app.use('/api/orders',proxy('http://localhost:3004'))


app.listen(3000,()=>{
    console.log("Gateway is listening to Port 3000")
})

module.exports = app;
