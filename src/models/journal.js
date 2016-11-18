angular.module('moodApp')
  .factory('Journal', Journal);

Journal.$inject = ['$resource'];
function Journal($resource) {
  return new $resource('/journals/:id', { id: '@_id' }, {
    update: { method: 'PUT' }
  });
}
