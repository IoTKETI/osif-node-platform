(function(){
  'use strict';


  angular
    .module('ciotDevicePlatform')
    .controller('applicationImagesController', ApplicationImagesController)
    .filter('shorId', FilterShortId)
  ;



  function FilterShortId() {
    return function(fullName) {
      if(!fullName)
        return '';

      var arySplitSharp = fullName.split('#');
      if(arySplitSharp.length<2)
        return fullName;

      var arySpliteStar = arySplitSharp[arySplitSharp.length-1].split('*');
      if(arySpliteStar.length < 2)
        return arySplitSharp[arySplitSharp.length-1];

      return arySpliteStar[arySpliteStar.length-1]
    }
  }


  ApplicationImagesController.$inject = ['$scope', '$state', '$stateParams', 'applicationImagesService' ];


  function ApplicationImagesController($scope, $state, $stateParams, applicationImagesService ) {

    var COLOR_TABLE = ["#68A501", "#FC5614", "#01B691", "#FEBD37"];
    var ICON_TABLE = ["url(./images/list/icon_home.png)", "url(./images/list/icon_parking.png)", "url(./images/list/icon_babycarriage.png)", "url(./images/list/icon_washingmachine.png)"];


    $scope.applicationImagesList = [];


    $scope.init = _init;

    $scope.runApplication = _runApplication;
    $scope.startApplication = _startApplication;
    $scope.stopApplication = _stopApplication;


    function _init() {
      applicationImagesService.listApplicatinImages()
        .then(function (appList) {

          $scope.$apply(function () {
            $scope.applicationImagesList = appList;
          });
        })

        .catch(function (err) {
          console.log(err);
          alert(err);
        });

    } //  $scope.init


    function _runApplication(image) {

      var targetImage = image;
      applicationImagesService.runApplication(targetImage)
        .then(function (container) {

          $scope.$apply(function () {
            targetImage.container = container;
          });
        })

        .catch(function (err) {
          console.log(err);
          alert(err);
        });
    }



    function _startApplication(image) {

      if (image.container == null) {
        alert('error: this image not running');
        return;
      }

      var targetImage = image;
      applicationImagesService.startApplication(targetImage.container)
        .then(function (container) {

          $scope.$apply(function () {
            targetImage.container = container;
          });
        })

        .catch(function (err) {
          console.log(err);
          alert(err);
        });
    }



    function _stopApplication(image) {

      if (image.container == null) {
        alert('error: this image not running');
        return;
      }

      var targetImage = image;
      applicationImagesService.stopApplication(targetImage.container)
        .then(function (container) {

          $scope.$apply(function () {
            targetImage.container = container;
          });
        })

        .catch(function (err) {
          console.log(err);
          alert(err);
        });
    }


  }

})();
