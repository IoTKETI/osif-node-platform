var Http  = require('request-promise');
var debug = require('debug')('osif');


exports.listMyServices = (cloudToken)=> {

  return new Promise(function(resolve, reject) {

    try {
      var options = {
        method: 'GET',
        uri: global.CONFIG.cloudPlatform.api + "/myservice",
        headers: {
          "x-access-token": cloudToken
        },
        json: true
      };

      Http(options)
        .then(function (result) {

          resolve(result);
        }, function (err) {
          debug('ERROR', err);

          reject(err);
        });
    }
    catch(ex) {
      debug('EXCEPTION', ex);
      reject(ex);
    }
  });
}

exports.check = (req, res) => {
  res.json({
    success: true,
    info: req.auth
  })
};


exports.tokenParser = (req, res, next) => {
  // read the token from header or url
  const token = req.headers['x-access-token'] || req.query.token

  // token does not exist
  if(!token) {
    req.auth = null;
    return next();
  }

  return new Promise((resolve, reject)=> {
    try {
      var auth  = {
        token: token
      };

      jwt.verify(token, req.app.get('jwt-secret'), (err, authToken) => {
        if(err) {
          auth.parsed = null;
          auth.error = err;

          req.auth = auth;
          next();
        }
        else {
          auth.parsed = authToken;
          auth.error = null;

          req.auth = auth;
          next();
        }
      });
    }
    catch(ex) {
      next();
    }
  });
};


exports.authCheck = (req, res, next) => {

  if(!req.auth) {
    return res.status(403).json({
      success: false,
      message: 'Login required'
    });
  }

  else if(req.auth.parsed) {
    return next();
  }

  else {
    return res.status(403).json({
      success: false,
      message: req.auth.error.name
    });
  }
};
