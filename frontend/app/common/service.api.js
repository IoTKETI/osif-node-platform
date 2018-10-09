(function() {
  'use strict';

  angular
    .module('ciotPlatform')
    .service('apiService', ApiService);


  ApiService.$inject = ['$http', 'notificationService', 'authService'];

  function ApiService($http, notificationService, authService) {

    return {
      "listOpenServices": _listOpenServices,

      "listMyServices": _listMyServices,



      "listApplicatinImages": _listApplicatinImages,

      "runApplication": _runApplication,
      "startApplication": _startApplication,
      "stopApplication": _stopApplication


    };


    function _listOpenServices(page, rowsPerPage) {
      return new Promise(function(resolve, reject) {

        try {
          var params = {
            page: page,
            rowsPerPage: rowsPerPage
          };
          var httpOptions = {
            url: window.API_BASE_URL + '/openservice',
            method: "GET",
            params: params
          };
          authService.addAccessTokenHeader(httpOptions, true);

          $http(httpOptions)
            .then(function(response){
              resolve(response.data);
            })

            .catch(function(err){
              notificationService.showErrorMessage(err);
              reject(err);
            });
        }
        catch(ex) {
          console.error(ex);
          reject(ex);
        }

      });
    }


    function _listMyServices() {
      return new Promise(function(resolve, reject) {

        try {
          var params = {
          };
          var httpOptions = {
            url: window.API_BASE_URL + '/myservice',
            method: "GET",
          };
          authService.addAccessTokenHeader(httpOptions, true);

          $http(httpOptions)
            .then(function(response){
              resolve(response.data);
            })

            .catch(function(err){
              notificationService.showErrorMessage(err);
              reject(err);
            });
        }
        catch(ex) {
          console.error(ex);
          reject(ex);
        }

      });
    }


    function _getAeResourceList() {
      return new Promise(function(resolve, reject) {

        try {

          var httpOptions = {
            url: window.API_BASE_URL + '/resource/ae',
            method: "GET"
          };
          authService.addAccessTokenHeader(httpOptions);

          $http(httpOptions)

            .then(function(response){

              resolve(response.data);
            })

            .catch(function(err){
              notificationService.showErrorMessage(err);
              reject(err);
            });
        }
        catch(ex) {
          console.error(ex);
          reject(ex);
        }

      });
    }






    function _listApplicatinImages() {

      return new Promise(function(resolve, reject) {
        try{
          var retval = null;

          var httpOptions = {
            url: window.API_BASE_URL + '/apps/image',
            method: "GET"
          };
          authService.addAccessTokenHeader(httpOptions);

          $http(httpOptions)
            .then(function (response) {
              retval = response.data;

              resolve(retval);
            }, function (response) {
              console.log(response);
              reject(response);
            } )

            .catch(function(err){
              notificationService.showErrorMessage(err);
              reject(err);
            });
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
