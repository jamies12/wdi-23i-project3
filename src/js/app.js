angular
  .module('moodApp', ['ngResource', 'ui.router', 'satellizer'])
  .config(Router)
  .config(Auth);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'LoginController as login'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: 'RegisterController as register'
    })
    .state('moodIndex', {
      url: '/moodIndex',
      templateUrl: '/templates/moodIndex.html',
      controller: 'moodIndexController as moodIndex'
    });

  $urlRouterProvider.otherwise('/moodIndex');
}
Auth.$inject = ['$authProvider'];
function Auth($authProvider) {
  $authProvider.loginUrl = '/login';
  $authProvider.signupUrl = '/register';
  $authProvider.tokenPrefix = '';
  $authProvider.facebook({
    clientId: '1114403908656537'
  });
  $authProvider.github({
    clientId: 'f226d5ade062bb0c6600'
  });
}
