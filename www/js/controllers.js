angular.module('starter.controllers',['ngCordova'])  

/****************************************/
/*** Some rootScope Utilities - BEGIN ***/
/****************************************/
.run(
  
  function($rootScope, $ionicHistory, $ionicPopup, $timeout, $state, $ionicModal, $ionicLoading, SessionService, SearchService) {
  
    $rootScope.goback = function() {
      $timeout(
        function() {
          $ionicHistory.goBack();
        }, 100
      );	
    }
  
    $rootScope.alerti = function(text, title) {
      if (typeof title === "undefined") {
        title="Alert";
      }
      var myPopup = $ionicPopup.show({
        template: text,
        title: title,
        buttons: [
          { text: 'OK' },
        ]                                       
      });      
    }
    
    $rootScope.selectedPlace = function(store) {
      $state.go('store', {storeID:store.id}, { reload: true });
    }

    // Code to control filtrers globally - BEGIN //
    $rootScope.filterrating = {
      rating: 0, 
      max:5.0
    }
    
    $rootScope.centerAnchor = true;
    $rootScope.toggleCenterAnchor = function () {
      $rootScope.centerAnchor = !$rootScope.centerAnchor;
    }

    if (SessionService.get('lockedFiltersList') == null) {
      $rootScope.droppedObjects1 = [];
    }
    else {
      $rootScope.droppedObjects1 = SessionService.get('lockedFiltersList');
    }
    $rootScope.lockedCount = $rootScope.droppedObjects1.length;

    if (SessionService.get('lockedFiltersToggle') == null) {
      $rootScope.lockedFiltersToggle = false
    } 
    else {
      $rootScope.lockedFiltersToggle = SessionService.get('lockedFiltersToggle')
    }                                                                
    $rootScope.lockedFilters = {
      enableLockedFilters: $rootScope.lockedFiltersToggle
    }
    
    /*** Call API: Get all the possible cuisine filters ***/
    $rootScope.droppedObjects2 = SearchService.getCuisineFilters();
    
    //DIET filters
    $rootScope.droppedObjects3 = SearchService.getDietFilters();
    
    //SETTING filters
    $rootScope.droppedObjects4 = SearchService.getSettingFilters();
    
    //FEATURES filters
    $rootScope.droppedObjects5 = SearchService.getFeaturesFilters();
    
    if ($rootScope.lockedFilters.enableLockedFilters) { 
      $rootScope.activeFilters = $rootScope.droppedObjects1.slice();
    }
    else {
      $rootScope.activeFilters = [];
    }

    $rootScope.lockedToggleChange = function() {
      if ($rootScope.lockedFilters.enableLockedFilters) {
        $rootScope.droppedObjects1.forEach(
          function(entry) {
            var index = objectIndexOf($rootScope.activeFilters, entry);
            if (index == -1) {
              $rootScope.activeFilters.unshift(entry);
            }
          }
        );                  
      }
      else {
        $rootScope.droppedObjects1.forEach(
          function(entry) {   
            var index = objectIndexOf($rootScope.activeFilters, entry);
            if (index > -1) {                          
              $rootScope.activeFilters.splice(index,1);
            }
          }
        );                  
      }
      SessionService.set('lockedFiltersToggle',$rootScope.lockedFilters.enableLockedFilters);
    }

    $rootScope.onDropComplete1=function(data,evt) {
      var index = objectIndexOf($rootScope.droppedObjects1, data);
      var index2 = objectIndexOf($rootScope.activeFilters, data);
      if (index == -1) {
        $rootScope.droppedObjects1.unshift(data);
        if ($rootScope.lockedFilters.enableLockedFilters) {
          if (index2 == -1) {
            $rootScope.activeFilters.unshift(data);
          }
        }
      }
      SessionService.set('lockedFiltersList',$rootScope.droppedObjects1);
    }
        
    $rootScope.onDragSuccess1=function(data,evt) {
      var index = objectIndexOf($rootScope.droppedObjects1, data);
      var index2 = objectIndexOf($rootScope.activeFilters, data);
      if (index > -1) {
        $rootScope.droppedObjects1.splice(index, 1);
        if (index2 > -1) {
          $rootScope.activeFilters.splice(index2,1);
        }
      }
      SessionService.set('lockedFiltersList',$rootScope.droppedObjects1);
    }
    
    $rootScope.onDropComplete2=function(data,evt) {}

    $rootScope.onDragSuccess2=function(data,evt) {}

    $rootScope.onDropComplete3=function(data,evt) {}

    $rootScope.onDragSuccess3=function(data,evt) {}
    
    $rootScope.onDropComplete4=function(data,evt) {}

    $rootScope.onDragSuccess4=function(data,evt) {}

    $rootScope.onDropComplete5=function(data,evt) {}

    $rootScope.onDragSuccess5=function(data,evt) {}

    $rootScope.activeServiceType = [];
    
    $rootScope.toggleServiceType = function(elem)  {
      var index = $rootScope.activeServiceType.indexOf(elem); 
      if (index > -1) {
        $rootScope.activeServiceType.splice(index,1);
      }
      else {
        $rootScope.activeServiceType.unshift(elem);
      } 
    }   
    
    $rootScope.toggleFilter = function(elem)  {
      var index = objectIndexOf($rootScope.activeFilters, elem);
      if (index > -1) {
        if ($rootScope.lockedFilters.enableLockedFilters) {
          var index2 = objectIndexOf($rootScope.droppedObjects1, elem);
          if (index2 > -1) {
            return;
          }
          else {
            $rootScope.activeFilters.splice(index,1);
          }
        }
        else {
          $rootScope.activeFilters.splice(index,1);
        } 
      }
      else {
        $rootScope.activeFilters.unshift(elem);
      }
    }
    
    $rootScope.activePriceRange = [];

    $rootScope.togglePriceRange = function(elem)  {
      var index = $rootScope.activePriceRange.indexOf(elem); 
      if (index > -1) {
        $rootScope.activePriceRange.splice(index,1);
      }
      else {
        $rootScope.activePriceRange.unshift(elem);
      } 
    }   

    $ionicModal.fromTemplateUrl('templates/get-filters.html',  {
		    scope: $rootScope,
		    animation: 'slide-in-down',
      }
    ).
    then(
      function (modal) {
		    $rootScope.getFilters = modal;
	     }
    );
	
    $rootScope.showFiltersModal = function() {
      $rootScope.getFilters.show();
    };
  
    $rootScope.cancelFiltersModal = function() {
      $rootScope.getFilters.hide();
    }
    // Code to control filtrers globally  - END //
    
    // Cart management - BEGIN
    if (SessionService.get('cart') == null) {
      $rootScope.cart = [];
    } 
    else {
      $rootScope.cart = SessionService.get('cart')
    }
    
    $rootScope.addToCart = function(aItem) {
      if (aItem.source == "nooptions") {
        if ( !$rootScope.updateToCart(aItem) ) {
          $rootScope.cart.push(aItem);
        }
      }
      else {
        $rootScope.cart.push(aItem);
      }
      SessionService.set('cart',$rootScope.cart);
    }
    
    $rootScope.removeFromCart = function(index) {
      $rootScope.cart.splice(index, 1);
      SessionService.set('cart',$rootScope.cart);
    }
    
    $rootScope.updateToCart = function(aItem) {
      var found = false;
      for (var i in $rootScope.cart) {
        if ( ($rootScope.cart[i].id == aItem.id) && ($rootScope.cart[i].storeID == aItem.storeID) ) {
          var newQuantity = parseInt($rootScope.cart[i].quantity) + parseInt(aItem.quantity);
          var newPrice = parseFloat($rootScope.cart[i].price) + parseFloat(aItem.price);  
          $rootScope.cart[i].quantity = newQuantity.toString();
          $rootScope.cart[i].price = newPrice.toString();
          found = true;
          break;
        }
      }
      SessionService.set('cart',$rootScope.cart);
      return found;
    }

    $rootScope.clearCart = function(storeID,alert=true) {
      var tempArray = [];
      for (var i in $rootScope.cart) {
        if ($rootScope.cart[i].storeID == storeID) {
          //do nothing
        }
        else {
          tempArray.push($rootScope.cart[i]);
        }
      }
      $rootScope.cart = tempArray;
      SessionService.set('cart',$rootScope.cart);
      if (alert) {
        $rootScope.alerti('You have cleared your cart.','CLEARED');
      }
    }
    
    $rootScope.updateCartQuantity = function(id, quantity, ident) {
      for (var i in $rootScope.cart) {
        if ($rootScope.cart[i].ident == ident) {
          var unitPrice = parseFloat($rootScope.cart[i].price) / parseInt(quantity);
          var newPrice = unitPrice * parseInt($rootScope.cart[i].quantity);
          $rootScope.cart[i].price = newPrice.toString();
          break;
        }
      }
      SessionService.set('cart',$rootScope.cart);
    }
    
    $rootScope.removeFromCartByIdent = function(ident) {
      for (var i in $rootScope.cart) {
        if ($rootScope.cart[i].ident == ident) {
          $rootScope.removeFromCart(i);
          break;
        }
      }
    }
    // Cart management - END
    
    $rootScope.showLoading = function() {
      $ionicLoading.show();
    }

    $rootScope.hideLoading = function() {
      $ionicLoading.show({delay:100});
      $ionicLoading.hide();
    }

    $rootScope.showFooter = true;

    window.addEventListener('native.keyboardshow', function() {
      $rootScope.showFooter = false;
      $rootScope.$apply();
    });

    window.addEventListener('native.keyboardhide', function() {
      $rootScope.showFooter = true;
      $rootScope.$apply();
    });

  }
  
)
/****************************************/
/*** Some rootScope Utilities - BEGIN ***/
/****************************************/

                                                 
/**********************************/
/*** HomePage Controler - BEGIN ***/
/**********************************/
.controller('HomeCtrl',                            
  
  function ($scope, $ionicModal, $ionicNavBarDelegate, $cordovaStatusbar, $state, $timeout, $ionicLoading, $ionicPlatform, $rootScope, SearchService) {
  
    /*** Call API: Get the current locations and places ***/
    /*** Results are stored in $scope.places            ***/
    SearchService.getLocationsAndPlaces($scope);
    /******************************************************/

    $scope.showSearchBox = false;
    $scope.homestyle={
      "opacity": "1",
      "background": "rgb(255,255,255)"             
    };
                      
    $scope.gobackhome = function() {
      if ($scope.showSearchBox) {
         $scope.showSearchBox = false;
         $scope.getlocation();
      }
      else {
         $rootScope.goback();
      }
    }
    $scope.getlocation = function() {
      $scope.showLocationModal();
    }
    
    $ionicModal.fromTemplateUrl('templates/get-location.html', 
      {
		    scope: $scope,
		    animation: 'slide-in-up'
      }
    ).
    then(
      function (modal) {
		    $scope.getLocation = modal;
	     }
    );
	
    $scope.showLocationModal = function() {
      $scope.getLocation.show();
    };
  
    $scope.cancelLocationModal = function() {
      $scope.getLocation.hide();
    }
    
    $scope.enableLocation = function() {
      $scope.showLoading();
      $scope.cancelLocationModal();
      $state.go('results', {}, { reload: true });          
    }
    
    $scope.searchManually = function() {
      $scope.cancelLocationModal();
      $scope.showSearchBox = true;
      $timeout(                                  
       function() {
	       document.getElementById("id_searchq").value= "";
         document.getElementById("id_searchq").focus();
	       if (ionic.Platform.isAndroid()) {
            cordova.plugins.Keyboard.show();
         }
       }, 100
      );
    }
    
    $scope.showSearchOverlay = function() {
      $scope.homestyle = {                                 
        "opacity": "0.5",
        "background": "rgb(143,130,130)"
      }
    } 

    $scope.hideSearchOverlay = function() {
      $scope.homestyle={
        "opacity": "1",
        "background": "rgb(255,255,255)"
      };
    } 
  }
  
)
/********************************/
/*** HomePage Controler - END ***/
/********************************/


