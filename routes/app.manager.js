const express = require('express');
const router = express.Router();
const debug = require('debug')('keti');

const applicationLifecycleManager = require('./logics/application.lifecycle.manager.js');

/* GET users listing. */
router.get('/image', function(req, res) {

  try {
    applicationLifecycleManager.listApplicationImages()
      .then(function(imageList){
        res.status(200).json(imageList);
      })
      .catch(function(err){
        debug(err);
        res.status(500).send(err);
      });
  }
  catch(ex) {
    debug(ex);
    res.status(500).send(ex);
  }

});


router.put('/image/:imageId/run', function(req, res) {

  try {
    applicationLifecycleManager.runApplication(req.params.imageId)
      .then(function(container){
        res.status(200).json(container);
      })
      .catch(function(err){
        debug(err);
        res.status(500).send(err);
      });
  }
  catch(ex) {
    debug(ex);
    res.status(500).send(ex);
  }

});



router.get('/container', function(req, res) {

  try {
    applicationLifecycleManager.listRunningApplications()
      .then(function(containerList){
        res.status(200).json(containerList);
      })
      .catch(function(err){
        debug(err);
        res.status(500).send(err);
      });
  }
  catch(ex) {
    debug(ex);
    res.status(500).send(ex);
  }

});

router.put('/container/:containerId/:command', function(req, res) {

  try {
    switch(req.params.command) {
      case 'stop':
        applicationLifecycleManager.stopApplication(req.params.containerId)
          .then(function(container){
            res.status(200).json(container);
          })
          .catch(function(err){
            debug(err);
            res.status(500).send(err);
          });

        break;

      case 'start':
        applicationLifecycleManager.startApplication(req.params.containerId)
          .then(function(container){
            res.status(200).json(container);
          })
          .catch(function(err){
            debug(err);
            res.status(500).send(err);
          });

        break;



    }

  }
  catch(ex) {
    debug(ex);
    res.status(500).send(ex);
  }

});


module.exports = router;
