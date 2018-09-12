var _ = require('lodash');
var debug = require('debug')('keti');

var Docker = require('node-docker-api').Docker;
var docker = new Docker({socketPath: '/var/run/docker.sock'});




module.exports.listDockerImages = _listDockerImages;
module.exports.listDockerContainers = _listDockerContainers;

module.exports.runImage = _runImage;

module.exports.startContainer = _startContainer;
module.exports.stopContainer = _stopContainer;


function _listDockerImages() {
  return new Promise(function(resolve, reject){
    try {

      docker.image.list({all:false})
        .then(function(images){

          var imageList = [];
          images.map(function(item){

            var id = item.id.split(':')[1];
            var shortId = id.substring(0, 12);

            var fullName = '';
            if( item.data.RepoTags && item.data.RepoTags.length > 0) {
              fullName = item.data.RepoTags[0];
            }

            var tagIndex = fullName.lastIndexOf(':');
            var name = fullName.substring(0, tagIndex);
            var tag = fullName.substring(tagIndex+1);

            var ownerIndex = name.lastIndexOf('/');
            var owner = '';
            if(ownerIndex != -1) {
              owner = name.substring(0, ownerIndex);
              name = name.substring(ownerIndex+1);
            }

            var image = {
              id : id,
              shortId: shortId,
              fullName: fullName,
              owner: owner,
              name: name,
              tag: tag
            };
            imageList.push(image);
          });

          resolve(imageList);
        })

        .catch(function(ex){
          debug(ex);
          reject(ex);
        });
    }
    catch(ex) {
      debug(ex);
      reject(ex);
    }
  });
}


function _listDockerContainers() {
  return new Promise(function(resolve, reject){
    try {

      docker.container.list({all:true})
        .then(function(containers){

          var containerList = [];
          containers.map(function(item){

            var id = item.id;
            var shortId = id.substring(0, 12);

            var name = '';
            if(item.data.Names.length > 0)
              name = item.data.Names[0];

            var imageName = item.data.Image;
            var imageId = item.data.ImageID;
            var command = item.data.Command;
            var port = null;
            if(item.data.Ports.length > 0)
              port = item.data.Ports[0];
            var state = item.data.State;

            var container = {
              id : id,
              shortId: shortId,
              name: name,

              imaegName: imageName,
              imageId: imageId,
              command: command,

              port: port,
              state: state
            };
            containerList.push(container);
          });

          resolve(containerList);
        })

        .catch(function(ex){
          debug(ex);
          reject(ex);
        });
    }
    catch(ex) {
      debug(ex);
      reject(ex);
    }
  });
}




function _runImage(imageId) {
  return new Promise(function(resolve, reject){
    try {

      var targetImage = docker.image.get(imageId);

      targetImage.status(imageId)
        .then(function(image){
          if(image == null) {
            return reject('not found');
          }
          else {
            var newContainer = {
              Image: image.id
            }

            return docker.container.create(newContainer);
          }
        })

        .then(function(container){


          if(!container) {
            return reject('cannot create container');
          }
          else {
            return container.start();
          }
        })

        .then(function(container){
          var filters = {
            "id": [container.id]
          }

          return docker.container.list({"all": true, "filters": filters});
        })

        .then(function(containers){

          if(containers && containers.length > 0) {
            var item = containers[0];

            var id = item.id;
            var shortId = id.substring(0, 12);

            var name = '';
            if(item.data.Names.length > 0)
              name = item.data.Names[0];

            var imageName = item.data.Image;
            var imageId = item.data.ImageID;
            var command = item.data.Command;
            var port = null;
            if(item.data.Ports.length > 0)
              port = item.data.Ports[0];
            var state = item.data.State;

            var container = {
              id : id,
              shortId: shortId,
              name: name,

              imaegName: imageName,
              imageId: imageId,
              command: command,

              port: port,
              state: state
            };

            resolve(container);
          }
          else {
            debug( 'no result');
            reject(new Error('no result'));
          }
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


function _startContainer(containerId) {
  return new Promise(function(resolve, reject){
    try {


      var container = docker.container.get(containerId);
      if(!container) {
        return reject('not found');
      }

      container.start()
        .then(function(container) {

          var filters = {
            "id": [containerId]
          }


          return docker.container.list({"all": true, "filters": filters});
        })

        .then(function(containers){

          if(containers && containers.length > 0) {
            var item = containers[0];

            var id = item.id;
            var shortId = id.substring(0, 12);

            var name = '';
            if(item.data.Names.length > 0)
              name = item.data.Names[0];

            var imageName = item.data.Image;
            var imageId = item.data.ImageID;
            var command = item.data.Command;
            var port = null;
            if(item.data.Ports.length > 0)
              port = item.data.Ports[0];
            var state = item.data.State;

            var container = {
              id : id,
              shortId: shortId,
              name: name,

              imaegName: imageName,
              imageId: imageId,
              command: command,

              port: port,
              state: state
            };

            resolve(container);
          }
          else {
            debug( 'no result');
            reject(new Error('no result'));
          }
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


function _stopContainer(containerId) {
  return new Promise(function(resolve, reject){
    try {


      var container = docker.container.get(containerId);
      if(!container) {
        return reject('not found');
      }

      container.stop()
        .then(function(container) {

          var filters = {
            "id": [containerId]
          }


          return docker.container.list({"all": true, "filters": filters});
        })

        .then(function(containers){

          if(containers && containers.length > 0) {
            var item = containers[0];

            var id = item.id;
            var shortId = id.substring(0, 12);

            var name = '';
            if(item.data.Names.length > 0)
              name = item.data.Names[0];

            var imageName = item.data.Image;
            var imageId = item.data.ImageID;
            var command = item.data.Command;
            var port = null;
            if(item.data.Ports.length > 0)
              port = item.data.Ports[0];
            var state = item.data.State;

            var container = {
              id : id,
              shortId: shortId,
              name: name,

              imaegName: imageName,
              imageId: imageId,
              command: command,

              port: port,
              state: state
            };

            resolve(container);
          }
          else {
            debug( 'no result');
            reject(new Error('no result'));
          }
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
