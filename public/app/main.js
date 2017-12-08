(function(){
  'use strict';

  angular
    .module('ciotDevicePlatform', ['ui.router', 'ui.bootstrap' ])
    .config(config)
    .run(run);

    function config($stateProvider, $urlRouterProvider ) {



      $urlRouterProvider.otherwise('/list');

      $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('list', {
          url: '/list',
          templateUrl: './view/view-appimages-list.html',
        })

        ;

    };


    function run($rootScope, $location) {
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){
        console.log("STATE CHANG START : " + fromState + " -> " + toState)
      });

      $rootScope.$on('$locationChangeStart', function(event, newUrl, oldUrl, newState, oldState){
        console.log("LOCATION CHANGE START : " + oldUrl + " -> " + newUrl)
      });


      //  check running platform
      //  check node-webkit
      if( window.process && process.versions && process.versions['node-webkit'])
        window.runningPlatform = "node-webkit";
      else
        window.runningPlatform = "web";


      if( window.runningPlatform == "node-webkit" ) {
        window.API_BASE_URL = "http://localhost:6001";
      }
      else {
        window.API_BASE_URL = "";
      }
    }

})();

