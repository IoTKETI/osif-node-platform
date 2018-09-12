var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes        = require('./backend/routes/index');

var authRoutes    = require('./backend/routes/auth.routes.js');
var myserviceRoutes    = require('./backend/routes/myservice.routes.js');
var applicationRoutes    = require('./backend/routes/application.routes.js');

var authManager   = require('./backend/managers/auth.manager.js')

var uuidv4 = require('uuid/v4');

var config = global.CONFIG;


var app = express();

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


// set the secret key variable for jwt
app.set('jwt-secret', uuidv4());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(authManager.tokenParser);

app.use('/', routes);

app.use('/auth', authRoutes);

app.use('/myservice', authManager.authCheck);
app.use('/myservice', myserviceRoutes);

app.use('/apps', authManager.authCheck);
app.use('/apps', applicationRoutes);


//app.use('/myservice', authManager.authCheck);

/// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.sendFile(path.join(__dirname+'/frontend/error.500.html'));

    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.sendFile(path.join(__dirname+'/frontend/error.500.html'));
});

module.exports = app;