/********************************/
/*** Signin Controler - BEGIN ***/
/********************************/
.controller('SigninCtrl', 
  function ($scope, $state, $ionicLoading, $rootScope, $ionicPlatform) {

    $scope.user = {};

    $scope.login = function() {
      var msg = "";
      var re = /^([_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,5}))|(\d{6,}$)$/;
      var re2 = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      
      if (msg) {
        $rootScope.alerti(msg);
		  }
      else {
        $state.go('home', {}, { reload: true });
      }
    }      

    $scope.goto_signup = function() {
      $state.go('signup', {}, { reload: true });          
    }
    
  }
)
/******************************/
/*** Signin Controler - END ***/
/******************************/


/********************************/
/*** Signup Controler - BEGIN ***/
/********************************/
.controller('SignupCtrl', 
  function ($scope, $timeout, $state, $rootScope, $ionicLoading, $ionicPlatform) {

    $scope.user = {};
    $scope.activeslide = 0;
    $scope.slideon_0 = true;
    $scope.slideon_1 = false; 
    $scope.slideon_2 = false;
    $scope.slideon_3 = false;

    $scope.hideAllSlides = function() {
      $scope.slideon_0 = false;
      $scope.slideon_1 = false; 
      $scope.slideon_2 = false;
      $scope.slideon_3 = false;
    }

    $scope.advance = function() {
      $scope.hideAllSlides();
      if ($scope.activeslide < 3) {
        $scope.activeslide =  $scope.activeslide + 1;
        if ($scope.activeslide == 1) {
          $scope.slideon_1 = true;
        }
        else if ($scope.activeslide == 2) {
          $scope.slideon_2 = true;
        }
        else if ($scope.activeslide == 3) {
          $scope.slideon_3 = true;
        }
        else {                                       
          $scope.slideon_0 = true;
        }
        $timeout(                                  
          function() {
            document.getElementById("signupfield_" + $scope.activeslide.toString()).focus();
          }, 100
        );
      }
      else {
        $state.go('home', {}, { reload: true });        
      }
    }

    $scope.gobacksignup = function() {
      if ($scope.activeslide == 0) {
        $rootScope.goback();
      }
      else {
        $scope.hideAllSlides();
        $scope.activeslide =  $scope.activeslide -1;
        if ($scope.activeslide == 0) {
          $scope.slideon_0 = true;
        }
        else if ($scope.activeslide == 1) {
          $scope.slideon_1 = true;
        }
        else if ($scope.activeslide == 2) {
          $scope.slideon_2 = true;
        }
        else {                                       
          $scope.slideon_0 = true;
        }
        $timeout(
          function() {
            document.getElementById("signupfield_" + $scope.activeslide.toString()).focus();
          }, 100
        );        
      }
    } 

  }
)
/******************************/
/*** Signup Controler - END ***/
/******************************/


