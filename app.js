const express      = require('express'),
      cors         = require('cors'),
      path         = require('path'),
      favicon      = require('serve-favicon'),
      logger       = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser   = require('body-parser'),
      cons         = require('consolidate'),
      dust         = require('dustjs-helpers'),
      pg           = require('pg'),
      index        = require('./routes/index'),
      users        = require('./routes/users'),
      app          = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler

// development error handler
// will print stacktrace
if(app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.code || 500)
    .json({
      status: 'error',
      message: err
    });
  });
}

// production error handler
// no stacktrace leaked to user
app.use((err, req, res, next) => {
  res.status(err.code || 500)
  .json({
    status: 'error',
    message: err.message
  });
});

module.exports = app;
