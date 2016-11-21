angular.module('moodApp')
  .directive('soundButton', soundButton);

function soundButton() {
  return {
    restrict: 'A',
    scope: {
      sound: '='
    },
    link($scope, element) {
      const audio = new Audio($scope.sound);
      audio.preload = true;

      element.on('click', () => {
        audio.play();
        if (audio.paused) {
          audio.play();
        }else{
          audio.currentTime = 0;
        }
      });
    }
  };
}