/*****************************************/
/*** Forgot Password Controler - BEGIN ***/
/*****************************************/
.controller('ForgotPasswordCtrl', 
  function ($scope, $state, $rootScope, $ionicLoading, $ionicPlatform) {

    $scope.fp = {};
    $scope.footerShow = false;
    $scope.optioncode = "phone";
    $scope.enterpassword = false;
    $scope.step1 = true;
    $scope.step2_1 = false;
    $scope.step2_2 = false;
    $scope.step3 = false;

    $scope.hideAllSteps = function() {
      $scope.step1 = false;
      $scope.step2_1 = false;
      $scope.step2_2 = false;
      $scope.step3 = false;
    }

    $scope.sendMeText = function() {
      $scope.optioncode = "phone";
      $scope.footerShow = true;
      $scope.hideAllSteps();
      $scope.fp.phone='';
      $scope.step2_1 = true;
    }

    $scope.sendMeEmail = function() {
      $scope.optioncode = "email";
      $scope.footerShow = true;
      $scope.hideAllSteps();
      $scope.fp.email='';
      $scope.step2_2 = true;
    }
    
    $scope.goNext = function() {
      if (!$scope.enterpassword) {
        if ( $scope.step2_1 ) {
          $scope.hideAllSteps();
          $scope.fp.code='';
          $scope.step3 = true;
        } 
        else if ( $scope.step2_2 ) {
          $scope.hideAllSteps();
          $scope.fp.code='';
          $scope.step3 = true;
        } 
        else if ( $scope.step3 ) {
          $scope.hideAllSteps();
          $scope.fp.password='';
          $scope.fp.confirmpassword='';
          $scope.enterpassword = true;
        } 
      }
      else {
        $scope.enterpassword = false;
        $state.go('signin', {}, { reload: true });          
      }
    } 
    
    $scope.goBackrp = function() {
      if ( $scope.step1 ) {
        $rootScope.goback();
      }
      else if  ($scope.step2_1) {
        $scope.footerShow = false;
        $scope.hideAllSteps();
        $scope.step1 = true;
      } 
      else if  ($scope.step2_2) {
        $scope.footerShow = false;
        $scope.hideAllSteps();
        $scope.step1 = true;
      } 
      else if  ($scope.step3) {
        $scope.hideAllSteps();
        if ($scope.optioncode=="phone") { 
          $scope.step2_1 = true;
        }
        if ($scope.optioncode=="email") { 
          $scope.step2_2 = true;
        }
      } 
      else {
        if ($scope.enterpassword) {
          $scope.enterpassword = false;
          $scope.hideAllSteps();
          $scope.step3 = true;
        }
        else {
          $scope.footerShow = false;
          $scope.hideAllSteps();
          $scope.step1 = true;                                           
        }
      }
    } 
                     
  }
)                            
/****************************************/
/*** Forgot Password Controler - END  ***/
/****************************************/

