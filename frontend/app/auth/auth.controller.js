(function(){
  'use strict';


  angular
    .module('ciotPlatform')
    .controller('authController', AuthController)
  ;



  AuthController.$inject = ['$scope', '$state', '$stateParams', 'authService', 'notificationService' ];


  function AuthController($scope, $state, $stateParams, authService, notificationService) {

    $scope.formData = {
      "login": {
        "userid": "",
        "password": ""
      },

      "signup": {
        "username": "",
        "userid": "",
        "password": "",
        "password2": ""
      },

      "change": {
        "password": "",
        "password2": ""
      },

      "reset": {
        "userid": ""
      }
    }

    $scope.init = _init;
    $scope.login = _login;
    $scope.signup = _signup;
    $scope.passwordResetRequest = _passwordResetRequest;
    $scope.changePassword = _changePassword;
    $scope.checkPasswordStrength = _checkPasswordStrength;
    $scope.disableSignupButton = _disableSignupButton;
    $scope.disableChangeButton = _disableChangeButton;
    $scope.showUserAgreementModal = _showUserAgreementModal;



    function _init() {

    }

    function _login() {
      var formData = $scope.formData['login'];

      formData.userid = (formData.userid === undefined) ? '' : formData.userid.trim();
      if(!formData.userid) {
        notificationService.showErrorMessage('Invalid userid. retry');
        return;
      }

      if(!formData.password) {
        notificationService.showErrorMessage('Invalid password. retry');
        return;
      }

      authService.login(formData.userid, formData.password)
        .then(function(user){
          $state.go('dashboard');
        })
        .catch(function(err){
          notificationService.showErrorMessage(err.data);

          console.log('authService.login failed', 'goto login page');
          $state.go('login');
        });
    } //  end of function _login()


    function _signup() {
      var formData = $scope.formData['signup'];

      formData.username = (formData.username === undefined) ? '' : formData.username.trim();
      if(!formData.username) {
        notificationService.showErrorMessage('Invalid username. retry');
        return;
      }

      formData.userid = (formData.userid === undefined) ? '' : formData.userid.trim();
      if(!formData.userid) {
        notificationService.showErrorMessage('Invalid email. retry');
        return;
      }

      if(!formData.password) {
        notificationService.showErrorMessage('Invalid password. retry');
        return;
      }


      if(!formData.password2) {
        notificationService.showErrorMessage('Invalid repeat password . retry');
        return;
      }


      if(formData.password !== formData.password2) {
        notificationService.showErrorMessage('Password miss match. retry');
        return;
      }


      authService.signup(formData.username, formData.userid, formData.password)
        .then(function(user){
          console.log('authService.signup failed', 'goto login page');

          $state.go('login');
        })
        .catch(function(err){
          notificationService.showErrorMessage(err);
          $state.go('signup');
        });

    } //  end of function _singup()

    function _passwordResetRequest() {
      var formData = $scope.formData['reset'];

      formData.userid = (formData.userid === undefined) ? '' : formData.userid.trim();
      if(!formData.userid) {
        notificationService.showErrorMessage('Invalid email. retry');
        return;
      }

      authService.requestResetPassword(formData.userid)
        .then(function(user){
          $state.go('main.dashboard');
        })
        .catch(function(err){
          console.log('authService.requestResetPassword failed', 'goto login page');

          $state.go('login');
        });
    }

    function _changePassword() {
      var formData = $scope.formData['change'];

      authService.changePassword($stateParams.token, formData.password, formData.password2)
        .then(function(user){
          $state.go('main.dashboard');
        })
        .catch(function(err){
          console.log('authService.changePassword failed', 'goto login page');

          $state.go('login');
        });
    }




    function _checkPasswordStrength(formName) {
      var formData = $scope.formData[formName];

      var result = authService.checkPassword(formData.password);
      $scope.validPassword = result[0];
      $scope.passwordValidationMessage = result[1];
    }

    function _disableSignupButton() {

      if(!$scope.validPassword)
        return true;

      var formData = $scope.formData['signup'];
      formData.username = formData.username.trim();
      if(!formData.username) {
        return true;
      }

      formData.userid = formData.userid.trim();
      if(!formData.userid) {
        return true;
      }

      if(!formData.password) {
        return true;
      }

      if(!formData.password2) {
        return true;
      }

      if(formData.password !== formData.password2) {
        return true;
      }

      return false;
    }

    function _disableChangeButton() {

      if(!$scope.validPassword)
        return true;

      var formData = $scope.formData['change'];
      if(!formData.password) {
        return true;
      }

      if(!formData.password2) {
        return true;
      }

      if(formData.password !== formData.password2) {
        return true;
      }

      return false;
    }


    function _showUserAgreementModal(type) {

      // ModalService.showModal({
      //   templateUrl: "_auth/auth.agree.modal.html",
      //   controller: "authAgreeModalController",
      //   inputs: {type: type}
      // }).then(function(modal) {
      //   modal.element.modal();
      //   modal.close.then(function(result) {
      //     if(result) {
      //
      //     }
      //   });
      // });
    }
  }



})();
