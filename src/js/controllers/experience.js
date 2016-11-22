angular.module('moodApp')
  .controller('SoundScapeController', SoundScapeController)
  .controller('InstrumentExperienceController', InstrumentExperienceController)
  .controller('BreathingExerciseController', BreathingExerciseController)
  .controller('MoodCarouselController', MoodCarouselController)
  .controller('ElizaCtrl', ElizaCtrl);

ElizaCtrl.$inject = ['elizaService', '$timeout', '$scope'];
function ElizaCtrl(elizaService, $timeout, $scope) {
  const eliza = this;

  eliza.userInput = null;
  eliza.response = null;

  eliza.reset = reset;
  eliza.step = step;

  eliza.lines = [];

  function reset() {
    elizaService.reset();
    eliza.lines = [];
    $timeout(step, 500);
  }

  function step() {

    if (elizaService.quit) {
      eliza.userInput = null;
      reset();
      return;
    } else if (eliza.userInput) {
      const input = eliza.userInput;
      eliza.lines.push({ voice: 'You', text: input });
      $timeout(() => {
        eliza.lines.push({ voice: 'Eliza', text: elizaService.transform(input) });
        $scope.$apply();
      }, Math.floor(Math.random() * 1000) + 1000);
    } else if (eliza.lines.length === 0) {
      // no input and no saved lines -> output initial
      eliza.lines.push({ voice: 'Eliza', text: elizaService.getInitial() });
    }

    eliza.userInput = null;
  }

  $timeout(step, 500);

}


SoundScapeController.$inject = [];
function SoundScapeController() {



}

InstrumentExperienceController.$inject = [];
function InstrumentExperienceController() {

  this.sounds = [
    '/audio/Vibraphone0.mp3',
    '/audio/Vibraphone1.mp3',
    '/audio/Vibraphone2.mp3',
    '/audio/Vibraphone3.mp3',
    '/audio/Vibraphone4new.mp3',
    '/audio/Vibraphone5.mp3'
  ];

  this.colors = [
    '#1e63a8',
    '#156da8',
    '#1e63a8',
    '#156da8',
    '#1e63a8',
    '#156da8'
  ];

}

BreathingExerciseController.$inject = [];
function BreathingExerciseController() {

}

ElizaChatBotController.$inject = [];
function ElizaChatBotController() {

}

MoodCarouselController.$inject = [];
function MoodCarouselController() {

}
