const mongoose = require('mongoose');
const db = require('../config/db');

mongoose.connect(db.uri);

const User = require('../models/user');
const InitialData = require('../models/initialUserData');

User.collection.drop();
InitialData.collection.drop();

InitialData.create({
  Gender: 'Male',
  Age: '23',
  WhatBringsYouHere: 'Mindfulness',
  Worries: 'Donald Trump',
  Happies: 'Red Pandas',
  Interests: 'Wood Carving',
  FavAnimal: 'Red Panda',
  HopeToGain: 'Enlightenment'
}, (err, initialData1) => {
  if (err) return console.log(err);
  console.log('Initial Data 1 added', initialData1);

  User.create({
    username: 'jim',
    email: 'jim@jam.com',
    initialData: [initialData1],
    passwordHash: 'jimJam'
  }, (err, user1) => {
    if (err) return console.log(err);
    console.log('User 1 Added!', user1);

    mongoose.connection.close();
  });

});
