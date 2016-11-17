angular.module('moodApp')
  .controller('UserFormController', UserFormController)
  .controller('UserDataController', UserDataController);

UserFormController.$inject = ['$auth', 'User', '$state'];
function UserFormController($auth, User, $state) {
  const userForm = this;

  userForm.user = User.get({ id: $auth.getPayload()._id });

  function submit() {
    userForm.user.$update(() => {
      console.log('your data', userForm.user);
      $state.go('moodIndex');
    });
  }

  userForm.submit = submit;

}

UserDataController.$inject = ['$auth', 'User' ];
function UserDataController ($auth, User ) {
  const userData = this;

  userData.user = User.get({ id: $auth.getPayload()._id });

}
