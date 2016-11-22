angular.module('moodApp')
  .controller('JournalsIndexController', JournalsIndexController)
  .controller('JournalsShowController', JournalsShowController)
  .controller('JournalsNewController', JournalsNewController)
  .controller('JournalsEditController', JournalsEditController);

JournalsIndexController.$inject = ['Journal', 'User', '$auth'];
function JournalsIndexController(Journal, User, $auth) {
  const journalsIndex = this;

  journalsIndex.user = User.get({ id: $auth.getPayload()._id });
  console.log(journalsIndex.user);
  // journalsIndex.all = Journal.get([]);
  // console.log(journalsIndex.user.journals());
  // console.log(journalsIndex.all);
  // journalsIndex.user.all = Journal.query();
}

JournalsShowController.$inject = ['Journal', '$state', '$auth'];
function JournalsShowController(Journal, $state, $auth) {
  const journalsShow = this;


  // journalsShow.user = User.get({ id: $auth.getPayload()._id });
  journalsShow.journal = Journal.get($state.params);
  journalsShow.isLoggedIn = $auth.isAuthenticated;

  function remove() {
    Journal.remove({ id: journalsShow.journal._id }, () => {
      $state.go('journals');
    });
  }


  journalsShow.delete = remove;

}

JournalsNewController.$inject = ['Journal', '$state', 'User', '$auth'];
function JournalsNewController(Journal, $state, User, $auth) {
  const journalsNew = this;

  journalsNew.user = User.get({ id: $auth.getPayload()._id });
  journalsNew.newJournal = {};




  function createJournal() {
    journalsNew.newJournal.journalEntry.timeStamp = Date.now();
    console.log('your entry', journalsNew.newJournal);
    journalsNew.user.journals.push(journalsNew.newJournal);
    User.update(journalsNew.user, () => {
      $state.go('journals');
    });
  }

  journalsNew.create = createJournal;
}

JournalsEditController.$inject = ['Journal', '$state'];
function JournalsEditController(Journal, $state) {
  const journalsEdit = this;
  journalsEdit.journal = Journal.get($state.params);

  function updateJournal() {
    Journal.update(journalsEdit.journal, () => {
      $state.go('journals', $state.params);
    });
  }

  journalsEdit.update = updateJournal;
}
