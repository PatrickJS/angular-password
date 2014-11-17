!function(window, angular, undefined) {
  'use strict';
  angular.module('angular.password', [])
  .directive('matchPassword', function() {

    function link(scope, element, attrs, ctrls) {
      var formController = ctrls[1];
      var ngModel = ctrls[0];
      var otherPasswordModel = formController[attrs.matchPassword];
  
      // if ng1.3+
      if (ngModel.$validators) {
        ngModel.$validators.passwordMatch = function(modelValue, viewValue) {
         return (modelValue === otherPassword.$modelValue);
        };
      } else {
        ngModel.$parsers.push(function(value) {
          ngModel.$setValidity('passwordMatch', value === otherPasswordModel.$viewValue);
          return value;
        });
  
        otherPasswordModel.$parsers.push(function(value) {
          ngModel.$setValidity('passwordMatch', value === ngModel.$viewValue);
          return value;
        });
      }

    }
    var controllers = ['^ngModel', '^form'];

    return {
      restrict: 'A',
      require: controllers,
      link: link
    }; // end return
  });

}(window, window.angular);
