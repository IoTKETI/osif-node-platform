(function() {
  'use strict';

  angular
    .module('ciotPlatform')
    .service('notificationService', NotificationService);


  NotificationService.$inject = ['$state', '$mdToast'];

  function NotificationService($state, $mdToast) {

    var services = {
      "showErrorMessage": _showErrorMessage,
      "showInfoMessage": _showInfoMessage
    };
    return services;

    function __getMessage(err) {
      var errorMesg = '';

      if(typeof err === 'string') {
        errorMesg = err;
      }
      else {
        if(err.status) {
          errorMesg = ['[', err.status, ']', ' ', err.statusText, '\r\n'].join('');
        }

        if(err.data) {
          errorMesg += (err.data.message||err.data) + '\r\n';
        }

        if(errorMesg === '')
          errorMesg = err.toString();
      }

      return errorMesg;
    }

    function _showErrorMessage(err, force) {
      var errorMesg = __getMessage(err);

      if(!force && err.status && (err.status == 401||err.status == 403)) {
        console.log('_showErrorMessage', 'goto login page');

        $state.go('login');
      }
      else {
        $mdToast.show($mdToast.simple().textContent(errorMesg));
      }
    }

    function _showInfoMessage(err) {
      var errorMesg = __getMessage(err);

      $mdToast.show($mdToast.simple().textContent(errorMesg));
    }
  }

})();
