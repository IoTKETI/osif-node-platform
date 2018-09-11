'use strict';

var debug = require("debug")("keti");
var _ = require("lodash");
var ServiceModel = require('../models/service.model.js');


function _listOpenservices(page, rowsPerPage) {

  return new Promise((resolve, reject)=>{

    try{
      ServiceModel.listOpenservices(page, rowsPerPage)
        .then((openserviceList)=>{


          resolve(openserviceList);
        })

        .catch((err)=>{
          reject(err);
        });
    }
    catch(ex) {
      reject(ex);
    }

  });

}

/**
 * Expose 'CompositedVoManager'
 */
module.exports.listOpenservices = _listOpenservices;

