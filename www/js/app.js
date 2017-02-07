angular.module('starter', ['ionic', 'starter.controllers', 'ngIOS9UIWebViewPatch', 'angucomplete'])

.run(
  function ($ionicPlatform) {

    $ionicPlatform.ready(
      function() {
        
        if (navigator && navigator.splashscreen) { 
          navigator.splashscreen.hide();
        }

        if (window.cordova && window.cordova.plugins.Keyboard) {
           cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	         cordova.plugins.Keyboard.disableScroll(true);
        }
        
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }
      }
    );
  }
)

.config(
  function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
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
        cache: true,
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
    
    $ionicConfigProvider.views.swipeBackEnabled(false);    
	
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
              e.preventDefault();
              try {
                $(':input:eq(' + ($(':input').index(this) + 1) + ')').focus();
              }
              catch(err) {
                var dummy="dummy";
              }
            }
            if ( !$(this).val() ) {
              $('#label_' + $(this).attr("name")).hide();
            }
            else {
              $('#label_' + $(this).attr("name")).show();
            }
          }
        );
        elem.bind('keydown', 
          function(e) {
            if ( !$(this).val() ) {
              $('#label_' + $(this).attr("name")).hide();
            }
            else {
              $('#label_' + $(this).attr("name")).show();
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
            if ( !$(this).val() ) {
              $('#label_' + $(this).attr("name")).hide();
            }
            else {
              $('#label_' + $(this).attr("name")).show();
            }
          }
        );
        elem.bind('keyup', 
          function(e) {
            if ( !$(this).val() ) {
              $('#label_' + $(this).attr("name")).hide();
            }
            else {
              $('#label_' + $(this).attr("name")).show();
            }
          }
        );
      }                
    }
  }
)

.directive('advancenextfp', 
  function() {
    return {
      restrict: 'A',
      link: function($scope,elem,attrs) {
        elem.bind('keydown', 
          function(e) {
            var code = e.keyCode || e.which;
            if (code == 9)  {
              e.preventDefault();
              $scope.goNext();
              $scope.$apply();
            }
            if ( !$(this).val() ) {
              $('#label_' + $(this).attr("name")).hide();
            }
            else {
              $('#label_' + $(this).attr("name")).show();
            }
          }
        );
        elem.bind('keyup', 
          function(e) {
            if ( !$(this).val() ) {
              $('#label_' + $(this).attr("name")).hide();
            }
            else {
              $('#label_' + $(this).attr("name")).show();
            }
          }
        );
      }                
    }
  }
)

;
