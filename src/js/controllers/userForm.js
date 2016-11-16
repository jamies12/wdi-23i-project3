angular.module('moodApp')
  .controller('UserFormController', UserFormController);

UserFormController.$inject = ['$auth', 'User', '$state'];
function UserFormController($auth, User, $state) {
  const userForm = this;

  userForm.user = User.get({ id: $auth.getPayload()._id });

  function submit() {
    userForm.user.$update(() => {
      $state.go('moodIndex');
    });
  }

  userForm.submit = submit;

}
