const express = require('express');
const router = express.Router();

const systemManager = require('../managers/dashboard.manager.js')


/* GET databoard data */
router.get('/', (req, res) => {

  var authToken = req.auth ? req.auth.parsed : null;

  systemManager.getDashboardData(authToken)
    .then(function(dashboardData){
      //  Success getDashboardData
      res.status(200).send(dashboardData);

    }, function(err){
      //  Fail getDashboardData
      res.status(500).send(err.message);
    })
});

module.exports = router;
