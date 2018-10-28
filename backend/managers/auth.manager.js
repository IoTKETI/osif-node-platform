var jwt   = require('jsonwebtoken');
var Http  = require('request-promise');
var debug = require('debug')('osif');


exports.cloudLogin = (req, res)=> {
  var userid = req.body.userid;
  var password = req.body.password;
  var secret = req.app.get('jwt-secret');

  try {
    var body = {
      "userid": userid,
      "password": password
    };

    var options = {
      method: 'POST',
      uri: global.CONFIG.cloudPlatform.api + "/auth/token",
      body: body,
      json: true
    };

    Http(options)
      .then(function (result) {
        var cloudToken = result.token;
        var decoded = jwt.decode(cloudToken);

        var nodeToken = jwt.sign(
          {
            username: decoded.username,
            userid: decoded.userid,
            admin: decoded.admin,
            cloudToken: cloudToken
          },
          secret,
          {
            expiresIn: '4w',
            issuer: 'OSIF Device Platform',
            subject: 'User login'
          }
        );

        res.json({
          message: 'logged in successfully',
          token: nodeToken
        })
      }, function (err) {
        debug('ERROR', err);

        res.status(403).json({
          message: err.message
        })
      });
  }
  catch(ex) {
    debug('EXCEPTION', ex);
    res.status(500).json({
      message: ex.message
    })  }
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
