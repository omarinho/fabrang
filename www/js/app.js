angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngIOS9UIWebViewPatch', 'angucomplete', 'ionic.rating', 'ngDraggable'])

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
        url: "/store/:storeID",
        templateUrl: "templates/store.html",
        controller: 'StoreCtrl'
      })

      .state('settings', {
        cache: false,
        url: "/settings",
        templateUrl: "templates/settings.html",
        controller: 'SettingsCtrl'
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

.filter('containsObject', 
  function() {
    return function (arr, o) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].name == o.name && arr[i].type == o.type) {
          return 'boxblue';
        }
      }
      return 'boxwhite';
    }
  }
)

.filter('cut', 
  function () {
    return function (value, wordwise, max, tail) {
      if (!value) {
        return '';
      }
      max = parseInt(max, 10);
      if (!max) {
        return value;
      }
      if (value.length <= max) {
        return value;
      }
      value = value.substr(0, max);
      if (wordwise) {
        var lastspace = value.lastIndexOf(' ');
        if (lastspace !== -1) {
          if (value.charAt(lastspace-1) === '.' || value.charAt(lastspace-1) === ',') {
            lastspace = lastspace - 1;
          }
          value = value.substr(0, lastspace);
        }
      }
      return value + (tail || ' ...');
    };
  }
)

;

/*** MISCELANEOUS FUNCTIONS ***/

/**
* objectIndexOf - Get index of an object in an array of objects. If it doesn't exist, it returns -1
* @param arr - The array ob objects
* @param o     - The object we are looking for 
* @returns {*} - Index    
*/       
function objectIndexOf(arr, o) {    
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].name == o.name && arr[i].type == o.type) {
      return i;
    }
  }
  return -1;
}


/**
* searchObjectByID - Get element in an array of objects by key ID
* @param nameKey - Value we are looking for
* @param myArray - The array of objects 
* @returns {*}   - The object with id = nameKey   
*/       
function searchObjectByID(nameKey, myArray){
  for (var i=0; i < myArray.length; i++) {
    if (myArray[i].id === nameKey) {
      return myArray[i];
    }
  }
}