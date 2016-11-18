"use strict";function Router(e,o){e.state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("moodIndex",{url:"/moodIndex",templateUrl:"/templates/moodIndex.html"}).state("userForm",{url:"/userForm",templateUrl:"/templates/userForm.html",controller:"UserFormController as userForm"}).state("search",{url:"/search",templateUrl:"/templates/searchEngine/search.html"}).state("searchPictures",{url:"/search/pictures",templateUrl:"/templates/searchEngine/searchPictures.html",controller:"PicturesIndexController as picturesIndex"}).state("searchVideos",{url:"/search/videos",templateUrl:"/templates/searchEngine/searchVideos.html",controller:"VideosIndexController as videosIndex"}).state("journals",{url:"/journals",templateUrl:"/templates/journals/journalsEntries.html",controller:"JournalsIndexController as journalsIndex"}).state("journalsCreate",{url:"/journals/create",templateUrl:"/templates/journals/journalCreate.html",controller:"JournalsNewController as journalsNew"}).state("userData",{url:"/userData",templateUrl:"/templates/userData.html",controller:"UserDataController as userData"}).state("soundScapeExperience",{url:"/experiences/soundscape",templateUrl:"/templates/sessions/soundScapeExperience.html",controller:"SoundScapeController as soundScape"}).state("instrumentExperience",{url:"/experiences/instrument",templateUrl:"/templates/sessions/instrumentExperience.html",controller:"InstrumentExperienceController as instrumentExperience"}).state("breathingExercise",{url:"/experiences/breathing",templateUrl:"/templates/sessions/breathingExercise.html",controller:"BreathingExerciseController as breathingExercise"}).state("elizaChatBot",{url:"/experiences/elizaChatBot",templateUrl:"/templates/sessions/elizaChatBot.html",controller:"ElizaChatBotController as elizaChatBot"}).state("moodCarousel",{url:"/templates/moodCarousel",templateUrl:"/templates/moodCarousel.html",controller:"MoodCarouselController as moodCarousel"}),o.otherwise("/moodIndex")}function Auth(e){e.loginUrl="/login",e.signupUrl="/register",e.tokenPrefix="",e.facebook({clientId:"1114403908656537"}),e.github({clientId:"f226d5ade062bb0c6600"})}function RegisterController(e,o){function r(){e.signup(t.user).then(function(){o.go("login")})}var t=this;t.user={},t.submit=r}function LoginController(e,o){function r(){e.login(l.credentials).then(function(){o.go("userForm")})}function t(r){e.authenticate(r).then(function(e){console.log(e),o.go("moodIndex")})}var l=this;l.credentials={},l.submit=r,l.authenticate=t}function SoundScapeController(){}function InstrumentExperienceController(){}function BreathingExerciseController(){}function ElizaChatBotController(){}function MoodCarouselController(){}function Journal(e){return new e("/journals/:id",{id:"@_id"},{update:{method:"PUT"}})}function JournalsIndexController(e,o,r){var t=this;t.user=o.get({id:r.getPayload()._id}),t.all=e.get([]),console.log(t.user.journals()),console.log(t.all),t.user.all=e.query()}function JournalsShowController(e,o,r){function t(){e.remove({id:l.journal._id},function(){o.go("journals")})}var l=this;l.journal=e.get(o.params),l.isLoggedIn=r.isAuthenticated,l.delete=t}function JournalsNewController(e,o,r,t){function l(){console.log(e),e.save(n.user.journal,function(){o.go("journals")})}var n=this;n.user=r.get({id:t.getPayload()._id}),n.user.journal={},n.create=l}function JournalsEditController(e,o){function r(){e.update(t.journal,function(){o.go("journals",o.params)})}var t=this;t.journal=e.get(o.params),t.update=r}function MainController(e,o,r){function t(){e.logout().then(function(){o.go("moodIndex")})}function l(r,t){n.message=null,console.log(t,r),!e.isAuthenticated()&&a.includes(t.name)&&(r.preventDefault(),n.message="You must be logged in to go there!",o.go("login"))}var n=this;n.isLoggedIn=e.isAuthenticated,n.message=null;var a=["moodIndex"];r.$on("$stateChangeStart",l),n.logout=t}function Pictures(e){return new e("/pictures/:id",{id:"@_id"},{update:{method:"PUT"}})}function PicturesIndexController(e){var o=this;console.log(e),o.all=e.query()}function PicturesShowController(e,o,r){var t=this;t.picture=e.get(o.params),t.isLoggedIn=r.isAuthenticated}function PicturesNewController(e,o){function r(){e.save(t.picture,function(){o.go("searchPictures")})}var t=this;t.picture={},t.create=r}function User(e){return new e("/users/:id",{id:"@_id"},{update:{method:"PUT"}})}function UserFormController(e,o,r){function t(){l.user.$update(function(){console.log("your data",l.user),r.go("moodIndex")})}var l=this;l.user=o.get({id:e.getPayload()._id}),l.submit=t}function UserDataController(e,o){var r=this;r.user=o.get({id:e.getPayload()._id})}function Videos(e){return new e("/videos/:id",{id:"@_id"},{update:{method:"PUT"}})}function VideosIndexController(e){var o=this;console.log(e),o.all=e.query()}function VideosShowController(e,o,r){var t=this;t.video=e.get(o.params),t.isLoggedIn=r.isAuthenticated}function VideosNewController(e,o){function r(){e.save(t.video,function(){o.go("searchVideos")})}var t=this;t.video={},t.create=r}angular.module("moodApp",["ngResource","ui.router","satellizer","angular-carousel"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("moodApp").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("moodApp").controller("SoundScapeController",SoundScapeController).controller("InstrumentExperienceController",InstrumentExperienceController).controller("BreathingExerciseController",BreathingExerciseController).controller("ElizaChatBotController",ElizaChatBotController).controller("MoodCarouselController",MoodCarouselController),SoundScapeController.$inject=[],InstrumentExperienceController.$inject=[],BreathingExerciseController.$inject=[],ElizaChatBotController.$inject=[],MoodCarouselController.$inject=[],angular.module("moodApp").factory("Journal",Journal),Journal.$inject=["$resource"],angular.module("moodApp").controller("JournalsIndexController",JournalsIndexController).controller("JournalsShowController",JournalsShowController).controller("JournalsNewController",JournalsNewController).controller("JournalsEditController",JournalsEditController),JournalsIndexController.$inject=["Journal","User","$auth"],JournalsShowController.$inject=["Journal","$state","$auth"],JournalsNewController.$inject=["Journal","$state","User","$auth"],JournalsEditController.$inject=["Journal","$state"],angular.module("moodApp").controller("MainController",MainController),MainController.$inject=["$auth","$state","$rootScope"],angular.module("moodApp").factory("Pictures",Pictures),Pictures.$inject=["$resource"],angular.module("moodApp").controller("PicturesIndexController",PicturesIndexController).controller("PicturesShowController",PicturesShowController).controller("PicturesNewController",PicturesNewController),PicturesIndexController.$inject=["Pictures"],PicturesShowController.$inject=["Picture","$state","$auth"],PicturesNewController.$inject=["Picture","$state"],angular.module("moodApp").factory("User",User),User.$inject=["$resource"],angular.module("moodApp").controller("UserFormController",UserFormController).controller("UserDataController",UserDataController),UserFormController.$inject=["$auth","User","$state"],UserDataController.$inject=["$auth","User"],angular.module("moodApp").factory("Videos",Videos),Videos.$inject=["$resource"],angular.module("moodApp").controller("VideosIndexController",VideosIndexController).controller("VideosShowController",VideosShowController).controller("VideosNewController",VideosNewController),VideosIndexController.$inject=["Videos"],VideosShowController.$inject=["Video","$state","$auth"],VideosNewController.$inject=["Video","$state"];
//# sourceMappingURL=app.js.map
