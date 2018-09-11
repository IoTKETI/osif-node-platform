const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes        = require('./backend/routes/index');

const authRoutes    = require('./backend/routes/auth.routes.js');
const dashboardRoutes  = require('./backend/routes/dashboard.routes.js');
const openserviceRoutes  = require('./backend/routes/openservice.routes.js');
const myserviceRoutes  = require('./backend/routes/myservice.routes.js');

var authManager = require('./backend/managers/auth.manager.js')

var config = global.CONFIG;


var database = require('./backend/models/mongodb.js');
database.connect(config);





const app = express();

const env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


// set the secret key variable for jwt
app.set('jwt-secret', config.security.authSecret);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(authManager.tokenParser);

app.use('/', routes);

app.use('/auth', authRoutes);


app.use('/myservice', authManager.authCheck);

app.use('/dashboard', dashboardRoutes);
app.use('/openservice', openserviceRoutes);
app.use('/myservice', myserviceRoutes);

/// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
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
