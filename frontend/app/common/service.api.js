(function() {
  'use strict';

  angular
    .module('ciotPlatform')
    .service('apiService', ApiService);


  ApiService.$inject = ['$http', 'notificationService', 'authService'];

  function ApiService($http, notificationService, authService) {

    return {
      getDashboardData: _getDashboardData,
      listOpenServices: _listOpenServices,

      listMyServices: _listMyServices,






    };


    function _getDashboardData() {
      return new Promise(function(resolve, reject) {

        try {
          var httpOptions = {
            url: window.API_BASE_URL + '/dashboard',
            method: "GET"
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

  }

})();
