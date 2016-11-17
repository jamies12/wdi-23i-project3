angular.module('moodApp')
  .factory('Videos', Videos);

Videos.$inject = ['$resource'];

function Videos($resource) {
  return new $resource('/videos/:id', { id: '@_id' }, {
    update: { method: 'PUT'}
  });
}
