angular.module('moodApp', ['ngResource', 'ui.router', 'satellizer', 'angular-carousel', 'whimsicalRipple', 'angularSlideables'])
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
      templateUrl: '/templates/moodIndex.html'
      // controller: 'moodIndexController as moodIndex'
    })
    .state('userForm', {
      url: '/userForm',
      templateUrl: '/templates/userForm.html',
      controller: 'UserFormController as userForm'
    })
    .state('search', {
      url: '/search',
      templateUrl: '/templates/searchEngine/search.html'
    })
    .state('searchPictures', {
      url: '/search/pictures',
      templateUrl: '/templates/searchEngine/searchPictures.html',
      controller: 'PicturesIndexController as picturesIndex'
    })
    .state('searchVideos', {
      url: '/search/videos',
      templateUrl: '/templates/searchEngine/searchVideos.html',
      controller: 'VideosIndexController as videosIndex'
    })
    .state('journals', {
      url: '/journals',
      templateUrl: '/templates/journals/journalsEntries.html',
      controller: 'JournalsIndexController as journalsIndex'
    })
    .state('journalsShow', {
      url: '/journals/:id',
      templateUrl: '/templates/journals/journalsShow.html',
      controller: 'JournalsShowController as journalsShow'
    })
    .state('journalsCreate', {
      url: '/journals/create',
      templateUrl: '/templates/journals/journalCreate.html',
      controller: 'JournalsNewController as journalsNew'
    })
    .state('userData', {
      url: '/userData',
      templateUrl: '/templates/userData.html',
      controller: 'UserDataController as userData'
    })
    .state('userChart', {
      url: '/userChart',
      templateUrl: '/templates/userChart.html',
      controller: 'UserDataController as userData'
    })
    .state('soundScapeExperience', {
      url: '/experiences/soundscape',
      templateUrl: '/templates/sessions/soundScapeExperience.html',
      controller: 'SoundScapeController as soundScape'
    })
    .state('soundScapeExperience2', {
      url: '/experiences/soundscape2',
      templateUrl: '/templates/sessions/soundScapeExperience2.html',
      controller: 'SoundScapeController as soundScape'
    })
    .state('soundScapeExperience3', {
      url: '/experiences/soundscape3',
      templateUrl: '/templates/sessions/soundScapeExperience3.html',
      controller: 'SoundScapeController as soundScape'
    })
    .state('instrumentExperience', {
      url: '/experiences/instrument',
      templateUrl: '/templates/sessions/instrumentExperience.html',
      controller: 'InstrumentExperienceController as instrumentExperience'
    })
    .state('breathingExercise', {
      url: '/experiences/breathing',
      templateUrl: '/templates/sessions/breathingExercise.html',
      controller: 'BreathingExerciseController as breathingExercise'
    })
    .state('moodCarousel', {
      url: '/templates/moodCarousel',
      templateUrl: '/templates/moodCarousel.html',
      controller: 'MoodCarouselController as moodCarousel'
    })
    .state('imageSelect', {
      url: '/templates/imageSelect',
      templateUrl: '/templates/imageSelect.html',
      controller: 'ImageSelectController as imageSelect'
    })
    .state('elizabot', {
      url: '/templates/sessions/elizabot',
      templateUrl: '/templates/sessions/elizabot.html'
    })
    .state('sessions', {
      url: '/sessions',
      templateUrl: '/templates/sessions/sessions.html',
      controller: 'UserDataController as userData'
    });

  $urlRouterProvider.otherwise('/');
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
