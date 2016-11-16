angular.module('moodApp')
  .controller('MainController', MainController);
  // .controller('MoodIndexController', MoodIndexController );


MainController.$inject = ['$auth', '$state', '$rootScope'];
function MainController($auth, $state, $rootScope) {
  const main = this;
  main.isLoggedIn = $auth.isAuthenticated;
  main.message = null;
  function logout() {
    $auth.logout()
    .then(() => {
      $state.go('moodIndex');
    });
  }
  const protectedStates = ['moodIndex'];
  function secureState(e, toState) {
    main.message = null;
    console.log(toState, e);
    if(!$auth.isAuthenticated() && protectedStates.includes(toState.name)) {
      e.preventDefault();
      main.message = 'You must be logged in to go there!';
      $state.go('login');
    }
  }
  $rootScope.$on('$stateChangeStart', secureState);
  main.logout = logout;
}
