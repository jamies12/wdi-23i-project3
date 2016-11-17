angular.module('moodApp')
  .factory('Pictures', Pictures);

Pictures.$inject = ['$resource'];

function Pictures($resource) {
  return new $resource('/pictures/:id', { id: '@_id' }, {
    update: { method: 'PUT'}
  });
}
