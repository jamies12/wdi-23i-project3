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
      $state.go('moodCarousel');
    });
  }

  userForm.submit = submit;

}

UserDataController.$inject = ['$auth', 'User' ];
function UserDataController ($auth, User ) {
  const userData = this;
  userData.moodDataSet = {
    moodValue: [],
    moodTime: []
  };

  userData.sessionDataSet = {
    sessionName: [],
    sessionTime: []
  };


  User.get({ id: $auth.getPayload()._id }, (user) => {
    userData.user = user;
    // let day = moment(userData.user.mood[0].timeStamp);
    // console.log('day test', day.month());


    console.log('user', userData.user);

    for (let i = 0; i < userData.user.mood.length; i++) {
      userData.moodDataSet.moodValue.push(userData.user.mood[i].value);
    }
    for (let i = 0; i < userData.user.mood.length; i++) {
      userData.moodDataSet.moodTime.push(userData.user.mood[i].timeStamp);
    }
    console.log('mood data', userData.moodDataSet);

    console.log('user', userData.user);
    for (let i = 0; i < userData.user.sessions.length; i++) {
      userData.sessionDataSet.sessionName.push(userData.user.sessions[i].session);
    }
    for (let i = 0; i < userData.user.sessions.length; i++) {
      userData.sessionDataSet.sessionTime.push(userData.user.sessions[i].timeStamp);
    }
    console.log('session data: ', userData.sessionDataSet);
  });

  userData.labels = userData.moodDataSet.moodTime;
  userData.series = ['Series A'];
  userData.data = userData.moodDataSet.moodValue;
  userData.colors = [
    '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'
  ];
  userData.onClick = function (points, evt) {
    console.log(points, evt);
  };
  userData.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  userData.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left',
          color: 'black'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right',
          color: 'black'
        }
      ]
    },
    defaultFontColor: '#000'
  };


  function saveSessionData(session) {
    console.log(userData.user);

    userData.sessionData = {};

    userData.sessionData.session =  session;
    userData.sessionData.timeStamp = Date.now();
    console.log(userData.sessionData);

    userData.user.sessions.push(userData.sessionData);

    const updateResult = User.update({id: $auth.getPayload()._id}, userData.user);
    console.log('updateResult:', updateResult);


  }

  userData.saveSessionData = saveSessionData;
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
    moodCarousel.user.newMood.timeStamp = moment(Date.now());
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
    $state.go('sessions');
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
    {title: 'meadow', src: '../images/forest.png'},
    {title: 'beach', src: '../images/mountain.png'},
    {title: 'chocolate', src: '../images/chocolate.png'},
    {title: 'clouds', src: '../images/clouds.png'},
    {title: 'countryside', src: '../images/countryside.png'},
    {padding: 'padding'}
  ];
  imageSelect.images2 = [
    {title: 'mountains', src: '../images/beach.png'},
    {title: 'forest', src: '../images/meadow.png'},
    {title: 'fruit', src: '../images/fruit.png'},
    {title: 'waterfall', src: '../images/lake.png'},
    {title: 'city', src: '../images/city.png'},
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

      imageSelect.user.isFirstTime = false;
      const updateResult = User.update({id: $auth.getPayload()._id}, imageSelect.user);
      console.log('updateResult:', updateResult);


      $state.go('moodCarousel');
    }
  }

  imageSelect.imageChoice = imageSelection;

}



angular.module('angularSlideables', [])
.directive('slideable', function () {
  return {
    restrict: 'C',
    compile: function (element) {
            // wrap tag
      var contents = element.html();
      element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');

      return function postLink(scope, element, attrs) {
                // default properties
        attrs.duration = (!attrs.duration) ? '1s' : attrs.duration;
        attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
        element.css({
          'overflow': 'hidden',
          'height': '0px',
          'transitionProperty': 'height',
          'transitionDuration': attrs.duration,
          'transitionTimingFunction': attrs.easing
        });
      };
    }
  };
})
.directive('slideToggle', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var target = document.querySelector(attrs.slideToggle);
      attrs.expanded = false;
      element.bind('click', function() {
        console.log(element, 'slide down', attrs);
        var content = target.querySelector('.slideable_content');
        if(!attrs.expanded) {
          content.style.border = '1px solid rgba(0,0,0,0)';
          var y = content.clientHeight;
          content.style.border = 0;
          target.style.height = y + 'px';
        } else {
          target.style.height = '0px';
        }
        attrs.expanded = !attrs.expanded;
      });
    }
  };
});
