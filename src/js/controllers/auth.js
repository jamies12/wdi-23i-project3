angular.module('moodApp')
  .controller('RegisterController', RegisterController)
  .controller('LoginController', LoginController);

RegisterController.$inject = ['$auth', '$state', '$window'];
function RegisterController($auth, $state, $window) {
  const register = this;

  function submit() {
    $auth.signup(register.user)
      .then((res) => {
        $window.localStorage.setItem('token', res.data.token);
        $state.go('userForm');
      });
  }
  register.submit = submit;
}


LoginController.$inject = ['$auth', '$state', 'User'];
function LoginController($auth, $state, User) {
  const login = this;
  login.credentials = {};
  function submit() {
    $auth.login(login.credentials)
    .then(() => {

      User.get({ id: $auth.getPayload()._id }, (user) => {
        login.user = user;
        console.log('you', login.user);
        console.log('is this your first time', login.user.isFirstTime);

        if(!login.user.isFirstTime) {
          $state.go('moodCarousel');
        } else {
          $state.go('userForm');
        }
      });
    });
  }

  function authenticate(provider) {
    $auth.authenticate(provider)
    .then((res) => {
      console.log(res);
      $state.go('moodIndex');
    });
  }
  login.submit = submit;
  login.authenticate = authenticate;
}
