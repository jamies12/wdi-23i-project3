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

  function moodSelect(mood, moodValue) {
    console.log('clicked: ', mood, moodValue);
    // console.log(moodCarousel.user.mood);

    moodCarousel.user.newMood = {};
    moodCarousel.user.newMood.mood = mood;
    moodCarousel.user.newMood.value = moodValue;
    moodCarousel.user.newMood.timeStamp = Date.now();
    console.log(moodCarousel.user);

    moodCarousel.user.mood.push(moodCarousel.user.newMood);

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

  imageSelect.images1 = [
    {title: 'meadow', src: '../images/meadow.jpg'},
    {title: 'beach', src: '../images/beach.jpg'},
    {title: 'chocolate', src: '../images/chocolate.jpg'},
    {title: 'cats', src: '../images/cats.jpg'},
    {title: 'clouds', src: '../images/clouds.jpg'},
    {title: 'countryside', src: '../images/countryside.jpg'},
    {padding: 'padding'}
  ];
  imageSelect.images2 = [
    {title: 'mountains', src: '../images/mountains.jpg'},
    {title: 'forest', src: '../images/forest.jpg'},
    {title: 'fruit', src: '../images/fruit.jpg'},
    {title: 'dogs', src: '../images/dogs.jpg'},
    {title: 'waterfall', src: '../images/waterfall.jpg'},
    {title: 'city', src: '../images/city.jpg'},
    {padding: 'padding'}
  ];

  let counter = 0;
  imageSelect.setImage1 = imageSelect.images1[counter];
  imageSelect.setImage2 = imageSelect.images2[counter];

  imageSelect.setTitle1 = imageSelect.images1[counter].title;
  imageSelect.setTitle2 = imageSelect.images2[counter].title;

  function imageSelection(which) {
    if(which === 1) {
      console.log(imageSelect.setTitle1);
      imageSelect.user.imageChoice.push(imageSelect.setTitle1);
    } else {
      console.log(imageSelect.setTitle2);
      imageSelect.user.imageChoice.push(imageSelect.setTitle2);
    }

    counter++;
    console.log(counter);
    console.log(imageSelect.images1.length);
    imageSelect.setImage1 = imageSelect.images1[counter];
    imageSelect.setImage2 = imageSelect.images2[counter];

    imageSelect.setTitle1 = imageSelect.images1[counter].title;
    imageSelect.setTitle2 = imageSelect.images2[counter].title;



    const updateResult = User.update({id: $auth.getPayload()._id}, imageSelect.user);
    console.log('updateResult:', updateResult);

    if (counter === imageSelect.images1.length -1) {
      console.log('done');
      $state.go('moodCarousel');
    }
  }

  imageSelect.imageChoice = imageSelection;

}
