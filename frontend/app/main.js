(function(){
  'use strict';

  angular
    .module('ciotPlatform', ['ui.router', 'LocalStorageModule', 'ngMaterial', 'jsonFormatter', 'ngclipboard', 'chart.js'])
    .config(config)
    .controller('mainController', MainController)
    .run(run);

    function config($stateProvider, $urlRouterProvider, $mdThemingProvider, localStorageServiceProvider, ChartJsProvider) {

      $urlRouterProvider.otherwise('/execution');

      $stateProvider

        // Login page
        .state('login', {
          url: '/login',
          templateUrl: './app/auth/login.html'
        })

        // Login page
        .state('signup', {
          url: '/sighup',
          templateUrl: './app/auth/signup.html'
        })

        // Login page
        .state('password-reset', {
          url: '/password-reset',
          templateUrl: './app/auth/password.reset.html'
        })

        // Login page
        .state('password-change', {
          url: '/password-change',
          templateUrl: './app/auth/password.change.html'
        })

        // dashboard
        .state('dashboard', {
          url: '/dashboard',
          templateUrl: './app/dashboard/view.dashboard.html'
        })

        // List of open service
        .state('execution', {
          url: '/execution',
          templateUrl: './app/execution/view.execution.html'
        })

        // List of open service
        .state('myservice', {
          url: '/myservice',
          templateUrl: './app/myservice/view.myservice.html'
        })


        // Tool for service metadata generator
        .state('tools-metadata', {
          url: '/tools-metadata',
          templateUrl: './app/tools/view.tools.metadata.html'
        })

      ;


      localStorageServiceProvider
        .setPrefix('ciotPlatform');
      localStorageServiceProvider
        .setStorageType('localStorage');

      ChartJsProvider.setOptions({ colors : [ '#fff', '#fff'] });


    };


    //  controller inject
  MainController.$inject = ['$scope', '$rootScope', '$mdSidenav', 'authService'];


  function MainController($scope, $rootScope, $mdSidenav, authService) {
    $scope.showSideNav = true


    $scope.toggleSideNav = _toggleSideNav;
    $scope.openUserProfileMenu = _openUserProfileMenu;

    $scope.canMoveToBack = _canMoveToBack;


    $scope.init = _init;
    $scope.isLoggedIn = _isLoggedIn;

    $scope.onLogout = _onLogout;


    function _init() {

      $scope.loginUser = authService.getLoginUser();

    }


    function _isLoggedIn() {
      if($scope.loginUser)
        return true;
      else
        return false;
    }


    function _onLogout() {
      $scope.loginUser = null;
      authService.logout();
    }


    function _toggleSideNav() {

      $mdSidenav('gnb-sidebar')
        .toggle()
        .then(function () {
        });
    }

    function _openUserProfileMenu($mdMenu, ev) {
      $mdMenu.open(ev);
    }

    function _canMoveToBack() {
      var result = document.referrer?false:true;
      console.log( result , document.referrer, this.isHistory);
      return result;
    }

  }

  function run($rootScope) {
    window.API_BASE_URL = "";


  }

})();