/***********************************/
/*** Results Controller - BEGIN  ***/
/***********************************/
.controller('ResultsCtrl', 

  function ($scope, $ionicPlatform, $state, $timeout, ResultsService, SearchService) {

    $scope.hideLoading();
    
    /*** Call API: Get the current locations and places ***/
    /*** Results are stored in $scope.places            ***/
    SearchService.getLocationsAndPlaces($scope);
    /******************************************************/

    /*** Call API: Get the places sorted by distance to the user. Here, all filters need to be sent as parameters  ***/
    /*** Results are stored in $scope.closePlaces                                                                  ***/
    ResultsService.getLocationsByProximity(
      $scope, 
      $scope.activeFilters, 
      $scope.activeServiceType, 
      $scope.activePriceRange, 
      $scope.filterrating.rating
    );
    /*****************************************************************************************************************/

    $scope.showSearchBox = false;
    $scope.homestyle={
      "opacity": "1",
      "background": "rgb(255,255,255)"
    };
    $scope.rating = {
      max:5                                                 
    };
    $scope.readOnly = true;

    $scope.goToStore = function(storeID) {
      $state.go('store', {storeID:storeID}, { reload: true });
    }
  
    $scope.goToSettings = function() {
      $state.go('settings', {}, { reload: true });
    } 

    $scope.showSearchBoxF = function() {
      $scope.showSearchBox = true;
      $timeout(                                  
        function() {
          document.getElementById("id_searchqResults").val='';
          document.getElementById("id_searchqResults").focus();
          if (ionic.Platform.isAndroid()) {
            cordova.plugins.Keyboard.show();
          }
        }, 100
      );
    }
    
    $scope.showSearchOverlay = function() {
      $scope.homestyle = {
        "opacity": "0.5",
        "background": "rgb(143,130,130)"
      }
    } 

    $scope.hideSearchOverlay = function() {
      $scope.homestyle={
        "opacity": "1",
        "background": "rgb(255,255,255)"
      };
      $scope.showSearchBox = false;
    } 

  }
  
)
/********************************/
/*** Results Controller - END ***/
/********************************/


