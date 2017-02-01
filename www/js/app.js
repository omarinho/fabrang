angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'angucomplete'])

.run(
  function ($ionicPlatform, $state, $rootScope) {
    $ionicPlatform.ready(
      
      function() {

        if(navigator && navigator.splashscreen) { 
          navigator.splashscreen.hide();
        }

        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }      

      }
    );
  }
)

.config(
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('signin', {
        cache: false,
        url: "/",
        templateUrl: "templates/signin.html",
        controller: 'SigninCtrl'
      })

      .state('signup', {
        cache: false,
        url: "/signup",
        templateUrl: "templates/signup.html",
        controller: 'SignupCtrl'
      })

      .state('forgot_password', {
        cache: false,
        url: "/forgot_password",
        templateUrl: "templates/forgot_password.html",
        controller: 'ForgotPasswordCtrl'
      })

      .state('home', {
        cache: false,
        url: "/home",
        templateUrl: "templates/home.html",
        controller: 'HomeCtrl'
      })

      .state('results', {
        cache: false,
        url: "/results",
        templateUrl: "templates/results.html",
        controller: 'ResultsCtrl'
      })

      .state('store', {
        cache: false,
        url: "/store",
        templateUrl: "templates/store.html",
        controller: 'StoreCtrl'
      })

    $urlRouterProvider.otherwise("/");      
  }
)

.directive('advancenext', 
  function() {
    return {
      restrict: 'A',
      link: function($scope,elem,attrs) {
        elem.bind('keyup', 
          function(e) {
            var code = e.keyCode || e.which;
            if (code == 13) {
              e.preventDefault()
              $(':input:eq(' + ($(':input').index(this) + 1) + ')').focus();
            }
            if ($(this).val() != '') {
              $('#label_' + $(this).attr("name")).show();
            }
            else {
              $('#label_' + $(this).attr("name")).hide();
            }
          }
        );
      }                
    }
  }
)

.directive('advancenextsignup', 
  function() {
    return {
      restrict: 'A',
      link: function($scope,elem,attrs) {
        elem.bind('keydown', 
          function(e) {
            var code = e.keyCode || e.which;
            if ( (code == 13) || (code == 9) )  {
              e.preventDefault();
              $scope.advance();
              $scope.$apply();
            }
            if ($(this).val() != '') {
              $('#label_' + $(this).attr("name")).show();
            }
            else {
              $('#label_' + $(this).attr("name")).hide();
            }
          }
        );
      }                
    }
  }
)

;
