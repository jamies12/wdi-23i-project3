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
