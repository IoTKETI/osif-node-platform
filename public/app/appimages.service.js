/**
 * [description]
 *
 *  oneM2M protocol client
 *
 *
 *
 */
(function(){
  'use strict';

  angular
    .module('ciotDevicePlatform')
    .service('applicationImagesService', ApplicationImagesService);


  ApplicationImagesService.$inject = ['$http'];

  function ApplicationImagesService($http, store) {


    var services = {
      "listApplicatinImages": _listApplicatinImages,

      "runApplication": _runApplication,
      "startApplication": _startApplication,
      "stopApplication": _stopApplication
    };
    return services;




    function _listApplicatinImages() {

      return new Promise(function(resolve, reject) {
        try{
          var retval = null;
          $http({
            url: window.API_BASE_URL + '/apps/image',
            method: "GET"
          }).then(function (response) {
            retval = response.data;

            resolve(retval);
          }, function (response) {
            console.log(response);
            reject(response);
          } );
        }
        catch(ex) {
          console.log(ex);
          reject(ex);
        }

      });
    }


    function _runApplication(appImage) {

      return new Promise(function(resolve, reject) {
        try{
          var retval = null;
          $http({
            url: window.API_BASE_URL + '/apps/image/'+appImage.id+'/run',
            method: "PUT"
          }).then(function (response) {
            retval = response.data;

            resolve(retval);
          }, function (response) {
            console.log(response);
            reject(response);
          } );
        }
        catch(ex) {
          console.log(ex);
          reject(ex);
        }

      });
    }


    function _startApplication(container) {

      return new Promise(function(resolve, reject) {
        try{
          var retval = null;
          $http({
            url: window.API_BASE_URL + '/apps/container/'+container.id+'/start',
            method: "PUT"
          }).then(function (response) {
            retval = response.data;

            resolve(retval);
          }, function (response) {
            console.log(response);
            reject(response);
          } );
        }
        catch(ex) {
          console.log(ex);
          reject(ex);
        }

      });
    }



    function _stopApplication(container) {

      return new Promise(function(resolve, reject) {
        try{
          var retval = null;
          $http({
            url: window.API_BASE_URL + '/apps/container/'+container.id+'/stop',
            method: "PUT"
          }).then(function (response) {
            retval = response.data;

            resolve(retval);
          }, function (response) {
            console.log(response);
            reject(response);
          } );
        }
        catch(ex) {
          console.log(ex);
          reject(ex);
        }

      });
    }


  }
})();
