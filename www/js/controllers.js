angular.module('starter.controllers',['ngCordova'])  

/****************************************/
/*** Some rootScope Utilities - BEGIN ***/
/****************************************/
.run(                                      
  
  function($rootScope, $ionicHistory, $ionicPopup, $timeout, $state, $ionicModal, $ionicLoading, $ionicPlatform, SessionService, SearchService) {
  
    $rootScope.goToHome = function() {
      $state.go('home', {}, { reload: true });
    } 
    
    $rootScope.goToFavorites = function() {
      $state.go('favorites', {}, { reload: true });
    } 
  
    $rootScope.goToSettings = function() {
      $state.go('settings', {}, { reload: true });
    } 

    $rootScope.goback = function() {
      $timeout(
        function() {
          $ionicHistory.goBack();
        }, 100
      );	
    }
  
    $ionicPlatform.registerBackButtonAction(
      function (event) {
        event.preventDefault();
        if ( ($state.current.name == 'order_placed') || ($state.current.name == 'order_processing') )  {
          //do nothing();
        }
        else {
          $rootScope.goback();
        } 
      }, 100
    );

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

    $rootScope.clearCart = function(storeID, alert) {
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
  
  function ($rootScope, $scope, $ionicModal, $ionicNavBarDelegate, $cordovaStatusbar, $state, $timeout, $ionicLoading, $ionicPlatform, SearchService) {
  
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
  function ($rootScope, $scope, $state, $ionicLoading, $ionicPlatform) {

    $scope.user = {};

    $scope.login = function() {
      $state.go('home', {}, { reload: true });
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
  function ($rootScope, $scope, $timeout, $state, $ionicLoading, $ionicPlatform) {

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
  function ($rootScope, $scope, $state, $ionicLoading, $ionicPlatform) {

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

  function ($rootScope, $scope, $ionicPlatform, $state, $timeout, ResultsService, SearchService) {

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
  
  function ($rootScope, $scope, $ionicLoading, $ionicPlatform, $timeout, $ionicModal, $stateParams, $state, ionicDatePicker, SearchService, FavoritesService, StoreService, UsersService) {

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
    $scope.store={
      live_deal:false
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

        $timeout(
          function() {
            $scope.selectTab($scope.store.categories[0].id);
          }, 300
        );
        
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
      var saved = FavoritesService.saveStore($scope, $scope.store.id);
      if (saved) {
        $rootScope.alerti('Store saved in your favorites!','Success');
      }          
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
            $rootScope.alerti('Your order has been scheduled','Success');
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
            $rootScope.alerti('Your order has been scheduled to repeat on selected days and times','Success');
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
      $rootScope.alerti('You have added ' + item.name + ' to your cart.','ADDED');          
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
  
  function ($rootScope, $scope, $ionicLoading, $ionicPlatform, $ionicModal, $timeout, $state, UsersService) {
    $scope.tabSelected = 'generalSettings';
    $scope.user={
    }
    $scope.settings={
    }
    
    /*** Call API: Get the ID of logged user ***/
    $scope.userID = UsersService.getUserID();

    /*** Call API: Get the settings of logged user ***/
    /*** Data are stored in $scope.user            ***/
    UsersService.getAllSettings($scope, $scope.userID);
    /************************************************/

    /*** Call API: Get the logged user data ***/
    /*** Data are stored in $scope.user     ***/
    UsersService.getUserBasicData($scope, $scope.userID);
    /******************************************/
    
    $scope.activateTab = function (tab) {
      $scope.tabSelected = tab;
    }
    
    $scope.saveName = function() {
      $scope.showLoading();
      /*** Call API: Update the user name ***/
      /*** Info is updated in database    ***/
      var saved = UsersService.saveName($scope, $scope.user);
      /******************************************/
      if (saved) {
        $scope.cancelChangeNameModal();
        $timeout(
          function() {
            $scope.hideLoading();
            $state.go($state.current, {}, {reload: true});
            $rootScope.alerti('Your name has been updated','Success');
          }, 1000
        );	
      }
    }
    
    $scope.savePassword = function() {
      $scope.showLoading();
      /*** Call API: Update the user password ***/
      /*** Info is updated in database    ***/
      var saved = UsersService.savePassword($scope, $scope.user);
      /******************************************/
      if (saved) {
        $scope.cancelChangePasswordModal();
        $timeout(
          function() {
            $scope.hideLoading();
            $state.go($state.current, {}, {reload: true});
            $rootScope.alerti('Your password has been updated','Success');
          }, 1000
        );	
      }
    }

    $scope.saveEmail = function() {
      $scope.showLoading();
      /*** Call API: Update the user e-mail ***/
      /*** Info is updated in database    ***/
      var saved = UsersService.saveEmail($scope, $scope.user);
      /******************************************/
      if (saved) {
        $scope.cancelChangeEmailModal();
        $timeout(
          function() {
            $scope.hideLoading();
            $state.go($state.current, {}, {reload: true});
            $rootScope.alerti('Your e-mail has been updated','Success');
          }, 1000
        );	
      }
    }

    $scope.saveStatementEmail = function() {
      $scope.showLoading();
      /*** Call API: Update the user statement e-mail ***/
      /*** Info is updated in database                ***/
      var saved = UsersService.saveStatementEmail($scope, $scope.user);
      /**************************************************/
      if (saved) {
        $scope.cancelChangeStatementEmailModal();
        $timeout(
          function() {
            $scope.hideLoading();
            $rootScope.alerti('Your statement e-mail has been updated','Success');
          }, 1000
        );	
      }
    }

    $scope.savePhone = function() {
      $scope.showLoading();
      /*** Call API: Update the user phone ***/
      /*** Info is updated in database    ***/
      var saved = UsersService.savePhone($scope, $scope.user);
      /******************************************/
      if (saved) {
        $scope.cancelChangePhoneModal();
        $timeout(
          function() {
            $scope.hideLoading();
            $state.go($state.current, {}, {reload: true});
            $rootScope.alerti('Your phone has been updated','Success');
          }, 1000
        );	
      }
    }
    
    $scope.settingAddresses = function() {
      $state.go('addresses', {}, { reload: true });
    }

    $scope.settingCreditCards = function() {
      $state.go('credit_cards', {}, { reload: true });
    }
    
    $scope.updateEmailStatementFrequency = function() {
      $scope.showLoading();
      /*** Call API: Update the e-mail statement frequency ***/
      /*** Info is updated in database                     ***/
      var saved = UsersService.updateEmailStatementFrequency($scope, $scope.settings.emailStatementFrequency);
      /*******************************************************/
      if (saved) {
        $timeout(
          function() {
            $scope.hideLoading();
            $rootScope.alerti('Your e-mail statement frequency has been updated','Success');
          }, 1000
        );	
      }
    }
    
    $scope.updateToggles = function() {
      /*** Call API: Update settings quietly when a toggle is changed ***/
      /*** Info is updated in database                                ***/
      UsersService.updateToggles($scope, $scope.settings);
      /*******************************************************/
    }

    /*** Settings Modals ***/
    // Change name
    $ionicModal.fromTemplateUrl('templates/change-name.html', 
      {
		    scope: $scope,
		    animation: 'slide-in-up'
      }
    ).
    then(
      function (modal) {
		    $scope.changeName = modal;
	     }
    );
    $scope.showChangeNameModal = function() {
      $scope.changeName.show();
    };
    $scope.cancelChangeNameModal = function() {
      $scope.changeName.hide();
    }
    // Change password
    $ionicModal.fromTemplateUrl('templates/change-password.html', 
      {
		    scope: $scope,
		    animation: 'slide-in-up'
      }
    ).
    then(
      function (modal) {
		    $scope.changePassword = modal;
	     }
    );
    $scope.showChangePasswordModal = function() {
      $scope.changePassword.show();
    };
    $scope.cancelChangePasswordModal = function() {
      $scope.changePassword.hide();
    }
    // Change e-mail
    $ionicModal.fromTemplateUrl('templates/change-email.html', 
      {
		    scope: $scope,
		    animation: 'slide-in-up'
      }
    ).
    then(
      function (modal) {
		    $scope.changeEmail = modal;
	     }
    );
    $scope.showChangeEmailModal = function() {
      $scope.changeEmail.show();
    };
    $scope.cancelChangeEmailModal = function() {
      $scope.changeEmail.hide();
    }
    // Change phone
    $ionicModal.fromTemplateUrl('templates/change-phone.html', 
      {
		    scope: $scope,
		    animation: 'slide-in-up'
      }
    ).
    then(
      function (modal) {
		    $scope.changePhone = modal;
	     }
    );
    $scope.showChangePhoneModal = function() {
      $scope.changePhone.show();
    };
    $scope.cancelChangePhoneModal = function() {
      $scope.changePhone.hide();
    }
    // Change statement email
    $ionicModal.fromTemplateUrl('templates/change-statement-email.html', 
      {
		    scope: $scope,
		    animation: 'slide-in-up'
      }
    ).
    then(
      function (modal) {
		    $scope.changeStatementEmail = modal;
	     }
    );
    $scope.showChangeStatementEmailModal = function() {
      $scope.changeStatementEmail.show();
    };
    $scope.cancelChangeStatementEmailModal = function() {
      $scope.changeStatementEmail.hide();
    }

  }       

)
/**********************************/
/*** Settings Controller - END  ***/
/**********************************/


/**********************************************/
/*** Order Confirmation Controller - BEGIN ***/
/**********************************************/
.controller('OrderConfirmationCtrl',                                    
  
  function ($rootScope, $scope, $ionicLoading, $ionicPlatform, $stateParams, $ionicModal, $timeout, $state, UsersService, StoreService) {
    $scope.storeID = $stateParams.storeID.toString();
    $scope.cartLength = 0;
    $scope.userAddresses = [];
    $scope.userCards = [];
    $scope.latestIdent = 0;
    $scope.addressColorSelected = 0;
    $scope.cardColorSelected = 0;
    $scope.CCTypeImg = 'generic';
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
            $scope.latestIdent = $scope.cart[i].ident;
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
          document.getElementById('label_addressName').style.display = 'none';
          document.getElementById('label_address').style.display = 'none';
          document.getElementById('label_specifications').style.display = 'none';
        }, 100
      );	
    }
    
    $scope.setNewAddressColor = function(color, id) {
      $timeout(
        function() {
          $scope.addressColorSelected = id;
          $scope.newAddress.color = color;
        }, 100
      );
    }
    
    $scope.saveNewAddress = function() {
      $scope.cancelAddNewAddressModal();
      $scope.showLoading();
      $timeout(
        function() {
          /*** Call API: Save new user address in database ***/
          /*** It saves info in database       ***/
          var saved = UsersService.saveNewAddress($scope, $scope.newAddress, $scope.userID);
          if (saved) {
            $scope.hideLoading();
            $state.go($state.current, {storeID:$scope.storeID}, {reload: true});
            $rootScope.alerti('Your new address have been saved','Success');
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
          document.getElementById('label_cardName').style.display = 'none';
          document.getElementById('label_cardNumber').style.display = 'none';
          document.getElementById('label_expiration').style.display = 'none';
          document.getElementById('label_ccv').style.display = 'none';
        }, 100
      );	
    }
    
    $scope.setNewCardColor = function(color, id) {
      $timeout(
        function() {
          $scope.cardColorSelected = id;
          $scope.newCard.color = color;
        }, 100
      );
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
            $state.go($state.current, {storeID:$scope.storeID}, {reload: true});
            $rootScope.alerti('Your new credit card have been saved','Success');
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

    $scope.processOrder = function() {
      $rootScope.orderToProcess = $scope.order;
      $state.go('order_processing', {storeID:$scope.storeID, orderTotal: $scope.order.total}, { reload: true });      
    } 
    
    $scope.cc_format = function() {
      value =  $scope.newCard.number;
      if ( (value !== null) && (typeof value != 'undefined') ) {
        $scope.CCTypeImg = getCardType($scope.newCard.number);
        var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        var matches = v.match(/\d{4,16}/g);
        var match = matches && matches[0] || ''
        var parts = []

        for (i=0, len=match.length; i<len; i+=4) {
          parts.push(match.substring(i, i+4))
        }

        if (parts.length) {
          $scope.newCard.number = parts.join(' ')
        } 
        
        else {
          $scope.newCard.number =  value
        }
      }
    }
    
    $scope.setGenericCard = function() {
      $scope.CCTypeImg = 'generic';
    }

  }

)
/*******************************************/
/*** Order Confirmation Controller - END ***/
/*******************************************/

/*******************************************/
/*** Order Processing Controller - BEGIN ***/
/******************************************/                       
.controller('OrderProcessingCtrl',                                    
  
  function ($rootScope, $scope, $ionicLoading, $ionicPlatform, $stateParams, $timeout, $state, OrdersService) {
    $timeout(
      function() {
        /*** Call API: Process the order                                     ***/
        /*** It saves info in database. Order ID is stored in $scope.orderID ***/
        var processed = OrdersService.processOrder($scope, $rootScope.orderToProcess, $scope.userID);
        if (processed) {
          $scope.clearCart($stateParams.storeID, false);
          $state.go('order_placed', {storeID:$stateParams.storeID.toString(), orderID:$scope.orderID, orderTotal:$stateParams.orderTotal.toString()}, { reload: true });
        }      
      }, 2000
    );
  }

)
/*****************************************/
/*** Order Processing Controller - END ***/
/*****************************************/

/***************************************/
/*** Order Placed Controller - BEGIN ***/
/***************************************/
.controller('OrderPlacedCtrl',                                    
  
  function ($rootScope, $scope, $ionicLoading, $ionicPlatform, $stateParams, $state) {
    $scope.orderTotal = $stateParams.orderTotal.toString();
    
    $scope.goToOrderStatus = function() {
      $state.go('order_status', {orderID:$stateParams.orderID.toString()}, { reload: true });
    }
    
    $scope.goToOrderReceipt = function() {
      $state.go('order_receipt', {orderID:$stateParams.orderID.toString()}, { reload: true });
    }
    
    $scope.goHome = function() {
      $state.go('home', {}, { reload: true });
    }

  }

)
/*************************************/
/*** Order Placed Controller - END ***/
/*************************************/


/*****************************************/
/*** Order Status Controller - BEGIN  ***/
/****************************************/
.controller('OrderStatusCtrl',                                    
  
  function ($rootScope, $scope, $ionicLoading, $ionicPlatform, $stateParams) {
    $scope.orderID = $stateParams.orderID.toString();
  }

)
/**************************************/
/*** Order Status Controller - END  ***/
/**************************************/


/*****************************************/
/*** Order Receipt Controller - BEGIN  ***/
/****************************************/
.controller('OrderReceiptCtrl',                                    
  
  function ($rootScope, $scope, $ionicLoading, $ionicPlatform, $stateParams) {
    $scope.orderID = $stateParams.orderID.toString();
  }

)
/**************************************/
/*** Order Receipt Controller - END  ***/
/**************************************/

/*************************************/
/*** Addresses Controller - BEGIN  ***/
/*************************************/
.controller('AddressesCtrl',                                    
  
  function ($rootScope, $scope, $ionicLoading, $ionicPlatform, $stateParams, $timeout, $ionicModal, $state, UsersService, SearchService) {

    $scope.addressColorSelected = '';
    $scope.newAddress = {
    }
    $scope.userAddresses = {
    }
    $scope.homestyle={
      "opacity": "1",
      "background": "rgb(255,255,255)"             
    };

    /*** Call API: Get the ID of logged user ***/
    $scope.userID = UsersService.getUserID();

    /*** Call API: Get the stored user addresses    ***/
    /*** Results are stored in $scope.userAddresses ***/
    UsersService.getAddresses($scope, $scope.userID);
    /**************************************************/

    /*** Call API: Get the current locations and places ***/
    /*** Results are stored in $scope.places            ***/
    SearchService.getLocationsAndPlaces($scope);
    /******************************************************/

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

    $scope.addNewUserAddress = function() {
      $scope.showAddNewAddressModal();
      $scope.addressColorSelected = '';
      $scope.newAddress = {};
      $timeout(
        function() {
          document.getElementById('label_addressName').style.display = 'none';
          document.getElementById('label_address').style.display = 'none';
          document.getElementById('label_specifications').style.display = 'none';
        }, 100
      );	
    }
    
    $scope.setNewAddressColor = function(color, id) {
      $timeout(
        function() {
          $scope.addressColorSelected = id;
          $scope.newAddress.color = color;
        }, 100
      );
    }

    $scope.saveNewAddress = function() {
      $scope.cancelAddNewAddressModal();
      $scope.showLoading();
      $timeout(
        function() {
          /*** Call API: Save new user address in database ***/
          /*** It saves info in database       ***/
          var saved = UsersService.saveNewAddress($scope, $scope.newAddress, $scope.userID);
          if (saved) {
            $scope.hideLoading();
            $state.go($state.current, {}, {reload: true});
            $rootScope.alerti('Your new address have been saved','Success');
          }
        }, 1000
      );
    }
    
    $scope.editAddress = function(addressID) {
      $state.go('edit_address', {addressID:addressID}, { reload: true });
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
/**********************************/
/*** Addresses Controller - END  **/
/**********************************/

/*************************************/
/*** Credit Cards Controller - BEGIN  ***/
/*************************************/
.controller('CreditCardsCtrl',                                    
  
  function ($rootScope, $scope, $ionicLoading, $ionicPlatform, $stateParams, $state, $timeout, $ionicModal, UsersService, SearchService) {
    $scope.cardColorSelected = '';
    $scope.CCTypeImg = 'generic';
    $scope.newCard = {
    }
    $scope.userCards = {
    }
    $scope.homestyle={
      "opacity": "1",
      "background": "rgb(255,255,255)"             
    };

    /*** Call API: Get the ID of logged user ***/
    $scope.userID = UsersService.getUserID();

    /*** Call API: Get the stored user credit cards ***/
    /*** Results are stored in $scope.userCards ***/
    UsersService.getCards($scope, $scope.userID);

    /*** Call API: Get the current locations and places ***/
    /*** Results are stored in $scope.places            ***/
    SearchService.getLocationsAndPlaces($scope);
    /******************************************************/

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

    $scope.selectThisCard = function(card) {
      $scope.order.creditCard = card;
      $scope.cancelSelectCardModal();
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


    $scope.addNewUserCard = function() {
      $scope.cancelSelectCardModal();
      $scope.showAddNewCardModal();
      $scope.newCard = {};
      $timeout(
        function() {
          document.getElementById('label_cardName').style.display = 'none';
          document.getElementById('label_cardNumber').style.display = 'none';
          document.getElementById('label_expiration').style.display = 'none';
          document.getElementById('label_ccv').style.display = 'none';
        }, 100
      );	
    }
    
    $scope.setNewCardColor = function(color, id) {
      $timeout(
        function() {
          $scope.cardColorSelected = id;
          $scope.newCard.color = color;
        }, 100
      );
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
            $state.go($state.current, {}, {reload: true});
            $rootScope.alerti('Your new credit card have been saved','Success');
          }
        }, 1000
      );
      /**************************************************/
    }
    
    $scope.editCreditCard = function(creditCardID) {
      $state.go('edit_credit_card', {creditCardID:creditCardID}, { reload: true });
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

    $scope.processOrder = function() {
      $rootScope.orderToProcess = $scope.order;
      $state.go('order_processing', {storeID:$scope.storeID, orderTotal: $scope.order.total}, { reload: true });      
    } 
    
    $scope.cc_format = function () {
      $scope.CCTypeImg = getCardType($scope.newCard.number);
      value =  $scope.newCard.number;
      if ( (value !== null) && (typeof value != 'undefined') ) {
        var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        var matches = v.match(/\d{4,16}/g);
        var match = matches && matches[0] || ''
        var parts = []

        for (i=0, len=match.length; i<len; i+=4) {
          parts.push(match.substring(i, i+4))
        }

        if (parts.length) {
          $scope.newCard.number = parts.join(' ')
        } 
        
        else {
          $scope.newCard.number =  value
        }
      }
    }    

    $scope.setGenericCard = function() {
      $scope.CCTypeImg = 'generic';
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
/**************************************/
/*** Credit Cards Controller - END  **/
/*************************************/

/*****************************************/
/*** Edit Address Controller - BEGIN  ***/
/****************************************/
.controller('EditAddressCtrl',                                    
  
  function ($rootScope, $scope, $ionicLoading, $ionicPlatform, $stateParams, $ionicModal, $timeout, $state, $ionicPopup, UsersService) {
    $scope.addressID = $stateParams.addressID;
    $scope.address = {
    };

    /*** Call API: Get the ID of logged user ***/
    $scope.userID = UsersService.getUserID();

    /*** Call API: Get the address details    ***/
    /*** Results are stored in $scope.address ***/
    UsersService.getAddressData($scope, $scope.addressID);
    /********************************************/

    $scope.deleteAddress = function() {
      var confirmPopup = $ionicPopup.confirm(
        {
          title: 'Confirm this action',
          template: 'Are you sure you want to delete this address?'
        }
      );
      confirmPopup.then(
        function(res) {
          if (res) {
            $scope.showLoading();
            $timeout(
              function() {
                /*** Call API: Delete specific user address ***/
                /*** It deletes from database               ***/
                var deleted = UsersService.deleteAddress($scope, $scope.address.id);
                if (deleted) {                                                             
                  $scope.hideLoading();
                  $scope.cancelEditAddressModal();
                  $state.go($state.current, {addressID:$scope.addressID}, {reload: true});
                  $rootScope.alerti('The address have been deleted','Success');
                  $state.go('addresses', {}, { reload: true });
                }
              }, 1000
            );
            /**************************************************/
          } 
        }
      );
    }
    
    $scope.setAddressColor = function(color, id) {
      $timeout(
        function() {
          $scope.address.color = color;
        }, 100                    
      );
    }

    $scope.saveAddress = function(quiet) {
      $scope.cancelEditAddressModal();
      if (!quiet) {
        $scope.showLoading();
      }
      $timeout(
        function() {
          /*** Call API: Save updated user address in database ***/
          /*** It saves info in database                       ***/
          var saved = UsersService.saveAddress($scope, $scope.address, $scope.userID);
          if (saved && !quiet) {
            $scope.hideLoading();
            $state.go($state.current, {addressID:$scope.addressID}, {reload: true});
            $rootScope.alerti('Your address have been updated','Success');
          }
        }, 1000
      );
      /**************************************************/
    }

    $ionicModal.fromTemplateUrl('templates/edit-address-modal.html', 
      {
		    scope: $scope,
		    animation: 'slide-in-up'
      }
    ).
    then(
      function (modal) {
		    $scope.editAddress = modal;
	     }
    );
	
    $scope.showEditAddressModal = function() {
      $scope.editAddress.show();
    }
  
    $scope.cancelEditAddressModal = function() {
      $scope.editAddress.hide();
    }

  }

)
/**************************************/
/*** Edit Address Controller - END  ***/
/**************************************/


/*******************************************/
/*** Edit Credit Card Controller - BEGIN ***/
/*******************************************/
.controller('EditCreditCardCtrl',                                    
  
  function ($rootScope, $scope, $ionicLoading, $ionicPlatform, $stateParams, $ionicModal, $timeout, $state, $ionicPopup, UsersService) {
    $scope.creditCardID = $stateParams.creditCardID;
    $scope.CCTypeImg = 'generic';
    $scope.creditCard = {
    };
    
    /*** Call API: Get the ID of logged user ***/
    $scope.userID = UsersService.getUserID();

    /*** Call API: Get the credit card details   ***/
    /*** Results are stored in $scope.credit car ***/
    UsersService.getCreditCardData($scope, $scope.creditCardID);
    /**********************************************/

    $scope.cc_format = function () {
      value =  $scope.creditCard.newNumber;
      if ( (value !== null) && (typeof value != 'undefined') ) {
        $scope.CCTypeImg = getCardType($scope.creditCard.newNumber);
        var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        var matches = v.match(/\d{4,16}/g);
        var match = matches && matches[0] || ''
        var parts = []

        for (i=0, len=match.length; i<len; i+=4) {
          parts.push(match.substring(i, i+4))
        }

        if (parts.length) {
          $scope.creditCard.newNumber = parts.join(' ')
        } 
        
        else {
          $scope.creditCard.newNumber =  value
        }
      }
    }    

    $scope.deleteCreditCard = function() {
      var confirmPopup = $ionicPopup.confirm(
        {
          title: 'Confirm this action',
          template: 'Are you sure you want to delete this address?'
        }
      );
      confirmPopup.then(
        function(res) {
          if (res) {
            $scope.showLoading();
            $timeout(
              function() {
                /*** Call API: Delete specific user credit card ***/
                /*** It deletes from database                   ***/
                var deleted = UsersService.deleteCreditCard($scope, $scope.creditCard.id);
                if (deleted) {                                                             
                  $scope.hideLoading();
                  $scope.cancelEditCreditCardModal();
                  $state.go($state.current, {creditCadID: $scope.creditCardID}, {reload: true});
                  $rootScope.alerti('The credit card have been deleted','Success');
                  $state.go('credit_cards', {}, { reload: true });
                }
              }, 1000
            );
            /**************************************************/
          } 
        }
      );
    }
    
    $scope.setCreditCardColor = function(color, id) {
      $timeout(
        function() {
          $scope.creditCard.color = color;
        }, 100                    
      );
    }

    $scope.saveCreditCard = function(quiet) {
      $scope.cancelEditCreditCardModal();
      if (!quiet) {
        $scope.showLoading();
      }
      $timeout(
        function() {
          /*** Call API: Save updated user credit card in database ***/
          /*** It saves info in database                           ***/
          var saved = UsersService.saveCreditCard($scope, $scope.creditCard, $scope.userID);
          if (saved && !quiet) {
            $scope.hideLoading();
            $state.go($state.current, {creditCadID: $scope.creditCardID}, {reload: true});
            $rootScope.alerti('Your credit card have been updated','Success');
          }
        }, 1000
      );
      /**************************************************/
    }

    $ionicModal.fromTemplateUrl('templates/edit-credit-card-modal.html', 
      {
		    scope: $scope,
		    animation: 'slide-in-up'
      }
    ).
    then(
      function (modal) {
		    $scope.editCreditCard = modal;
	     }
    );
	
    $scope.showEditCreditCardModal = function() {
      $scope.creditCard.newNumber = null;
      $scope.creditCard.ccv = null;
      $scope.editCreditCard.show();
    }
  
    $scope.cancelEditCreditCardModal = function() {
      $scope.editCreditCard.hide();
    }

    $scope.setGenericCard = function() {
      $scope.CCTypeImg = 'generic';
    }

  }

)
/******************************************/
/*** Edit Credit Card Controller - END ****/
/******************************************/

/*****************************************/
/*** Favorites Controller - BEGIN  ***/
/****************************************/
.controller('FavoritesCtrl',                                    
  
  function ($rootScope, $scope, $ionicLoading, $ionicPlatform, $timeout, UsersService, SearchService) {

    /*** Call API: Get the ID of logged user ***/
    $scope.userID = UsersService.getUserID();

    /*** Call API: Get the current locations and places ***/
    /*** Results are stored in $scope.places            ***/
    SearchService.getLocationsAndPlaces($scope);
    /******************************************************/

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
/**************************************/
/*** Favorites Controller - END  ***/
/**************************************/

;