/*********************************/
/*** Store Controller - BEGIN  ***/
/*********************************/
.controller('StoreCtrl', 
  
  function ($scope, $ionicLoading, $ionicPlatform, $timeout, $ionicModal, $stateParams, $state, ionicDatePicker, SearchService, FavoritesService, StoreService, UsersService) {

    $scope.showSearchBox = false;
    $scope.homestyle={
      "opacity": "1",
      "background": "rgb(255,255,255)"
    };
    var currentD = new Date();
    $scope.todayWeekDay = currentD.getDay();     
    $scope.rating = {};
    $scope.readOnly = true;
    $scope.reviewNoCutID = -1;
    $scope.writeAReview = false;
    $scope.submittedReview = false;
    $scope.activeTab = 0;
    $scope.storeCart = [];
    $scope.cartLength = 0;
    $scope.cartSubtotal = 0;
    $scope.cartTotal = 0;
    $scope.cartDiscount = 0;
    $scope.cartTip = 0;
    $scope.cartExpanded = false;
    $scope.reviewsDropDown={
      sort:'DESC'
    };
    $scope.schedule={
      date:null,
      timeHour:'11',
      timeMinutes:'55',
      timeAMPM:'PM',
      text:''
    };
    $scope.scheduleRepeat={
      enabled:false,
      frequency:"weekly",
      days:[],
      timeHour:'11',
      timeMinutes:'55',
      timeAMPM:'PM'
    }

    /*** Call API: Get the ID of logged user ***/
    $scope.userID = UsersService.getUserID();
    
    /*** Call API: Get the current locations and places ***/
    /*** Results are stored in $scope.places            ***/
    SearchService.getLocationsAndPlaces($scope);
    /******************************************************/

    /*** Call API: Get data of this store   ***/
    /*** Results are stored in $scope.store ***/
    StoreService.getStoreData($scope, $stateParams.storeID.toString());
    /******************************************/
    
    /*** Call API: Get reviews of this store          ***/
    /*** Results are stored in $scope.store.reviews   ***/
    StoreService.getStoreReviews($scope, $stateParams.storeID.toString(), $scope.userID, $scope.reviewsDropDown.sort);
    /****************************************************/
    
    /*** Call API: Get delivery fee for this store and this user ***/
    /*** Results are stored in $scope.store.deliveryFee          ***/
    StoreService.getDeliveryFee($scope, $stateParams.storeID.toString(), $scope.userID);
    /***************************************************************/

    /*** Call API: Get discount percent for this store and this user ***/
    /*** Results are stored in $scope.store.discount                  ***/
    StoreService.getDiscountPercent($scope, $stateParams.storeID.toString(), $scope.userID);
    /********************************************************************/

    /*** Call API: Get default tip percent for this store and this user ***/
    /*** Results are stored in $scope.store.tip                 ***/
    StoreService.getDefaultTipPercent($scope, $stateParams.storeID.toString(), $scope.userID);
    /**************************************************************/

    $ionicPlatform.ready(
      function() {
      
        for (var i in $scope.cart) {
          if ($scope.cart[i].storeID == $stateParams.storeID.toString()) {
            $scope.cartLength = $scope.cartLength + 1;
            $scope.cartSubtotal = $scope.cartSubtotal + parseFloat($scope.cart[i].price);
          } 
        }
        $scope.cartSubtotal = $scope.cartSubtotal +  $scope.store.deliveryFee;
        $scope.cartDiscount = ( ($scope.store.discount/100) * $scope.cartSubtotal );
        $scope.cartTip = ( ($scope.store.tip/100) * $scope.cartSubtotal);
        $scope.cartTotal = $scope.cartSubtotal - $scope.cartDiscount  + $scope.cartTip;

        $timeout(function() {
          var el = document.getElementById('tab_' + $scope.store.categories[0].id);
          angular.element(el).triggerHandler('click');
        }, 100);
        
      }
    );

    $scope.$watch('cart', 
      function () {
        $scope.cartLength = 0;
        $scope.cartSubtotal = 0;
        $scope.cartTotal = 0;
        $scope.cartDiscount = 0;
        $scope.cartTip = 0;
        for (var i in $scope.cart) {
          if ($scope.cart[i].storeID == $stateParams.storeID.toString()) {
            $scope.cartLength = $scope.cartLength + 1;
            $scope.cartSubtotal = $scope.cartSubtotal + parseFloat($scope.cart[i].price);
          } 
        }
        $scope.cartSubtotal = $scope.cartSubtotal +  $scope.store.deliveryFee;
        $scope.cartDiscount = ( ($scope.store.discount/100) * $scope.cartSubtotal );
        $scope.cartTip = ( ($scope.store.tip/100) * $scope.cartSubtotal);
        $scope.cartTotal = $scope.cartSubtotal - $scope.cartDiscount  + $scope.cartTip; 
      }, true
    );
    
    $scope.checkDailyCondition =  function() {
      if ($scope.scheduleRepeat.frequency == 'daily') {
        $scope.scheduleRepeat.days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
      }
      else {
        $scope.scheduleRepeat.days = [];
      }
    } 

    $scope.goToOrderConfirmation = function() {
      $state.go('order_confirmation', {storeID:$stateParams.storeID}, { reload: true });
    }
  
    $scope.toggleRepeatDay = function(day) {
      var index = $scope.scheduleRepeat.days.indexOf(day);
      if (index > -1) {
        $scope.scheduleRepeat.days.splice(index, 1);
        $scope.scheduleRepeat.frequency = 'weekly';
      }
      else {
        $scope.scheduleRepeat.days.push(day);
      }      
    } 
    
    $scope.expandCart = function() {
      $scope.cartExpanded = true;  
    } 
    
    $scope.contractCart = function() {
      $scope.cartExpanded = false;  
    } 

    $scope.showSearchBoxF = function() {
      $scope.showSearchBox = true;
      $timeout(                                  
        function() {
          document.getElementById("id_searchqStore").val='';
          document.getElementById("id_searchqStore").focus();
          if (ionic.Platform.isAndroid()) {
            cordova.plugins.Keyboard.show();
          }
        }, 100
      );
    }
    
    $scope.showSearchOverlay = function() {
      $scope.homestyle = {
        "opacity": "0.5",
        "background": "rgb(143,130,130)"
      }
    } 

    $scope.hideSearchOverlay = function() {
      $scope.homestyle={
        "opacity": "1",
        "background": "rgb(255,255,255)"
      };
      $scope.showSearchBox = false;
    } 

    $scope.saveToFavorite = function() {
      /*** Call API: Get the current locations and places ***/
      /*** Results are stored in $scope.places            ***/
      FavoritesService.saveStore($scope, $scope.store.id);
      /******************************************************/
    }
    
    $scope.nth = function(d) {
      if(d>3 && d<21) return 'th';
      switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
      }
    } 
    
    $scope.openDatePicker = function() {
      var initialDate = new Date();
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec']; 
      var ipObj1 = {
        callback: function (val) {
          $scope.schedule.date = val;
          var aDate = new Date(val);
          var aDate = days[aDate.getDay()] + ', ' + months[aDate.getMonth()] + ' ' + aDate.getDate() + $scope.nth(aDate.getDate());
          $scope.schedule.text = aDate.toString();
        },
        disabledDates: [],
        from: new Date(1900, 1, 1),
        to: new Date(2100, 1, 31),
        inputDate: initialDate,
        mondayFirst: true,
        closeOnSelect: false,
        templateType: 'popup'
      }
      ionicDatePicker.openDatePicker(ipObj1);
    }
    
    $scope.scheduleOrder = function() {
      $scope.showLoading();
      /*** Call API: Schedule order  ***/
      /*** It saves info in database ***/
      var scheduled = StoreService.scheduleOrder($scope, $stateParams.storeID.toString(), $scope.userID, $scope.cart, $scope.cartTip, $scope.schedule);
      /**********************************/
      $timeout(
        function() {
          if (scheduled) {
            var el = document.getElementById('tab_' + $scope.store.categories[0].id);
            angular.element(el).triggerHandler('click');
            $scope.hideLoading();
            $scope.alerti('Your order has been scheduled','Success');
          }
        }, 1000
      );	
    }
    
    $scope.scheduleRepeatOrder = function() {
      $scope.showLoading();
      /*** Call API: Schedule repeat order ***/
      /*** It saves info in database       ***/
      var scheduled = StoreService.scheduleRepeatOrder($scope, $stateParams.storeID.toString(), $scope.userID, $scope.cart, $scope.cartTip, $scope.scheduleRepeat);
      /**********************************/
      $timeout(
        function() {
          if (scheduled) {
            var el = document.getElementById('tab_' + $scope.store.categories[0].id);
            angular.element(el).triggerHandler('click');
            $scope.hideLoading();
            $scope.alerti('Your order has been scheduled to repeat on selected days and times','Success');
          }
        }, 1000
      );	
    } 
    
    $ionicModal.fromTemplateUrl('templates/repeat-modal.html', 
      {
		    scope: $scope,
		    animation: 'slide-in-up'
      }
    ).
    then(
      function (modal) {
		    $scope.repeatModal = modal;
	     }
    );
	
    $scope.showRepeatModal = function() {
      $scope.repeatModal.show();
      $timeout(
        function() {
          $scope.scheduleRepeat.enabled = false;
          var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec']; 
          var aDate = new Date();
          var aDate = days[aDate.getDay()] + ', ' + months[aDate.getMonth()] + ' ' + aDate.getDate() + $scope.nth(aDate.getDate());
          $scope.schedule.text = aDate.toString();
        }, 300
      );
    }
  
    $scope.cancelRepeatModal = function() {
      $scope.repeatModal.hide();
    }

    $ionicModal.fromTemplateUrl('templates/get-store-info.html', 
      {
		    scope: $scope,
		    animation: 'slide-in-up'
      }
    ).
    then(
      function (modal) {
		    $scope.getStoreInfo = modal;
	     }
    );
	
    $scope.showInfoModal = function() {
      /*** Call API: Get moreInfo (schedule, address and phone) of this store ***/
      /*** Results are stored as complementary part of $scope.store.moreIfo   ***/
      StoreService.getStoreMoreInfo($scope, $stateParams.storeID.toString());
      /**************************************************************************/
      $scope.getStoreInfo.show();
    };
  
    $scope.cancelInfoModal = function() {
      $scope.getStoreInfo.hide();
    }

    $ionicModal.fromTemplateUrl('templates/get-reviews.html', 
      {
		    scope: $scope,
		    animation: 'slide-in-up'
      }
    ).
    then(
      function (modal) {
		    $scope.getReviews = modal;
	     }
    );
	
    $scope.showReviewsModal = function() {
      $scope.getReviews.show();
    };
  
    $scope.cancelReviewsModal = function() {
      $scope.getReviews.hide();
      $scope.writeAReview = false;  
      $scope.submittedReview = false;
    }

    $scope.reloadReviews = function() {
      /*** Call API: Get reviews of this store          ***/
      /*** Results are stored in $scope.store.reviews   ***/
      StoreService.getStoreReviews($scope, $stateParams.storeID.toString(), $scope.userID, $scope.reviewsDropDown.sort);
      /****************************************************/
    }
    
    $scope.reviewNoCut = function(reviewID) {
      $scope.reviewNoCutID = reviewID; 
    }
    
    $scope.reviewNoCutRelease = function() {
      $scope.reviewNoCutID = -1; 
    } 
    
    $scope.writeReview = function() {
      $scope.userReview = {};
      $scope.writeAReview = true;      
      $timeout(
        function() {
          document.getElementById('label_displayname').style.display = 'none';
          document.getElementById('label_headline').style.display = 'none';
          document.getElementById('label_reviewtext').style.display = 'none';
        }, 100
      );	
    }

    $scope.submitReview = function() {
      $scope.writeAReview = false;      
      $scope.submittedReview = true;      
    }
    
    $scope.gotScrolled = function() {
      var widthLongContainer = $scope.store.categories.length * 72;
      document.getElementById('id_long_container').setAttribute("style","width:" + widthLongContainer + "px");
      document.getElementById('cartIconText').style.display = 'none';    
    }
    
    $scope.completeCart = function() {
      document.getElementById('cartIconText').style.display = 'block';      
    }  
    
    $scope.selectTab = function(categoryID) {
      /*** Call API: Get items of the category for this store ***/
      /*** Results are stored in $scope.store.categoryItems   ***/
      StoreService.getCategoryItems($scope, categoryID);
      /**********************************************************/
      $scope.activeTab = categoryID;
      $scope.hideMOPanel();      
    }
    
    $scope.showCart = function() {
      $scope.cartExpanded = false;
      $scope.activeTab = 0;
    } 
    
    $scope.wantThis = function(item) {
      if (item.options.length == 0) {
        document.getElementById('addItemToCart_' + item.id).style.display = 'block';
      }
      else {
        $scope.item_mo = item;
        $scope.showMOPanel();
      }
    } 
    
    $scope.hideAddItemCart = function(item) {
      $timeout(
        function() {
          document.getElementById('addItemToCart_' + item.id).style.display = 'none';
        }, 100
      );	
    }
    
    $scope.showMOPanel = function() {
      $scope.auxArray=[];
      $timeout(
        function() {
          document.getElementById('regularPanel').style.display = 'none';
          document.getElementById('MOPanel').style.display = 'block';
        }, 100
      );	
    }
    
    $scope.hideMOPanel = function() {
      $timeout(
        function() {
          document.getElementById('MOPanel').style.display = 'none';
          document.getElementById('regularPanel').style.display = 'block';
        }, 100
      );	
    }
    
    $scope.toggleOption = function(elem)  {
      var index = objectIndexOf2($scope.auxArray, elem);
      if (index > -1) {
        $scope.auxArray.splice(index,1);
      }
      else {
        for (i=0; i<$scope.auxArray.length; ++i) {
          if ($scope.auxArray[i].type === elem.type) {
            $scope.auxArray.splice(i,1);
          }
        }
        $scope.auxArray.push(elem);
      }
    }
    
    $scope.addThisToCard = function(item, optionsArray, source) {
      if (source=='nooptions') {
        var finalPrice = item.price;
        var q = document.getElementById('quantity_' + item.id);
      }
      if (source=='multioptions') {
        var floatPrice = parseFloat(item.price);
        for (i=0; i<optionsArray.length; ++i) {
          if ( parseFloat(optionsArray[i].inc) > 0) {
            floatPrice = floatPrice + parseFloat(optionsArray[i].inc);
          }
        }
        var finalPrice = floatPrice + '';                    
        var q = document.getElementById('quantity_mo');
      }
      finalPricexQuantity = ( parseFloat(finalPrice) * parseFloat(q.options[q.selectedIndex].value) );
      finalPrice = finalPricexQuantity + '';    
      var cartObject =  {
        ident:Date.now(),
        storeID:$scope.store.id,
        id:item.id, 
        name:item.name, 
        price:finalPrice, 
        description:item.description, 
        options:optionsArray,
        quantity:q.options[q.selectedIndex].value,
        source:source
      }
      $scope.addToCart(cartObject);
      $timeout(
        function() {
          document.getElementById('addItemToCart_' + item.id).style.display = 'none';
          $scope.hideMOPanel();
        }, 100
      );
      $scope.alerti('You have added ' + item.name + ' to your cart.','ADDED');          
    }

  }
  
)
/*******************************/
/*** Store Controller - END  ***/
/*******************************/


