
(function(){
  'use strict';

  angular
    .module('osifNodePlatform')
    .service('authService', AuthService);


  AuthService.$inject = ['$http', '$state', 'notificationService', 'localStorageService'];

  var MIN_PASSWORD_LENGTH = 8;

  function AuthService($http, $state, notificationService, localStorageService) {

    var services = {
      "addAccessTokenHeader": _addAccessTokenHeader,

      "login": _login,
      "signup": _signup,
      "logout": _logout,

      "resetPassword": _resetPassword,
      "changePassword": _changePassword,
    };
    return services;

    function _addAccessTokenHeader(httpOptions, doNotForward) {
      var authToken = localStorageService.get('authToken') || null;
      if(authToken == null && !doNotForward) {
        console.log('_addAccessTokenHeader', 'goto login page');
        return $state.go('login');
      }
      else {
        if(!httpOptions.headers)
          httpOptions.headers = {};

        httpOptions.headers["x-access-token"] = authToken;
        return httpOptions;
      }
    }

    function _login(userid, password) {
      return new Promise(function(resolve, reject) {

        try {
          var body = {
            "userid": userid,
            "password": password
          };

          var httpOptions = {
            url: window.API_BASE_URL + "/auth/token",
            method: "POST",
            data: body
          };

          $http(httpOptions)

          .then(function(response){
            localStorageService.set('authToken', response.data.token);
            localStorageService.set('loginUser', jwt_decode(response.data.token));

            resolve(response.data);
          })

          .catch(function(err){
            console.error(err);
            notificationService.showErrorMessage(err, true);
            reject(err);
          });
        }
        catch(ex) {
          console.error(ex);
          reject(ex);
        }

      });
    } //  end of function _login()

    function _resetPassword(userid) {
      return new Promise(function(resolve, reject) {

        try {
          var httpOptions = {
            url: window.API_BASE_URL + "/auth/password/reset",
            method: "POST",
            data: {userid : userid}
          };

          $http(httpOptions)

          .then(function(response){

            resolve(response.data);
          })

          .catch(function(err){
            console.error(err);
            notificationService.showErrorMessage(err, true);
            reject(err);
          });
        }
        catch(ex) {
          console.error(ex);
          reject(ex);
        }

      });
    } //  end of function _login()


    function _changePassword(token, password, password2) {
      return new Promise(function(resolve, reject) {

        var data = {
          token: token,
          password: password,
          password2: password2
        };

        try {
          var httpOptions = {
            url: window.API_BASE_URL + "/auth/password",
            method: "PUT",
            data: data
          };

          $http(httpOptions)

          .then(function(response){
            localStorageService.remove('authToken', 'loginUser');

            resolve(response.data);
          })

          .catch(function(err){
            console.error(err);
            notificationService.showErrorMessage(err, true);
            reject(err);
          });
        }
        catch(ex) {
          console.error(ex);
          reject(ex);
        }

      });
    } //  end of function _login()


    function _signup(username, userid, password) {
      return new Promise(function(resolve, reject) {

        try {
          var body = {
            "username": username,
            "userid": userid,
            "password": password
          };

          var httpOptions = {
            url: window.API_BASE_URL + "/auth/user",
            method: "POST",
            data: body
          };

          $http(httpOptions)

            .then(function(response){
              resolve(response.data);
            })

            .catch(function(err){
              console.error(err);
              reject(err);
            });
        }
        catch(ex) {
          console.error(ex);
          notificationService.showErrorMessage(err);
          reject(ex);
        }

      });
    } //  end of function _signup()


    function _logout() {
      try {
        localStorageService.remove('authToken', 'loginUser');
        $state.reload();
      }
      catch(ex) {
        notificationService.showErrorMessage(ex);
        localStorageService.remove('authToken', 'loginUser');
        $state.reload();
      }
    } //  end of function _logout()

    function _checkPassword(password) {
      var result = '';

      result = __checkAlphabetic(password);
      if (result) {
        return [false, '비밀번호는 숫자 또는 특수문자(!@#$%)를 포함해야 합니다.'];
      }

/*
      result = __checkAlphaNumeric(password);
      if (result) {
        return [false, '비밀번호는 특수문자(!@#$%)를 포함해야 합니다.'];
      }
*/
      result = __checkAlphaNumericSpecial(password);
      if (!result) {
        return [false, '비밀번호는 알파벳 대/소문자, 숫자, 특수문자(!@#$%)만을 포함해야 합니다.'];
      }

      result = __checkLength(password);
      if (result) {
        return [false, '비밀번호의 길이가 충분하지 않습니다.'];
      }

      return [true, '사용 가능한 비밀번호입니다.'];
    } //  end of function _checkPassword()


    function __checkAlphabetic(password) {
      var matched = password.match(/^[a-zA-Z]+$/);

      if (!!matched && matched[0] === password) {
        return true;
      }

      return false;
    }

    function __checkAlphaNumeric(password) {
      var matched = password.match(/^[a-zA-Z0-9]+$/);

      if (!!matched && matched[0] === password) {
        return true;
      }

      return false;
    }

    function __checkAlphaNumericSpecial(password) {
      var matched = password.match(/^[a-zA-Z0-9!@#$%]+$/);

      if (!!matched && matched[0] === password) {
        return true;
      }

      return false;
    }

    function __checkLength(password, minLength) {
      minLength = minLength || MIN_PASSWORD_LENGTH;

      return password.length < minLength;
    }

  } //   end of function AuthService()
})();
