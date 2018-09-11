'use strict';

var debug = require("debug")("keti");
var _ = require("lodash");
var UserModel = require('../models/user.model.js');
var ServiceModel = require('../models/service.model.js');
var MyServiceModel = require('../models/myservice.model.js');


function _createMyService(authToken, serviceInfo) {
  return new Promise((resolve, reject)=> {
    try {

      var _owner = null;

      UserModel.findOneByUserId(authToken.userid)
        .then((userDoc)=> {
          _owner = userDoc;

          return ServiceModel.create(_owner, serviceInfo);
        })

        .then((serviceDoc)=>{

          return MyServiceModel.create(_owner, serviceDoc);

        })

        .then((myserviceDoc)=>{

          resolve(myserviceDoc);
        })

        .catch((err)=>{
          debug('ERROR: ', err);

          reject(err);
        });

    }
    catch(ex) {
      debug('EXCEPTION: ', ex);
      reject(ex);
    }
  });
}

function _listMyservices(authToken) {

  return new Promise((resolve, reject)=>{

    try{
      var _owner = null;

      UserModel.findOneByUserId(authToken.userid)
        .then((userDoc)=> {
          _owner = userDoc;

          return ServiceModel.listMyservices(_owner);
        })

        .then((myserviceList)=>{

          resolve(myserviceList);
        })

        .catch((err)=>{
          debug("ERROR: ", err);
          reject(err);
        });
    }
    catch(ex) {
      debug("EXCEPTION: ", ex);
      reject(ex);
    }

  });

}

/**
 * Expose 'MyServiceManager'
 */
module.exports.listMyservices = _listMyservices;
module.exports.createMyService = _createMyService;

