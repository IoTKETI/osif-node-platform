const express = require('express');
const router = express.Router();

const myserviceManager = require('../managers/myservice.manager.js')

/* GET list my services */
router.get('/', (req, res) => {
  var authToken = req.auth ? req.auth.parsed : null;

  myserviceManager.listMyservices(authToken)
    .then(function(myserviceList){
      //  Success listControlNodeTypes
      res.status(200).send(myserviceList);

    }, function(err){
      //  Fail listControlNodeTypes
      res.status(500).send(err.message);
    })
});


/* POST register my service. */
router.post('/', (req, res) => {

  var authToken = req.auth ? req.auth.parsed : null;
  var serviceInfo = req.body;

  myserviceManager.createMyService(authToken, serviceInfo)
    .then(function(myserviceList){
      //  Success listControlNodeTypes
      res.status(200).send(myserviceList);

    }, function(err){
      //  Fail listControlNodeTypes
      res.status(500).send(err.message);
    })
});


module.exports = router;
