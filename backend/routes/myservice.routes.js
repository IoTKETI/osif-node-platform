var express = require('express');
var router = express.Router();
var debug = require('debug')('osif');

var myserviceManager = require('../managers/myservice.manager.js')

router.get('/', (req, res, next)=>{

  var authToken = req.auth ? req.auth.parsed : null;

  myserviceManager.listMyServices(authToken.cloudToken)
    .then((myserviceList)=>{

      res.status(200).send(myserviceList);
    })

    .catch((err)=>{
      debug(err.message);

      res.status(500).send(err.message);
    });
});

module.exports = router;
