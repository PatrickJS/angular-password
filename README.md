angular-password
================

The most performant AngularJS directive for matching two password input fields. I use angular's built in $parsers rather than relying on a $watch

example.

```html
<form name="profileForm" autocomplete="off" novalidate="" ng-submit="submit(password)">
  <fieldset>
    <label for="newPassword">New Password</label>
    <input type="password" name="newPassword" ng-model="password.new" required=""/>
    <div class="clearfix">
      <div ng-messages="profileForm.newPassword.$error" ng-if="profileForm.$submitted || profileForm.newPassword.$dirty" ng-messages-multiple="ng-messages-multiple" class="error-messages slide-right">
        <div ng-message="required" class="message slide-left">You did not enter a field name</div>
        <div ng-message="passwordMatch" class="message slide-left">Your passwords did not match.</div>
      </div>
    </div>
    <label for="confirmPassword">Re-Type New Password</label>
    <input type="password" name="confirmPassword" ng-model="password.confirm" kcl-match-password="newPassword" required=""/>
    <div class="clearfix">
      <div ng-messages="profileForm.confirmPassword.$error" ng-if="profileForm.$submitted || profileForm.confirmPassword.$dirty" ng-messages-multiple="ng-messages-multiple" class="error-messages slide-right">
        <div ng-message="required" class="message slide-left">You did not enter a field name</div>
        <div ng-message="passwordMatch" class="message slide-left">Your passwords did not match</div>
      </div>
    </div>
  </fieldset>
  <button>Submit</button>
</form>
```