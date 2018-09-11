const express = require('express');
const router = express.Router();

const openserviceManager = require('../managers/openservice.manager.js')

/* GET list open services */
router.get('/', (req, res) => {
  var page = parseInt(req.query.page || 1);
  var rowsPerPage = parseInt(req.query.rowsPerPage || 20);

  openserviceManager.listOpenservices(page, rowsPerPage)
    .then(function(openserviceList){
      //  Success listControlNodeTypes
      res.status(200).send(openserviceList);

    }, function(err){
      //  Fail listControlNodeTypes
      res.status(500).send(err.message);
    })
});


module.exports = router;