/************************************/
/*** Settings Controller - BEGIN  ***/
/************************************/
.controller('SettingsCtrl',                                    
  
  function ($scope, $ionicLoading, $ionicPlatform) {
  }

)
/**********************************/
/*** Settings Controller - END  ***/
/**********************************/


/**********************************************/
/*** Order Confirmation Controller - BEGIN ***/
/**********************************************/
.controller('OrderConfirmationCtrl',                                    
  
  function ($scope, $ionicLoading, $ionicPlatform, $stateParams, $ionicModal, $timeout, $rootScope, UsersService, StoreService) {
    $scope.storeID = $stateParams.storeID.toString();
    $scope.cartLength = 0;
    $scope.userAddresses = [];
    $scope.userCards = [];
    $scope.order = {
      deliverTo:null,
      creditCard: null,
      tip:10,
      tipValue:0,
      subtotal:0,
      discount:0,
      discountValue:0
    }
    $scope.newAddress = {
    }
    $scope.newCard = {
    }
    $scope.store = {
    }
    
    /*** Call API: Get the ID of logged user ***/
    $scope.userID = UsersService.getUserID();
        
    /*** Call API: Get the stored user addresses    ***/
    /*** Results are stored in $scope.userAddresses ***/
    UsersService.getAddresses($scope, $scope.userID);
    /**************************************************/

    /*** Call API: Get the stored user credit cards ***/
    /*** Results are stored in $scope.userCards ***/
    UsersService.getCards($scope, $scope.userID);
    /**************************************************/

    /*** Call API: Get delivery fee for this store and this user ***/
    /*** Results are stored in $scope.store.deliveryFee          ***/
    StoreService.getDeliveryFee($scope, $stateParams.storeID.toString(), $scope.userID);
    /***************************************************************/

    /*** Call API: Get discount percent for this store and this user ***/
    /*** Results are stored in $scope.store.discount                  ***/
    StoreService.getDiscountPercent($scope, $stateParams.storeID.toString(), $scope.userID);
    /********************************************************************/

    /*** Call API: Get default tip percent for this store and this user ***/
    /*** Results are stored in $scope.store.tip                 ***/
    StoreService.getDefaultTipPercent($scope, $stateParams.storeID.toString(), $scope.userID);
    /**************************************************************/

    $ionicPlatform.ready(
      function() {
      
        for (var i in $scope.cart) {
          if ($scope.cart[i].storeID == $stateParams.storeID.toString()) {
            $scope.cartLength = $scope.cartLength + 1;
            $scope.order.subtotal = $scope.order.subtotal + parseFloat($scope.cart[i].price);
          } 
        }
        $scope.order.subtotal = $scope.order.subtotal +  $scope.store.deliveryFee;
        $scope.order.discount = $scope.store.discount; 
        $scope.order.discountValue = ( ($scope.store.discount/100) * $scope.order.subtotal );
        $scope.order.tip = $scope.store.tip;
        $scope.order.tipValue = ( ($scope.store.tip/100) * $scope.order.subtotal);
        $scope.order.total = $scope.order.subtotal - $scope.order.discountValue  + $scope.order.tipValue;
      }
    );
    
    $scope.updateTip = function() {
      $scope.order.tipValue = ( ($scope.order.tip/100) * $scope.order.subtotal);
      $scope.order.total = $scope.order.subtotal - $scope.order.discountValue  + $scope.order.tipValue;
    }

    $scope.selectThisAddress = function(address) {
      $scope.order.deliverTo = address;
      $scope.cancelSelectAddressModal();
    }
    
    $scope.selectThisCard = function(card) {
      $scope.order.creditCard = card;
      $scope.cancelSelectCardModal();
    }

    $ionicModal.fromTemplateUrl('templates/select-address.html', 
      {
		    scope: $scope,
		    animation: 'slide-in-up'
      }
    ).
    then(
      function (modal) {
		    $scope.selectAddress = modal;
	     }
    );
	
    $scope.showSelectAddressModal = function() {
      $scope.selectAddress.show();
    }
  
    $scope.cancelSelectAddressModal = function() {
      $scope.selectAddress.hide();
    }
  
    $ionicModal.fromTemplateUrl('templates/select-card.html', 
      {
		    scope: $scope,
		    animation: 'slide-in-up'
      }
    ).
    then(
      function (modal) {
		    $scope.selectCard = modal;
	     }
    );
	
    $scope.showSelectCardModal = function() {
      $scope.selectCard.show();
    }
  
    $scope.cancelSelectCardModal = function() {
      $scope.selectCard.hide();
    }

    $scope.addNewUserAddress = function() {
      $scope.cancelSelectAddressModal();
      $scope.showAddNewAddressModal();
      $scope.newAddress = {};
      $timeout(
        function() {
          document.getElementById('color1').className = 'colorOption';
          document.getElementById('color2').className = 'colorOption';
          document.getElementById('color3').className = 'colorOption';
          document.getElementById('color4').className = 'colorOption';
          document.getElementById('color5').className = 'colorOption';
          document.getElementById('color6').className = 'colorOption';
          document.getElementById('label_addressName').style.display = 'none';
          document.getElementById('label_address').style.display = 'none';
          document.getElementById('label_specifications').style.display = 'none';
        }, 100
      );	
    }
    
    $scope.setNewAddressColor = function(color, id) {
      document.getElementById('color1').className = 'colorOption';
      document.getElementById('color2').className = 'colorOption';
      document.getElementById('color3').className = 'colorOption';
      document.getElementById('color4').className = 'colorOption';
      document.getElementById('color5').className = 'colorOption';
      document.getElementById('color6').className = 'colorOption';
      document.getElementById(id).className = 'colorOptionChecked';      
      $scope.newAddress.color = color;
    }
    
    $scope.saveNewAddress = function() {
      $scope.cancelAddNewAddressModal();
      $scope.showLoading();
      /*** Call API: Save new user address in database ***/
      /*** It saves info in database       ***/
      $timeout(
        function() {
          var saved = UsersService.saveNewAddress($scope, $scope.newAddress, $scope.userID);
          if (saved) {
            $scope.hideLoading();
            $scope.alerti('Your new address have been saved','Success');
          }
        }, 1000
      );
      /**************************************************/
    }
    
    $ionicModal.fromTemplateUrl('templates/add-new-address.html', 
      {
		    scope: $scope,
		    animation: 'slide-in-up'
      }
    ).
    then(
      function (modal) {
		    $scope.addNewAddress = modal;
	     }
    );
	
    $scope.showAddNewAddressModal = function() {
      $scope.addNewAddress.show();
    }
  
    $scope.cancelAddNewAddressModal = function() {
      $scope.addNewAddress.hide();
    }

    $scope.addNewUserCard = function() {
      $scope.cancelSelectCardModal();
      $scope.showAddNewCardModal();
      $scope.newCard = {};
      $timeout(
        function() {
          document.getElementById('cc_color1').className = 'colorOption';
          document.getElementById('cc_color2').className = 'colorOption';
          document.getElementById('cc_color3').className = 'colorOption';
          document.getElementById('cc_color4').className = 'colorOption';
          document.getElementById('cc_color5').className = 'colorOption';
          document.getElementById('cc_color6').className = 'colorOption';
          document.getElementById('label_cardName').style.display = 'none';
          document.getElementById('label_cardNumber').style.display = 'none';
          document.getElementById('label_expiration').style.display = 'none';
        }, 100
      );	
    }
    
    $scope.setNewCardColor = function(color, id) {
      document.getElementById('cc_color1').className = 'colorOption';
      document.getElementById('cc_color2').className = 'colorOption';
      document.getElementById('cc_color3').className = 'colorOption';
      document.getElementById('cc_color4').className = 'colorOption';
      document.getElementById('cc_color5').className = 'colorOption';
      document.getElementById('cc_color6').className = 'colorOption';
      document.getElementById(id).className = 'colorOptionChecked';      
      $scope.newCard.color = color;
    }
    
    $scope.saveNewCard = function() {
      $scope.cancelAddNewCardModal();
      $scope.showLoading();
      /*** Call API: Save new user card in database ***/
      /*** It saves info in database       ***/
      $timeout(
        function() {
          var saved = UsersService.saveNewCard($scope, $scope.newCard, $scope.userID);
          if (saved) {
            $scope.hideLoading();
            $scope.alerti('Your new credit card have been saved','Success');
          }
        }, 1000
      );
      /**************************************************/
    }
    
    $ionicModal.fromTemplateUrl('templates/add-new-card.html', 
      {
		    scope: $scope,
		    animation: 'slide-in-up'
      }
    ).
    then(
      function (modal) {
		    $scope.addNewCard = modal;
	     }
    );
	
    $scope.showAddNewCardModal = function() {
      $scope.addNewCard.show();
    }
  
    $scope.cancelAddNewCardModal = function() {
      $scope.addNewCard.hide();
    }

    $rootScope.showFooter = true;

    window.addEventListener('native.keyboardshow', function() {
      $rootScope.showFooter = false;
      $rootScope.$apply();
    });

    window.addEventListener('native.keyboardhide', function() {
      $rootScope.showFooter = true;
      $rootScope.$apply();
    });

  }

)
/*******************************************/
/*** Order Confirmation Controller - END ***/
/*******************************************/

/*******************************************/
/*** Order Processing Controller - BEGIN ***/
/******************************************/
.controller('OrderProcessingCtrl',                                    
  
  function ($scope, $ionicLoading, $ionicPlatform) {
  }

)
/*****************************************/
/*** Order Processing Controller - END ***/
/*****************************************/

;