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

.directive('countdown', 
  function($timeout) {
    return {
      restrict: 'A',
      link: function($scope,elem,attrs) {
        if (attrs.livedeal == "true") {
          var ld = parseInt(attrs.liveduration);
          setInterval(
            function() {
              var myElem = document.getElementById(attrs.id);
              if (myElem === null) {
                //do nothing
              }
              else {              
                var left = remainingTime(attrs.endingtime);
                var leftArray = left.split(":");
                var leftSeconds = parseInt(leftArray[0]*60*60) + parseInt(leftArray[1]*60) + parseInt(leftArray[2]);
                var progresswidth = 100 - ((leftSeconds/ld)*100);
                document.getElementById(attrs.id).innerHTML= left;
                if (document.getElementById('progress_' + attrs.id) === null) {
                  //do nothing
                } 
                else {
                  document.getElementById('progress_' + attrs.id).setAttribute("style","width:" + progresswidth + "%");
                }
              }              
            }, 
            1000
          );
        }
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

.filter('containsObject2', 
  function() {
    return function (arr, o) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id == o.id && arr[i].desc == o.desc) {
          return 'boxblue';
        }
      }                             
      return 'boxgray';
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
    }
  }
)

;

/*** MISCELANEOUS FUNCTIONS ***/

/**
* objectIndexOf1 - Get index of an object in an array of filters. If it doesn't exist, it returns -1
* @param arr   - The array ob objects
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
* objectIndexOf2 - Get index of an object in an array of options to order in an item (store). If it doesn't exist, it returns -1
* @param arr   - The array ob objects
* @param o     - The object we are looking for 
* @returns {*} - Index    
*/       
function objectIndexOf2(arr, o) {    
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].id == o.id && arr[i].desc == o.desc) {
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

/**
* shuffleArray - Randomize order of items in an array
* @param a - The array we want to shuffle
*/       
function shuffleArray(a) {
    var j, x, i;                                                        
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

/**
* remainingTime - Calculate left hours, minutes and seconds
* @param valuestop - Time to stop (H:mm:ss 24h format) 
*/       
function remainingTime(valuestop) {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  if (m < 10) {
    m = "0" + m;
  }
  if (s < 10) {
    s = "0" + s;
  }
  var valuestart = h + ":" + m + ":" + s;
  var timeStart = new Date("12/01/1900 " + valuestart);
  var timeEnd = new Date("12/01/1900 " + valuestop);
  var delta = Math.abs(timeEnd - timeStart) / 1000;
  var hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;
  var minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;
  var seconds = delta % 60;
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ':' + minutes + ':' + seconds;    
}
