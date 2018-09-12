var express = require('express');
var router = express.Router();
var debug = require('debug')('ciot');

var applicationManager = require('../managers/application.manager.js')

router.get('/image', (req, res, next)=>{

  applicationManager.listApplicationImages()
    .then((applicationImages)=>{

      res.status(200).send(applicationImages);
    })

    .catch((err)=>{
      debug(err.message);

      res.status(500).send(err.message);
    });
});

module.exports = router;
