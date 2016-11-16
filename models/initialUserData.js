const mongoose  = require('mongoose');

const initialDataSchema = new mongoose.Schema({
  Gender: { type: String, required: true },
  Age: { type: String, required: true },
  WhatBringsYouHere: { type: String, required: true },
  Worries: { type: String, required: true },
  Happies: { type: String, required: true },
  Interests: { type: String, required: true },
  FavAnimal: { type: String, required: true },
  HopeToGain: { type: String, required: true }
});


module.exports = mongoose.model('InitialData', initialDataSchema);

// Questions to ask on user's first login
// Gender?
// Age?
// Favourite animal?
// What brings you here?
// What aspects of life worry you?
// What aspects of like make you happy?
// What are your interests/hobbies?
// What do you hope to gain from using this app?
