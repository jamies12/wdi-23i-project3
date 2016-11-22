angular.module('moodApp')
  .controller('VideosIndexController', VideosIndexController)
  .controller('VideosShowController', VideosShowController)
  .controller('VideosNewController', VideosNewController);

VideosIndexController.$inject = ['Videos'];
function VideosIndexController(Videos) {
  const videosIndex = this;
  console.log(Videos);

  videosIndex.all = Videos.query();

  function filter(video) {
    const regex = new RegExp(videosIndex.searchText, 'i');
    return videosIndex.searchText && regex.test(video.tag);
  }

  videosIndex.filter = filter;
}

VideosShowController.$inject = ['Video', '$state', '$auth'];
function VideosShowController(Video, $state, $auth) {
  const videosShow = this;

  videosShow.video = Video.get($state.params);
  videosShow.isLoggedIn = $auth.isAuthenticated;
}

VideosNewController.$inject = ['Video', '$state'];
function VideosNewController(Video, $state) {
  const videosNew = this;

  videosNew.video = {};

  function createVideo() {
    Video.save(videosNew.video, () => {
      $state.go('searchVideos');
    });
  }

  videosNew.create = createVideo;
}
