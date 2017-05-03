angular.module('angucomplete', [] )
    .filter('matchformat', 
      function() {
        return function(value, searchq) {
          var replace = searchq;
          var re = new RegExp(replace,"i");
          var capiltsearchq = searchq.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
          var result = value.replace(re, '<span class="coincidence"><b>' + capiltsearchq + '</b></span>');          
          return result; 
        }
      }
    )
    .directive('angucomplete', function ($parse, $http, $sce, $timeout) {
    return {
        restrict: 'EA',
        scope: {
            "id": "@id",
            "searchID": "@searchid",
            "placeholder": "@placeholder",
            "selectedObject": "=selectedobject",
            "url": "@url",
            "dataField": "@datafield",
            "titleField": "@titlefield",
            "descriptionField": "@descriptionfield",
            "imageField": "@imagefield",
            "imageUri": "@imageuri",
            "inputClass": "@inputclass",
            "userPause": "@pause",
            "localData": "=localdata",
            "searchFields": "@searchfields",
            "minLengthUser": "@minlength",
            "matchClass": "@matchclass",
            "dist":  "@dist",
            callBackFn: "&callbackfn",
            callBackFnFocus: "&callbackfnfocus",
            callBackFnBlur: "&callbackfnblur"
        },
        template: '<div class="angucomplete-holder">' +
                  '<input class="fgfield float_left" style="width:85% !important;" type="text" name="searchq" id="{{searchID}}" placeholder="Enter the place name here" advancenext ng-model="searchStr" onmouseup="this.select();" ng-focus="resetHideResults()" ng-blur="hideResults()">' +
                  '<button class="button button-icon ion-android-close input-button float_left" ng-click="clearSearch()">' +
                  '</button>' + 
                  '<br clear="all"/>' + 
                  '<div id="{{id}}_dropdown" class="angucomplete-dropdown" ng-if="showDropdown">' + 
                  '<div class="angucomplete-searching" ng-show="searching">' + 
                  'Searching...' +
                  '</div>' + 
                  '<div class="angucomplete-searching" ng-show="!searching && (!results || results.length == 0)">' +
                  'No matches' + 
                  '</div>' + 
                  '<div class="angucomplete-row" ng-repeat="result in results" ng-click="selectResult(result)" ng-mouseover="hoverRow()" ng-class="{\'angucomplete-selected-row\': $index == currentIndex}">' +
                  '<div ng-if="imageField" class="angucomplete-image-holder">' + 
                  '<img ng-if="result.image && result.image != \'\'" ng-src="{{result.image}}" class="angucomplete-image"/>' + 
                  '<div ng-if="!result.image && result.image != \'\'" class="angucomplete-image-default">' + 
                  '</div>' + 
                  '</div>' + 
                  '<div class="angucomplete-title" ng-if="matchClass" ng-bind-html="result.title">' + 
                  '</div>' + 
                  '<div class="angucomplete-title" ng-if="!matchClass">' + 
                  '<div ng-bind-html="result.title | matchformat:searchStr">' + 
                  '</div>' + 
                  '</div>' + 
                  '<div ng-if="result.description && result.description != \'\'" class="angucomplete-description">' + 
                  '{{result.description}}' + 
                  '</div>' + 
                  '</div>' + 
                  '</div>' + 
                  '</div>',
        link: function($scope, elem, attrs) {
            $scope.lastSearchTerm = null;
            $scope.currentIndex = null;
            $scope.justChanged = false;
            $scope.searchTimer = null;
            $scope.hideTimer = null;
            $scope.searching = false;
            $scope.pause = 500;
            $scope.minLength = 3;
            $scope.searchStr = null;

            if ($scope.minLengthUser && $scope.minLengthUser != "") {
                $scope.minLength = $scope.minLengthUser;
            }

            if ($scope.userPause) {
                $scope.pause = $scope.userPause;
            }

            isNewSearchNeeded = function(newTerm, oldTerm) {
                return newTerm.length >= $scope.minLength && newTerm != oldTerm
            }

            $scope.clearSearch = function() {
              $timeout(                                  
                function() {
                  $scope.searchStr = null;
                  document.getElementById($scope.searchID).blur();
                }, 100
              );
            } 

            $scope.processResults = function(responseData, str) {

              if (responseData && responseData.length > 0) {
                $scope.results = [];
                var titleFields = [];
                if ($scope.titleField && $scope.titleField != "") {
                  titleFields = $scope.titleField.split(",");
                }

                    for (var i = 0; i < responseData.length; i++) {
                        // Get title variables
                        var titleCode = [];

                        for (var t = 0; t < titleFields.length; t++) {
                            titleCode.push(responseData[i][titleFields[t]]);
                        }

                        var description = "";
                        if ($scope.descriptionField) {
                            description = responseData[i][$scope.descriptionField];
                        }

                        var imageUri = "";
                        if ($scope.imageUri) {
                            imageUri = $scope.imageUri;
                        }

                        var image = "";
                        if ($scope.imageField) {
                            image = imageUri + responseData[i][$scope.imageField];
                        }

                        var text = titleCode.join(' ');
                        if ($scope.matchClass) {
                            var re = new RegExp(str, 'i');
                            var strPart = text.match(re)[0];
                            text = $sce.trustAsHtml(text.replace(re, '<span class="'+ $scope.matchClass +'">'+ strPart +'</span>'));
                        }

                        var resultRow = {
                            title: text,
                            description: description,
                            image: image,
                            originalObject: responseData[i]
                        }

                        $scope.results[$scope.results.length] = resultRow;
                    }


                } else {
                    $scope.results = [];
                }
            }

            $scope.searchTimerComplete = function(str) {
                // Begin the search
                if (str.length >= $scope.minLength) {
                    if ($scope.localData) {
                        var searchFields = $scope.searchFields.split(",");
                        var matches = [];

                        for (var i = 0; i < $scope.localData.length; i++) {
                            var match = false;
                            for (var s = 0; s < searchFields.length; s++) {
                                match = match || (typeof $scope.localData[i][searchFields[s]] === 'string' && typeof str === 'string' && $scope.localData[i][searchFields[s]].toLowerCase().indexOf(str.toLowerCase()) == 0);
                            }
                            if (match) {
                                matches[matches.length] = $scope.localData[i];
                            }
                        }

                        $scope.searching = false;
                        $scope.processResults(matches, str);
                    } 
                    else {
                      $http.get($scope.url + str, {}).
                        success(
                          function(responseData, status, headers, config) {
                            $scope.searching = false;
                            $scope.processResults((($scope.dataField) ? responseData[$scope.dataField] : responseData ), str);
                          }
                        ).
                        error(
                          function(data, status, headers, config) {
                          }
                        );
                    }
                }
            }

            $scope.hideResults = function() {
                $scope.callBackFnBlur();
                $scope.hideTimer = $timeout(function() {
                    $scope.showDropdown = false;
                }, $scope.pause);
            };

            $scope.resetHideResults = function() {
                $scope.callBackFnFocus();
                if($scope.hideTimer) {
                    $scope.selectedObject = '';                    
                    $timeout.cancel($scope.hideTimer);
                };
            };

            $scope.hoverRow = function(index) {                    
                $scope.currentIndex = index;
            }

            $scope.keyPressed = function(event) {
                if (!(event.which == 38 || event.which == 40 || event.which == 13)) {
                    $('#searchQuery' + $scope.dist).val('');
                    if (!$scope.searchStr || $scope.searchStr == "") {
                        $scope.showDropdown = false;
                        $scope.lastSearchTerm = null
                    } 
                    else if (isNewSearchNeeded($scope.searchStr, $scope.lastSearchTerm)) {
                        $scope.lastSearchTerm = $scope.searchStr
                        $scope.showDropdown = true;
                        $scope.currentIndex = -1;
                        $scope.results = [];

                        if ($scope.searchTimer) {
                            $timeout.cancel($scope.searchTimer);
                        }

                        $scope.searching = true;

                        $scope.searchTimer = $timeout(function() {
                            $scope.searchTimerComplete($scope.searchStr);
                        }, $scope.pause);
                    }
                } 
                else {
                  event.preventDefault();
                  if (event.which == 13) {
                    $scope.showDropdown = false;
                    $scope.results = [];
                    //$scope.callBackFn();
                  }
                }
            }

            $scope.selectResult = function(result) {
                if ($scope.matchClass) {
                    result.title = result.title.toString().replace(/(<([^>]+)>)/ig, '');
                }
                $scope.searchStr = $scope.lastSearchTerm = result.title;
                $scope.selectedObject = result;
                $scope.showDropdown = false;
                $scope.results = [];
                $scope.searchStr = null;
                $scope.callBackFn({store:result.originalObject});
            }

            var inputField = elem.find('input');

            inputField.on('keyup', $scope.keyPressed);

            elem.on("keyup", function (event) {
                if(event.which === 40) {
                    if ($scope.results && ($scope.currentIndex + 1) < $scope.results.length) {
                        $scope.currentIndex ++;
                        $scope.$apply();
                        event.preventDefault;
                        event.stopPropagation();
                    }

                    $scope.$apply();
                } else if(event.which == 38) {
                    if ($scope.currentIndex >= 1) {
                        $scope.currentIndex --;
                        $scope.$apply();
                        event.preventDefault;
                        event.stopPropagation();
                    }

                } else if (event.which == 13) {
                    if ($scope.results && $scope.currentIndex >= 0 && $scope.currentIndex < $scope.results.length) {
                        $scope.selectResult($scope.results[$scope.currentIndex]);
                        $scope.$apply();
                        event.preventDefault;
                        event.stopPropagation();
                    } else {
                        $scope.results = [];
                        $scope.$apply();
                        event.preventDefault;
                        event.stopPropagation();
                    }

                } else if (event.which == 27) {
                    $scope.results = [];
                    $scope.showDropdown = false;
                    $scope.$apply();
                } else if (event.which == 8) {
                    $scope.selectedObject = null;
                    $scope.$apply();
                }
            });

        }
    };
});

