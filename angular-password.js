!function(window, angular, undefined) {
  'use strict';
  angular.module('angular.password', [])
  .directive('matchPassword', function() {

    function link(scope, element, attrs, ctrls) {
      var formController = ctrls[1];
      var ngModel = ctrls[0];
      var otherPasswordModel = formController[attrs.matchPassword];

      ngModel.$parsers.push(function(value) {
        if (value === otherPasswordModel.$viewValue) {
          ngModel.$setValidity('passwordMatch', true);
        }
        else{
          ngModel.$setValidity('passwordMatch', false);
        }
        return value;
      });

      otherPasswordModel.$parsers.push(function(value) {
        ngModel.$setValidity('passwordMatch', value === ngModel.$viewValue);
        return value;
      });

    }
    var controllers = ['^ngModel', '^form'];

    return {
      restrict: 'A',
      require: controllers,
      link: link
    }; // end return
  });

}(window, window.angular);
