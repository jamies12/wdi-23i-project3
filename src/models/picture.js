angular.module('moodApp')
  .factory('Picture', Picture);

Picture.$inject = ['$resource'];

function Picture($resource) {
  return new $resource('/pictures/:id', { id: '@_id' }, {
    update: { method: 'PUT'}
  });
}
