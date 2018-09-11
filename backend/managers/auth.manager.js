var jwt   = require('jsonwebtoken');
var User  = require('../models/user.model.js');


exports.login = (req, res) => {
  const {userid, password} = req.body
  const secret = req.app.get('jwt-secret')

  // check the user info & generate the jwt
  // check the user info & generate the jwt
  const check = (user) => {
    if(!user) {
      // user does not exist
      throw new Error('login failed')
    } else {
      // user exists, check the password
      if(user.verify(password)) {
        // create a promise that generates jwt asynchronously
        const p = new Promise((resolve, reject) => {
          jwt.sign(
            {
              username: user.username,
              userid: user.userid,
              admin: user.admin
            },
            secret,
            {
              expiresIn: '1md',
              issuer: 'CIoT Platform',
              subject: 'User login'
            }, (err, token) => {
              if (err) reject(err)
              resolve(token)
            })
        })
        return p
      } else {
        throw new Error('login failed')
      }
    }
  }

  // respond the token
  const respond = (token) => {
    res.json({
      message: 'logged in successfully',
      token
    })
  }

  // error occured
  const onError = (error) => {
    res.status(403).json({
      message: error.message
    })
  }

  // find the user
  User.findOneByUserId(userid)
    .then(check)
    .then(respond)
    .catch(onError)
};

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
