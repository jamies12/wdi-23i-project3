angular.module('moodApp')
 .controller('UserFormController', UserFormController)
 .controller('UserDataController', UserDataController)
 .controller('MoodCarouselController', MoodCarouselController)
 .controller('ImageSelectController', ImageSelectController);

UserFormController.$inject = ['$auth', 'User', '$state'];
function UserFormController($auth, User, $state) {
  const userForm = this;

  userForm.user = User.get({ id: $auth.getPayload()._id });

  function submit() {
   // console.log('pre update', userForm.user);
    userForm.user.$update(() => {

      console.log('post update your data', userForm.user);
      $state.go('moodIndex');
    });
  }

  userForm.submit = submit;

}

UserDataController.$inject = ['$auth', 'User' ];
function UserDataController ($auth, User ) {
  const userData = this;

  userData.user = User.get({ id: $auth.getPayload()._id });

}

MoodCarouselController.$inject = ['$auth', 'User', '$state'];
function MoodCarouselController($auth, User, $state) {
  const moodCarousel = this;

  moodCarousel.user = User.get({ id: $auth.getPayload()._id });

  function moodSelect(mood) {
    console.log('clicked: ', mood);


    moodCarousel.user.mood = mood;
    console.log(moodCarousel.user);


    const updateResult = User.update({id: $auth.getPayload()._id}, moodCarousel.user);
    console.log('updateResult:', updateResult);


   // moodCarousel.user.$update(() => {
   //   // TODO: find out what this first parameter is used for -
   //   // check documentation for $update()
   //   console.log('moodCarousel.user.$update: find out why we got here!!');
   // }, () => {
   //   console.log('your data', moodCarousel.user);
    $state.go('userData');
   // }, () => {
   //   console.log('moodCarousel.user.$update: error(?): arguments:', arguments);
   // });


  }
  moodCarousel.moodSelect = moodSelect;
}

ImageSelectController.$inject = ['$auth', 'User', '$state'];
function ImageSelectController($auth, User, $state) {
  const imageSelect = this;

  imageSelect.user = User.get({ id: $auth.getPayload()._id });

  imageSelect.images1 = ['meadow', 'beach', 'chocolate', 'cats', 'clouds', 'countryside', 'whisky'];
  imageSelect.images2 = ['mountains', 'forest', 'fruit', 'dogs', 'lake', 'city', 'cocktails'];

  let counter = 0;
  imageSelect.setImage1 = imageSelect.images1[counter];
  imageSelect.setImage2 = imageSelect.images2[counter];

  function imageSelection(which) {
    if(which === 1) {
      console.log(imageSelect.setImage1);
      imageSelect.user.imageChoice.push(imageSelect.setImage1);
    } else {
      console.log(imageSelect.setImage2);
      imageSelect.user.imageChoice.push(imageSelect.setImage2);
    }

    counter++;
    imageSelect.setImage1 = imageSelect.images1[counter];
    imageSelect.setImage2 = imageSelect.images2[counter];


    const updateResult = User.update({id: $auth.getPayload()._id}, imageSelect.user);
    console.log('updateResult:', updateResult);

    if (counter === imageSelect.images1.length) {
      $state.go('moodCarousel');
    }
  }

  imageSelect.imageChoice = imageSelection;

}
