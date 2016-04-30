describe('angular-password', function() {

  var $scope, form;

  beforeEach(module('ngPassword'));

  beforeEach(inject(function($compile, $rootScope) {
    $scope = $rootScope;

    var element = angular.element(
      '<form name="form">' +
      '<input ng-model="model.password" name="password">' +
      '<input ng-model="model.confirm" name="confirm" match-password="password">' +
      '</form>'
    );

    $compile(element)($scope);

    $scope.model = {};
    form = $scope.form;
  }));


  describe('match-password', function() {

    // simulates initial page load with nothing in the models
    it('should pass with no password or confirm', function() {
      $scope.$digest();

      expect($scope.model.password).toBeUndefined();
      expect($scope.model.confirm).toBeUndefined();
      expect(form.password.$valid).toBe(true);
      expect(form.confirm.$valid).toBe(true);
      expect(form.confirm.$error.passwordMatch).toBeUndefined();
    });

    // simulates typing something into password then deleting it
    it('should pass with empty password and no confirm', function() {
      form.password.$setViewValue('');
      $scope.$digest();

      expect($scope.model.password).toBe('');
      expect($scope.model.confirm).toBeUndefined();
      expect(form.password.$valid).toBe(true);
      expect(form.confirm.$valid).toBe(true);
      expect(form.confirm.$error.passwordMatch).toBeUndefined();
    });

    // simulates typing something into confirm then deleting it
    it('should pass with no password and empty confirm', function() {
      form.confirm.$setViewValue('');
      $scope.$digest();

      expect($scope.model.password).toBeUndefined();
      expect($scope.model.confirm).toBe('');
      expect(form.password.$valid).toBe(true);
      expect(form.confirm.$valid).toBe(true);
      expect(form.confirm.$error.passwordMatch).toBeUndefined();
    });

    // simulates typing into both fields and deleting them
    it('should pass with empty password and confirm', function() {
      form.password.$setViewValue('');
      form.confirm.$setViewValue('');
      $scope.$digest();

      expect($scope.model.password).toBe('');
      expect($scope.model.confirm).toBe('');
      expect(form.password.$valid).toBe(true);
      expect(form.confirm.$valid).toBe(true);
      expect(form.confirm.$error.passwordMatch).toBeUndefined();
    });

    // simulates typing into password but not confirm
    it('should fail with password set and no confirm', function() {
      form.password.$setViewValue('abcdef');
      $scope.$digest();

      expect($scope.model.password).toBe('abcdef');
      expect($scope.model.confirm).toBeUndefined();
      expect(form.password.$valid).toBe(true);
      expect(form.confirm.$valid).toBe(false);
      expect(form.confirm.$error.passwordMatch).toBe(true);
    });

    // simulates typing into both fields then deleting confirm
    it('should fail with password set and empty confirm', function() {
      form.password.$setViewValue('abcdef');
      form.confirm.$setViewValue('');
      $scope.$digest();

      expect($scope.model.password).toBe('abcdef');
      expect($scope.model.confirm).toBeUndefined();
      expect(form.password.$valid).toBe(true);
      expect(form.confirm.$valid).toBe(false);
      expect(form.confirm.$error.passwordMatch).toBe(true);
    });

    // simulates typing into both fields then deleting password
    it('should fail with confirm set and empty password', function() {
      form.password.$setViewValue('');
      form.confirm.$setViewValue('abcdef');
      $scope.$digest();

      expect($scope.model.password).toBe('');
      expect($scope.model.confirm).toBeUndefined();
      expect(form.password.$valid).toBe(true);
      expect(form.confirm.$valid).toBe(false);
      expect(form.confirm.$error.passwordMatch).toBe(true);
    });

    // simulates typing password, then confirm, not matching
    it('should fail with password set and then different confirm', function() {
      form.password.$setViewValue('abcdef');
      form.confirm.$setViewValue('fedcba');
      $scope.$digest();

      expect($scope.model.password).toBe('abcdef');
      expect($scope.model.confirm).toBeUndefined();
      expect(form.password.$valid).toBe(true);
      expect(form.confirm.$valid).toBe(false);
      expect(form.confirm.$error.passwordMatch).toBe(true);
    });

    // simulates typing confirm, then password, not matching
    it('should fail with confirm set and then different password', function() {
      form.confirm.$setViewValue('fedcba');
      form.password.$setViewValue('abcdef');
      $scope.$digest();

      expect($scope.model.password).toBe('abcdef');
      expect($scope.model.confirm).toBeUndefined();
      expect(form.password.$valid).toBe(true);
      expect(form.confirm.$valid).toBe(false);
      expect(form.confirm.$error.passwordMatch).toBe(true);
    });

    // simulates typing password, then confirm, then changing password
    it('should fail with both set same then password changed', function() {
      form.password.$setViewValue('abcdef');
      form.confirm.$setViewValue('abcdef');
      $scope.$digest();

      form.password.$setViewValue('aaaaaa');
      $scope.$digest();

      expect($scope.model.password).toBe('aaaaaa');
      expect($scope.model.confirm).toBeUndefined();
      expect(form.password.$valid).toBe(true);
      expect(form.confirm.$valid).toBe(false);
      expect(form.confirm.$error.passwordMatch).toBe(true);
    });

    // simulates typing confirm, then password, then changing confirm
    it('should fail with both set same then confirm changed', function() {
      form.confirm.$setViewValue('abcdef');
      form.password.$setViewValue('abcdef');
      $scope.$digest();

      form.confirm.$setViewValue('aaaaaa');
      $scope.$digest();

      expect($scope.model.password).toBe('abcdef');
      expect($scope.model.confirm).toBeUndefined();
      expect(form.password.$valid).toBe(true);
      expect(form.confirm.$valid).toBe(false);
      expect(form.confirm.$error.passwordMatch).toBe(true);
    });

    // simulates typing password, then confirm, not matching, then changing password to match
    it('should pass with both set differently then password changed to match', function() {
      form.password.$setViewValue('aaaaaa');
      form.confirm.$setViewValue('abcdef');
      $scope.$digest();

      form.password.$setViewValue('abcdef');
      $scope.$digest();

      expect($scope.model.password).toBe('abcdef');
      expect($scope.model.confirm).toBe('abcdef');
      expect(form.password.$valid).toBe(true);
      expect(form.confirm.$valid).toBe(true);
      expect(form.confirm.$error.passwordMatch).toBeUndefined();
    });

    // simulates typing confirm, then password, not matching, then changing confirm to match
    it('should pass with both set differently then confirm changed to match', function() {
      form.confirm.$setViewValue('abcdef');
      form.password.$setViewValue('aaaaaa');
      $scope.$digest();

      form.confirm.$setViewValue('aaaaaa');
      $scope.$digest();

      expect($scope.model.password).toBe('aaaaaa');
      expect($scope.model.confirm).toBe('aaaaaa');
      expect(form.password.$valid).toBe(true);
      expect(form.confirm.$valid).toBe(true);
      expect(form.confirm.$error.passwordMatch).toBeUndefined();
    });

    // simulates typing password, then confirm, matching
    it('should pass with password then confirm matching', function() {
      form.password.$setViewValue('abcdef');
      form.confirm.$setViewValue('abcdef');
      $scope.$digest();

      expect($scope.model.password).toBe('abcdef');
      expect($scope.model.confirm).toBe('abcdef');
      expect(form.password.$valid).toBe(true);
      expect(form.confirm.$valid).toBe(true);
      expect(form.confirm.$error.passwordMatch).toBeUndefined();
    });

    // simulates typing confirm, then password, matching
    it('should pass with password then confirm matching', function() {
      form.confirm.$setViewValue('abcdef');
      form.password.$setViewValue('abcdef');
      $scope.$digest();

      expect($scope.model.password).toBe('abcdef');
      expect($scope.model.confirm).toBe('abcdef');
      expect(form.password.$valid).toBe(true);
      expect(form.confirm.$valid).toBe(true);
      expect(form.confirm.$error.passwordMatch).toBeUndefined();
    });

  });
});
