angular.module('moodApp')
  .controller('SoundScapeController', SoundScapeController)
  .controller('InstrumentExperienceController', InstrumentExperienceController)
  .controller('BreathingExerciseController', BreathingExerciseController)
  .controller('ElizaChatBotController', ElizaChatBotController)
  .controller('MoodCarouselController', MoodCarouselController);


SoundScapeController.$inject = [];
function SoundScapeController() {

}

InstrumentExperienceController.$inject = [];
function InstrumentExperienceController() {

  this.cells = [
    null,
    null,
    null,
    null,
    null,
    null
  ];

  function click($index) {
    console.log('OOOOOO EEEEEEEE', $index);
  }

  this.click = click;
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
