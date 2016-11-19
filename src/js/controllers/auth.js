angular.module('moodApp')
  .controller('RegisterController', RegisterController)
  .controller('LoginController', LoginController);

RegisterController.$inject = ['$auth', '$state'];
function RegisterController($auth, $state) {
  const register = this;
  register.user = {};
  function submit() {
    $auth.signup(register.user)
      .then(() => {
        $state.go('login');
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
