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

      // const tile = this;

      // function randomColor(e) {
      //   e.style.background =  '#' + (Math.random()	* 0xFFFFFF<<0).toString(16);
      // }
      // element.on('mouseover', randomColor());

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
