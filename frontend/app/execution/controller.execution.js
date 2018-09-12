(function() {
  'use strict';


  angular
    .module('ciotPlatform')
    .controller('executionController', ExecutionController)
  ;

  ExecutionController.$inject = ['$scope', '$state', '$mdDialog', 'apiService', 'notificationService'];

  function ExecutionController($scope, $state, $mdDialog, apiService, notificationService) {

    $scope.serviceImageList = [];

    $scope.init = _init;

    $scope.runApplication = _runApplication;
    $scope.startApplication = _startApplication;
    $scope.stopApplication = _stopApplication;

    function _init() {
      apiService.listApplicatinImages()
        .then(function (appList) {

          $scope.$apply(function () {
            $scope.serviceImageList = appList;
          });
        })

        .catch(function (err) {
          notificationService.showErrorMessage(err);
        });

    } //  $scope.init


    function _runApplication(image) {

      var targetImage = image;
      apiService.runApplication(targetImage)
        .then(function (container) {

          $scope.$apply(function () {
            targetImage.container = container;
          });
        })

        .catch(function (err) {
          notificationService.showErrorMessage(err);
        });
    }



    function _startApplication(image) {

      if (image.container == null) {
        notificationService.showErrorMessage('error: this image not running');
        return;
      }

      var targetImage = image;
      apiService.startApplication(targetImage.container)
        .then(function (container) {

          $scope.$apply(function () {
            targetImage.container = container;
          });
        })

        .catch(function (err) {
          notificationService.showErrorMessage(err);
        });
    }



    function _stopApplication(image) {

      if (image.container == null) {
        notificationService.showErrorMessage('error: this image not running');
        return;
      }

      var targetImage = image;
      apiService.stopApplication(targetImage.container)
        .then(function (container) {

          $scope.$apply(function () {
            targetImage.container = container;
          });
        })

        .catch(function (err) {
          notificationService.showErrorMessage(err);
        });
    }


  }

})();
