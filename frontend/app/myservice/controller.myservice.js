(function() {
  'use strict';


  angular
    .module('ciotPlatform')
    .controller('myServiceController', MyServiceController)
  ;

  MyServiceController.$inject = ['$scope', '$state', '$mdDialog', 'apiService', 'authService', 'localStorageService'];

  function MyServiceController($scope, $state, $mdDialog, apiService, authService, localStorageService) {

    $scope.init = _init;

    $scope.getUserName = _getUserName;
    $scope.getVersion = _getVersion;


    function _init() {
      $scope.loginUser = localStorageService.get('loginUser');

      apiService.listMyServices()
        .then(function(myServiceList){
          $scope.$apply(function () {
            $scope.myServiceList = myServiceList;
          });

        }, function(err){
        });
    }

    function _getUserName(user) {

      if($scope.loginUser && $scope.loginUser.userid == user.userid)
        return 'Me';
      else
        return user.username;
    }

    function _getVersion(versionCode) {
      if(versionCode)
        return versionCode.major + '.' + versionCode.minor + '.' + versionCode.revision;
      else
        return ''
    }
  }

})();
