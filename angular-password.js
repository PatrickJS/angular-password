(function() {
  'use strict';

  function $Password() {

    function link(scope, element, attrs, ctrls) {
      var formController = ctrls[1];
      var ngModel = ctrls[0];
      var otherPasswordModel = formController[attrs.matchPassword];

      var getMatchValue = function() {
        return otherPasswordModel.$viewValue;
      };

      scope.$watch(getMatchValue, function() {
        ngModel.$$parseAndValidate();
      });

      // if ng1.3+
      if (ngModel.$validators) {
        ngModel.$validators.passwordMatch = function(modelValue) {
          return (!modelValue && !otherPasswordModel.$modelValue) || (modelValue === otherPasswordModel.$modelValue);
        };
      } else {
        ngModel.$parsers.push(function(value) {
          ngModel.$setValidity('passwordMatch', (!value && !otherPasswordModel.$viewValue) || value === otherPasswordModel.$viewValue);
          return value;
        });
      }

      otherPasswordModel.$parsers.push(function(value) {
        ngModel.$setValidity('passwordMatch', (!value && !ngModel.$viewValue) || value === ngModel.$viewValue);
        return value;
      });
    }

    var controllers = ['^ngModel', '^form'];

    return {
      restrict: 'A',
      require: controllers,
      link: link
    }; // end return
  }

  angular.module('ngPassword', []).directive('matchPassword', $Password);

  angular.module('angular.password', ['ngPassword']);
  angular.module('angular-password', ['ngPassword']);

  if (typeof module === 'object' && typeof define !== 'function') {
    module.exports = angular.module('ngPassword');
  }
})();
