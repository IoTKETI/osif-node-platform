(function() {
  'use strict';


  angular
    .module('ciotPlatform')
    .controller('openServiceController', OpenServiceController)
  ;

  OpenServiceController.$inject = ['$scope', '$state', '$mdDialog', 'apiService'];

  function OpenServiceController($scope, $state, $mdDialog, apiService) {

    $scope.init = _init;


    $scope.moveToPrevPage = _moveToPrevPage;
    $scope.moveToNextPage = _moveToNextPage;
    $scope.moveToPage = _moveToPage;

    $scope.getUserName = _getUserName;
    $scope.getVersion = _getVersion;


    $scope.paging = {
      pageList: [1,2,3,4,5]
    };

    function _init() {
      __list(1, 8);
    }

    function _moveToPrevPage() {
      __list($scope.paging.current-1, $scope.paging.rowsPerPage);
    }
    function _moveToNextPage() {
      __list($scope.paging.current+1, $scope.paging.rowsPerPage);
    }
    function _moveToPage(page) {
      __list(page, $scope.paging.rowsPerPage);
    }

    function __list(page, rowsPerPage) {
       apiService.listOpenServices(page, rowsPerPage)
      .then(function(openServiceList){
        $scope.$apply(function () {
          $scope.openServiceList = openServiceList.data;
          var pagingInfo = openServiceList.metadata[0];

          var begin = (pagingInfo.current-1) * pagingInfo.rowsPerPage + 1;
          $scope.paging = {
            current: pagingInfo.current,
            total: pagingInfo.total,
            rowsPerPage: pagingInfo.rowsPerPage,

            begin: begin,
            end: begin + pagingInfo.rowsPerPage - 1,
            pageCount: parseInt( pagingInfo.total / pagingInfo.rowsPerPage + 0.5)
          };

          var startPage = parseInt((pagingInfo.current-1) / 5)  * 5 + 1;
          var endPage = Math.min($scope.paging.pageCount, startPage + 5);

          $scope.paging.pageList = [];


          for(var i=startPage; i < endPage; i++) {
            $scope.paging.pageList.push(i);
          }
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
