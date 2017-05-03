angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngIOS9UIWebViewPatch', 'angucomplete', 'ionic.rating', 'ngDraggable','ionic-datepicker'])

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
      
      .state('order_confirmation', {
        cache: false,
        url: "/order_confirmation/:storeID",
        templateUrl: "templates/order_confirmation.html",
        controller: 'OrderConfirmationCtrl'
      })

      .state('order_processing', {
        cache: false,
        url: "/order_processing/:storeID/:orderTotal",
        templateUrl: "templates/order_processing.html",
        controller: 'OrderProcessingCtrl'
      })

      .state('order_placed', {
        cache: false,
        url: "/order_placed/:storeID/:orderID/:orderTotal",
        templateUrl: "templates/order_placed.html",
        controller: 'OrderPlacedCtrl'
      })

      .state('order_status', {
        cache: false,
        url: "/order_status/:orderID",
        templateUrl: "templates/order_status.html",
        controller: 'OrderStatusCtrl'
      })

      .state('order_receipt', {
        cache: false,
        url: "/order_receipt/:orderID",
        templateUrl: "templates/order_receipt.html",
        controller: 'OrderReceiptCtrl'
      })

      .state('addresses', {
        cache: false,
        url: "/addresses",
        templateUrl: "templates/addresses.html",
        controller: 'AddressesCtrl'
      })
      
      .state('credit_cards', {
        cache: false,
        url: "/credit_cards",
        templateUrl: "templates/credit_cards.html",
        controller: 'CreditCardsCtrl'
      })

      .state('edit_address', {
        cache: false,
        url: "/edit_address/:addressID",
        templateUrl: "templates/edit_address.html",
        controller: 'EditAddressCtrl'
      })

      .state('edit_credit_card', {
        cache: false,
        url: "/edit_credit_card/:creditCardID",
        templateUrl: "templates/edit_credit_card.html",
        controller: 'EditCreditCardCtrl'
      })

      .state('favorites', {
        cache: false,
        url: "/favorites",
        templateUrl: "templates/favorites.html",
        controller: 'FavoritesCtrl'
      })

      .state('history', {
        cache: false,
        url: "/history",
        templateUrl: "templates/history.html",
        controller: 'HistoryCtrl'
      })

      .state('receipt', {
        cache: false,
        url: "/receipt/:orderID",
        templateUrl: "templates/receipt.html",
        controller: 'ReceiptCtrl'
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

.directive('onlydigitsandspaces', 
  function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, modelCtrl) {
        modelCtrl.$parsers.push(
          function (inputValue) {
            if (inputValue == undefined) { 
              return '';
            } 
            var transformedInput = inputValue.replace(/[^0-9]/g, ''); 
            if (transformedInput!=inputValue) {
              modelCtrl.$setViewValue(transformedInput);
              modelCtrl.$render();
            }         
            return transformedInput;         
          }
        );
      }
   };
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

.filter('rangeQuantities', 
  function() {

    return function(input, total) {
      total = parseInt(total) + 9;

      for (var i=1; i<=total; i++) {
        input.push(i);
      }

      return input;
    };
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
      return cloneObject(myArray[i]);
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

/**
* cloneObject - Clone a JS object (not is a copy)
* @param obj - Object to clone 
*/       
function cloneObject(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  var temp = obj.constructor();
  for (var key in obj) {
    temp[key] = cloneObject(obj[key]);
  }
  return temp;
}


/**
* getCardType - Identify credit card type: Visa, Mastercard, American Express, etc
* @param number - Credit card number entered by user 
*/       
function getCardType(number)
{
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (number.match(re) != null)
        return "visaElectron";

    var re = new RegExp("^4");
    if (number.match(re) != null)
        return "visa";

    re = new RegExp("^5[1-5]");
    if (number.match(re) != null)
        return "mastercard";

    re = new RegExp("^3[47]");
    if (number.match(re) != null)
        return "amex";

    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null)
        return "discover";

    re = new RegExp("^36");
    if (number.match(re) != null)
        return "diners";

    re = new RegExp("^30[0-5]");
    if (number.match(re) != null)
        return "dinersCarteBlanche";

    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null)
        return "jcb";

    return "generic";
}