angular.module('moodApp')
  .controller('PicturesIndexController', PicturesIndexController)
  .controller('PicturesShowController', PicturesShowController)
  .controller('PicturesNewController', PicturesNewController);

PicturesIndexController.$inject = ['Pictures'];
function PicturesIndexController(Pictures) {
  const picturesIndex = this;

  picturesIndex.all = Pictures.query();

  function filter(picture) {
    const regex = new RegExp(picturesIndex.searchText, 'i');
    return picturesIndex.searchText && regex.test(picture.tag);
  }

  picturesIndex.filter = filter;
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
      $state.go('searchPictures');
    });
  }

  picturesNew.create = createPicture;
}
