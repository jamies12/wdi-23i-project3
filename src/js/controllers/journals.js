angular.module('moodApp')
  .controller('JournalsIndexController', JournalsIndexController)
  .controller('JournalsShowController', JournalsShowController)
  .controller('JournalsNewController', JournalsNewController)
  .controller('JournalsEditController', JournalsEditController);

JournalsIndexController.$inject = ['Journal'];
function JournalsIndexController(Journal) {
  const journalsIndex = this;

  journalsIndex.all = Journal.query();
}

JournalsShowController.$inject = ['Journal', '$state', '$auth'];
function JournalsShowController(Journal, $state, $auth) {
  const journalsShow = this;

  journalsShow.journal = Journal.get($state.params);
  journalsShow.isLoggedIn = $auth.isAuthenticated;

  function remove() {
    Journal.remove({ id: journalsShow.journal._id }, () => {
      $state.go('journals');
    });
  }

  journalsShow.delete = remove;
}

JournalsNewController.$inject = ['Journal', '$state'];
function JournalsNewController(Journal, $state) {
  const journalsNew = this;

  journalsNew.journal = {};

  function createJournal() {
    console.log(Journal);
    Journal.save(journalsNew.journal, () => {
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
