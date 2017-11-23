var _ = require('lodash');
var debug = require('debug')('keti');

var dockerHelper = require('./docker.helper.js');

module.exports.listApplicationImages = _listApplicationImages;
module.exports.runApplication = _runApplication;
module.exports.startApplication = _startApplication;
module.exports.stopApplication = _stopApplication;

module.exports.listRunningApplications = _listRunningApplications;

const IMAGE_ID_PREFIX = 'sha256:';

function __findImage(imageList, imageId) {
  var imageIndex = imageList.findIndex(function(item){
    if((IMAGE_ID_PREFIX+item.id) === imageId)
      return true;
    else
      return false;
  });

  if(imageIndex != -1) {
    return imageList[imageIndex];
  }
  else {
    return null;
  }
}


function _listApplicationImages() {
  return new Promise(function(resolve, reject){
    try {
      dockerHelper.listDockerImages()
        .then(function(imageList){

          _listRunningApplications()
            .then(function(containerList){

              //  merge container list and image list
              containerList.map(function(item){
                var image = __findImage(imageList, item.imageId);

                if( image )
                  image.container = item;
              });

              resolve(imageList);
            })
            .catch(function(err){
              debug(err);

              //  error 발생 시 container list 반영되지 않은 image list만 반환
              resolve(imageList);
            });

        })
        .catch(function(err){
          reject(err);
        });
    }
    catch(ex) {
      debug(ex);
      reject(ex);
    }
  });
}


function _runApplication(imageId) {
  return new Promise(function(resolve, reject){
    try {


      //  get image name
      dockerHelper.runImage(imageId)
        .then(function(container){
          resolve(container);
        })
        .catch(function(err){
          debug(err);
          reject(err);
        });

    }
    catch(ex) {
      debug(ex);
      reject(ex);
    }
  });
}


function _startApplication(containerId) {
  return new Promise(function(resolve, reject){
    try {
      dockerHelper.startContainer(containerId)
        .then(function(container){
          resolve(container);
        })
        .catch(function(err){
          reject(err);
        });
    }
    catch(ex) {
      debug(ex);
      reject(ex);
    }
  });
}


function _stopApplication(containerId) {
  return new Promise(function(resolve, reject){
    try {
      dockerHelper.stopContainer(containerId)
        .then(function(container){
          resolve(container);
        })
        .catch(function(err){
          reject(err);
        });
    }
    catch(ex) {
      debug(ex);
      reject(ex);
    }
  });
}



function _listRunningApplications() {
  return new Promise(function(resolve, reject){
    try {
      dockerHelper.listDockerContainers()
        .then(function(containerList){
          resolve(containerList);
        })
        .catch(function(err){
          reject(err);
        });
    }
    catch(ex) {
      debug(ex);
      reject(ex);
    }
  });
}

