angular.module('moodApp')
  .controller('PicturesIndexController', PicturesIndexController)
  .controller('PicturesShowController', PicturesShowController)
  .controller('PicturesNewController', PicturesNewController);

PicturesIndexController.$inject = ['Pictures'];
function PicturesIndexController(Pictures) {
  const picturesIndex = this;
  console.log(Pictures);

  picturesIndex.all = Pictures.query();
}

PicturesShowController.$inject = ['Picture', '$state', '$auth'];
function PicturesShowController(Picture, $state, $auth) {
  const picturesShow = this;

  picturesShow.picture = Picture.get($state.params);
  picturesShow.isLoggedIn = $auth.isAuthenticated;
}

PicturesNewController.$inject = ['Picture', '$state'];
function PicturesNewController(Picture, $state) {
  const picturesNew = this;

  picturesNew.picture = {};

  function createPicture() {
    Picture.save(picturesNew.picture, () => {
      $state.go('search');
    });
  }

  picturesNew.create = createPicture;
}
