angular.module('starter.controllers', ['ngCordova'])  

.run(
  
  function($rootScope, $ionicHistory, $ionicPopup, $state) {
  
    $rootScope.goback = function() {
      $ionicHistory.goBack();   
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
  }
  
)                                                          

.controller('SigninCtrl', 
  function ($scope, $state, $ionicLoading, $rootScope) {
    $scope.user = {};
    $scope.login = function() {
      var msg = "";
      var re = /^([_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,5}))|(\d{6,}$)$/;
      var re2 = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      
      /* Validation  - BEGIN */
      /*
      if (!re2.test($scope.user.password)) { 
        msg = "ERROR: Invalid password."
      }
      if (!$scope.user.password) { 
        msg = "ERROR: Password cannot be empty.";
      }
      if (!re.test($scope.user.emailphone)) {
        msg = "ERROR: Please, enter a valid email or phone number.";
      }
      if (!$scope.user.emailphone) { 
        msg = "ERROR: Please, enter a valid email or phone number.";
      }
      */
      /* Validation  - END */
      
      
      if (msg) {
        $rootScope.alerti(msg);
		  }
      else {
        $state.go('home');
      }
    }      

    $scope.goto_signup = function() {
      $state.go('signup');          
    }
    
  }
)

.controller('SignupCtrl', 
  function ($scope, $timeout, $ionicHistory, $state) {

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
        $state.go('home');        
      }
    }

    $scope.gobacksignup = function() {
      if ($scope.activeslide == 0) {
        $ionicHistory.goBack();
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

.controller('ForgotPasswordCtrl', 
  function ($scope, $state, $ionicHistory) {

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
        $state.go('signin');          
      }
    } 
    
    $scope.goBackrp = function() {
      if ( $scope.step1 ) {
        $ionicHistory.goBack();
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

.controller('HomeCtrl', 
  
  function ($scope, $ionicModal, $ionicNavBarDelegate, $cordovaStatusbar, $state, $timeout) {
  
    $scope.showSearchBox = false;
    $scope.homestyle={
      "opacity": "1",
      "background": "rgb(255,255,255)"
    };
    
    /* Hardcoded data just for testing purposes - It will be replaced later by real API calls */
    $scope.places = [
      {id:"1", name:"A&W Restaurants"},
      {id:"2", name:"America's Incredible Pizza Company"},
      {id:"3", name:"Amigos/Kings Classic"},
      {id:"4", name:"Applebee's"},
      {id:"5", name:"Arby's"},
      {id:"6", name:"Arctic Circle Restaurants"},
      {id:"7", name:"Arthur Treacher's Fish & Chips"},
      {id:"8", name:"Atlanta Bread Company"},
      {id:"9", name:"Auntie Anne's"},
      {id:"10", name:"Bahama Breeze"},
      {id:"11", name:"Baja Fresh"},
      {id:"12", name:"Bakers Square"},
      {id:"13", name:"Baskin-Robbins"},
      {id:"14", name:"Beef O'Brady's"},
      {id:"15", name:"Ben & Jerry's"},
      {id:"16", name:"Benihana"},
      {id:"17", name:"Bennigan's"},
      {id:"18", name:"Bertucci's"},
      {id:"19", name:"Big Boy"},
      {id:"20", name:"Bikinis Sports Bar & Grill"},
      {id:"21", name:"BJ's Restaurant & Brewery"},
      {id:"22", name:"Black Angus Steakhouse"},
      {id:"23", name:"Black-eyed Pea"},
      {id:"24", name:"Blake's Lotaburger"},
      {id:"25", name:"Blimpie"},
      {id:"26", name:"Bob Evans Restaurants"},
      {id:"27", name:"Bojangles' Famous Chicken 'n Biscuits"},
      {id:"28", name:"Bonefish Grill"},
      {id:"29", name:"Boston Market"},
      {id:"30", name:"Braum's"},
      {id:"31", name:"Bravo! Cucina Italiana"},
      {id:"32", name:"Brio"},
      {id:"33", name:"Bubba Gump Shrimp Company"},
      {id:"34", name:"Buca di Beppo"},
      {id:"35", name:"Buffalo Wild Wings"},
      {id:"36", name:"Burger King"},
      {id:"37", name:"Burger Street"},
      {id:"38", name:"Burgerville"},
      {id:"39", name:"Cafe Rio"},
      {id:"40", name:"California Pizza Kitchen"},
      {id:"41", name:"California Tortilla"},
      {id:"42", name:"Camille's Sidewalk Cafe"},
      {id:"43", name:"The Capital Grille"},
      {id:"44", name:"Captain D's"},
      {id:"45", name:"Carino's Italian Grill"},
      {id:"46", name:"Carl's Jr."},
      {id:"47", name:"Carrabba's Italian Grill"},
      {id:"48", name:"Carrows"},
      {id:"49", name:"Carvel Ice Cream"},
      {id:"50", name:"Champps Americana"},
      {id:"51", name:"Charley's Grilled Subs"},
      {id:"52", name:"Charlie Brown's Fresh Grill"},
      {id:"53", name:"Checkers"},
      {id:"54", name:"Cheddar's Casual Café"},
      {id:"55", name:"Cheeburger Cheeburger"},
      {id:"56", name:"Cheeseburger in Paradise"},
      {id:"57", name:"Cheesecake Factory"},
      {id:"58", name:"Chester Fried Chicken"},
      {id:"59", name:"Chevys Fresh Mex"},
      {id:"60", name:"Chick-fil-A"},
      {id:"61", name:"Chicken Express"},
      {id:"62", name:"Chicken in the Rough"},
      {id:"63", name:"Chili's"},
      {id:"64", name:"Chipotle Mexican Grill"},
      {id:"65", name:"Chronic Tacos"},
      {id:"66", name:"Chuck-A-Rama"},
      {id:"67", name:"Chuck E. Cheese's"},
      {id:"68", name:"Church's"},
      {id:"69", name:"CiCi's Pizza"},
      {id:"70", name:"Cinnabon"},
      {id:"71", name:"Claim Jumper"},
      {id:"72", name:"Coco's Bakery"},
      {id:"73", name:"Cold Stone Creamery"},
      {id:"74", name:"Copeland's"},
      {id:"75", name:"Cotton Patch Café"},
      {id:"76", name:"Country Buffet"},
      {id:"77", name:"Cracker Barrel Old Country Store"},
      {id:"78", name:"Culver's"},
      {id:"79", name:"Dairy Queen"},
      {id:"80", name:"Damon's Grill"},
      {id:"81", name:"Dave & Buster's"},
      {id:"82", name:"Del Taco"},
      {id:"83", name:"Denny's"},
      {id:"84", name:"Dixie Chili and Deli"},
      {id:"85", name:"Domino's Pizza"},
      {id:"86", name:"Don Pablo's"},
      {id:"87", name:"Donatos Pizza"},
      {id:"88", name:"Dunkin' Donuts"},
      {id:"89", name:"East of Chicago Pizza"},
      {id:"90", name:"Eat'n Park"},
      {id:"91", name:"EatZi's"},
      {id:"92", name:"Eegee's"},
      {id:"93", name:"El Chico"},
      {id:"94", name:"El Pollo Loco"},
      {id:"95", name:"El Taco Tote"},
      {id:"96", name:"Elephant Bar"},
      {id:"97", name:"Famous Dave's"},
      {id:"98", name:"Farmer Boys"},
      {id:"99", name:"Fatburger"},
      {id:"100", name:"FATZ"},
      {id:"101", name:"Fazoli's"},
      {id:"102", name:"Five Guys Famous Burgers and Fries"},
      {id:"103", name:"Fleming's Prime Steakhouse & Wine Bar"},
      {id:"104", name:"Freddy's Frozen Custard & Steakburgers"},
      {id:"105", name:"Freebirds World Burrito"},
      {id:"106", name:"Fresh Choice"},
      {id:"107", name:"Friendly's"},
      {id:"108", name:"Fuddruckers"},
      {id:"109", name:"GameWorks"},
      {id:"110", name:"Gatti's Pizza"},
      {id:"111", name:"Gino's Pizza and Spaghetti"},
      {id:"112", name:"Godfather's Pizza"},
      {id:"113", name:"Gold Star Chili"},
      {id:"114", name:"Golden Chick"},
      {id:"115", name:"Golden Corral"},
      {id:"116", name:"Green Burrito"},
      {id:"117", name:"Ground Round"},
      {id:"118", name:"Hard Rock Cafe"},
      {id:"119", name:"Hardee's"},
      {id:"120", name:"Hobee's Restaurant"},
      {id:"121", name:"Hooters"},
      {id:"122", name:"Houlihan's"},
      {id:"123", name:"Houston's Restaurant"},
      {id:"124", name:"Howard Johnson's"},
      {id:"125", name:"Huddle House"},
      {id:"126", name:"HuHot Mongolian Grill"},
      {id:"127", name:"Hungry Howie's Pizza"},
      {id:"128", name:"Hwy 55 Burgers Shakes & Fries"},
      {id:"129", name:"IHOP"},
      {id:"130", name:"In-N-Out Burger"},
      {id:"131", name:"Jack in the Box"},
      {id:"132", name:"Jack's"},
      {id:"133", name:"Jamba Juice"},
      {id:"134", name:"Jason's Deli"},
      {id:"135", name:"Jerry's Subs & Pizza"},
      {id:"136", name:"Jersey Mike's Subs"},
      {id:"137", name:"Jet's Pizza"},
      {id:"138", name:"Jimmy John's"},
      {id:"139", name:"Jim's Restaurants"},
      {id:"140", name:"Joe's Crab Shack"},
      {id:"141", name:"Johnny Rockets"},
      {id:"142", name:"John's Incredible Pizza"},
      {id:"143", name:"Ker's WingHouse"},
      {id:"144", name:"KFC"},
      {id:"145", name:"Krispy Kreme"},
      {id:"146", name:"Krystal"},
      {id:"147", name:"L&L Hawaiian Barbecue"},
      {id:"148", name:"Landry's Restaurants"},
      {id:"149", name:"Ledo Pizza"},
      {id:"150", name:"Lee Roy Selmon's"},
      {id:"151", name:"Lee's Famous Recipe Chicken"},
      {id:"152", name:"Little Caesars"},
      {id:"153", name:"Logan's Roadhouse"},
      {id:"154", name:"Lone Star Steakhouse & Saloon"},
      {id:"155", name:"Long John Silver's"},
      {id:"156", name:"LongHorn Steakhouse"},
      {id:"157", name:"Luby's"},
      {id:"158", name:"Lyon's"},
      {id:"159", name:"Maggiano's Little Italy"},
      {id:"160", name:"Marie Callender's"},
      {id:"161", name:"Mazzio's Italian Eatery"},
      {id:"162", name:"Max & Erma's"},
      {id:"163", name:"McAlister's Deli"},
      {id:"164", name:"McDonald's"},
      {id:"165", name:"The Melting Pot"},
      {id:"166", name:"Miller's Ale House"},
      {id:"167", name:"Milo's Hamburgers"},
      {id:"168", name:"Mitchell's Fish Market"},
      {id:"169", name:"Moe's Southwest Grill"},
      {id:"170", name:"Monical's Pizza"},
      {id:"171", name:"Montana Mike's"},
      {id:"172", name:"Mr. Hero"},
      {id:"173", name:"Mrs. Fields"},
      {id:"174", name:"National Coney Island"},
      {id:"175", name:"Naugles"},
      {id:"176", name:"Noodles & Company"},
      {id:"177", name:"O'Charley's"},
      {id:"178", name:"Old Country Buffet"},
      {id:"179", name:"The Old Spaghetti Factory"},
      {id:"180", name:"Olive Garden"},
      {id:"181", name:"On the Border Mexican Grill & Cantina"},
      {id:"182", name:"The Original Italian Pie"},
      {id:"183", name:"The Original Pancake House"},
      {id:"184", name:"Outback Steakhouse"},
      {id:"185", name:"P. F. Chang's China Bistro"},
      {id:"186", name:"Panda Express"},
      {id:"187", name:"Panera Bread"},
      {id:"188", name:"Papa Gino's"},
      {id:"189", name:"Papa John's Pizza"},
      {id:"190", name:"Papa Murphy's Take 'N' Bake Pizza"},
      {id:"191", name:"Pei Wei Asian Diner"},
      {id:"192", name:"Penn Station East Coast Subs"},
      {id:"193", name:"Perkins Restaurant and Bakery"},
      {id:"194", name:"Pita Pit"},
      {id:"195", name:"Pizza Hut"},
      {id:"196", name:"Pizza Inn"},
      {id:"197", name:"Pizza Ranch"},
      {id:"198", name:"Planet Hollywood"},
      {id:"199", name:"Ponderosa Steakhouse and Bonanza Steakhouse"},
      {id:"200", name:"Popeyes Chicken & Biscuits"},
      {id:"201", name:"Port of Subs"},
      {id:"202", name:"Portillo's Restaurants"},
      {id:"203", name:"Potbelly Sandwich Works"},
      {id:"204", name:"Qdoba Mexican Grill"},
      {id:"205", name:"Quaker Steak & Lube"},
      {id:"206", name:"Quiznos"},
      {id:"207", name:"RA Sushi"},
      {id:"208", name:"Rainforest Cafe"},
      {id:"209", name:"Raising Cane's Chicken Fingers"},
      {id:"210", name:"Rally's"},
      {id:"211", name:"Rax"},
      {id:"212", name:"Red Hot & Blue"},
      {id:"213", name:"Red Lobster"},
      {id:"214", name:"Red Robin"},
      {id:"215", name:"Redstone American Grill"},
      {id:"216", name:"Robeks"},
      {id:"217", name:"Rock Bottom"},
      {id:"218", name:"Romano's Macaroni Grill"},
      {id:"219", name:"Round Table Pizza"},
      {id:"220", name:"Roy Rogers Restaurants"},
      {id:"221", name:"Roy's"},
      {id:"222", name:"Rubio's Fresh Mexican Grill"},
      {id:"223", name:"Ruby Tuesday"},
      {id:"224", name:"Runza"},
      {id:"225", name:"Ruth's Chris Steak House"},
      {id:"226", name:"Saladworks"},
      {id:"227", name:"Sbarro"},
      {id:"228", name:"Schlotzsky's"},
      {id:"229", name:"Seasons 52"},
      {id:"230", name:"Seattle's Best Coffee"},
      {id:"231", name:"Shake Shack"},
      {id:"232", name:"Shane's Rib Shack"},
      {id:"233", name:"Shoney's"},
      {id:"234", name:"Showmars"},
      {id:"235", name:"Sizzler"},
      {id:"236", name:"Skyline Chili"},
      {id:"237", name:"Smashburger"},
      {id:"238", name:"Smokey Bones"},
      {id:"239", name:"Sneaky Pete's"},
      {id:"240", name:"Sonic Drive-In"},
      {id:"241", name:"Souplantation and Sweet Tomatoes"},
      {id:"242", name:"Spaghetti Warehouse"},
      {id:"243", name:"Spangles"},
      {id:"244", name:"St. Louis Bread Company"},
      {id:"245", name:"Starbucks"},
      {id:"246", name:"Steak 'n Shake"},
      {id:"247", name:"Sticky Fingers"},
      {id:"248", name:"Stir Crazy"},
      {id:"249", name:"Sub Station II"},
      {id:"250", name:"Subway"},
      {id:"251", name:"Sweet Tomatoes"},
      {id:"252", name:"Swensen's"},
      {id:"253", name:"Swensons"},
      {id:"254", name:"T.G.I. Friday's"},
      {id:"255", name:"Taco Bell"},
      {id:"256", name:"Taco Bueno"},
      {id:"257", name:"Taco Cabana"},
      {id:"258", name:"Taco John's"},
      {id:"259", name:"Taco Mayo"},
      {id:"260", name:"Taco Tico"},
      {id:"261", name:"Taco Time"},
      {id:"262", name:"Texas Roadhouse"},
      {id:"263", name:"Tijuana Flats"},
      {id:"264", name:"Tilted Kilt"},
      {id:"265", name:"Tony Roma's"},
      {id:"266", name:"Trader Vic's"},
      {id:"267", name:"Twin Peaks"},
      {id:"268", name:"Umami Burger"},
      {id:"269", name:"Uncle Maddio's Pizza Joint"},
      {id:"270", name:"Uno Chicago Grill"},
      {id:"271", name:"Valentino's"},
      {id:"272", name:"Village Inn"},
      {id:"273", name:"Waffle House"},
      {id:"274", name:"Wendy's"},
      {id:"275", name:"Wetzel's Pretzels"},
      {id:"276", name:"Whataburger"},
      {id:"277", name:"Which Wich?"},
      {id:"278", name:"White Castle"},
      {id:"279", name:"Wienerschnitzel"},
      {id:"280", name:"Wild Wing Cafe"},
      {id:"281", name:"York Steak House"},
      {id:"282", name:"Zaxby's"},
      {id:"283", name:"Zip's Drive-in"}
    ];
    /* Hardcoded data just for testing purposes - It will be replaced later by real API calls */

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
      $scope.cancelLocationModal();
      $state.go('results');          
    }
    
    $scope.searchManually = function() {
      $scope.cancelLocationModal();
      $scope.showSearchBox = true;
      $timeout(                                  
       function() {
         document.getElementById("id_searchq").focus();
       }, 100
      );
    }
    
    $scope.selectedPlace = function() {
      $state.go('store');
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

.controller('ResultsCtrl', 
  
  function ($scope) {
  }
  
)

.controller('StoreCtrl', 
  
  function ($scope) {
  }
  
)

;
