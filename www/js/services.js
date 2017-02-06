angular.module('starter.services',[])

.factory('CSRFService', 
  ['$http', 
    function( $http ) {
      var csrf;
      var functions = {
        getCSRF: function($scope) {
          return csrf;
        },
        setCSRF: function(new_csrf) {
          csrf = new_csrf;
          return csrf;
        }
      };
      return functions;
    }
  ]
)

;
