const mongoose = require('mongoose');
const db = require('../config/db');

mongoose.connect(db.uri);

const User = require('../models/user').UserModel;
const Picture = require('../models/picture');
const Video = require('../models/video');
const Journal = require('../models/user').JournalModel;

User.collection.drop();
Journal.collection.drop();
Picture.collection.drop();
Video.collection.drop();


Journal.create({
  title: 'My First Day',
  journalEntry: 'I feel like this could be something new and special to help me on my spiritual journey'
}, (err, journal1) => {
  if (err) return console.log(err);
  console.log('Journal 1 added!', journal1);


  User.create({
    username: 'jim',
    email: 'jim@jam.com',
    Gender: 'Male',
    Age: '23',
    WhatBringsYouHere: 'Mindfulness',
    Worries: 'Donald Trump',
    Happiness: 'Red Pandas',
    Interests: 'Wood Carving',
    FavAnimal: 'Red Panda',
    HopeToGain: 'Enlightenment',
    journals: journal1,
    password: 'jimJam',
    passwordConfirmation: 'jimJam'
  }, (err, user1) => {
    if (err) return console.log(err);
    console.log('User 1 Added!', user1);
  });
});

Picture.create([{
  tag: 'dog',
  source: 'http://www.telegraph.co.uk/content/dam/news/2016/06/01/corgi1-large_trans++I-LEe0XzRK5rzJRE4VRUy1Vse9JsN00kzbUr3IXHaGo.jpg'
}, {
  tag: 'dog',
  source: 'https://i.ytimg.com/vi/9lF7F9XYCRE/maxresdefault.jpg'
}, {
  tag: 'cat',
  source: 'https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg'
}, {
  tag: 'red panda',
  source: 'https://secure.static.tumblr.com/8a84708f15f1ba83add47faefd83eea5/xid56q0/aWln7t5r9/tumblr_static_19835-red-panda-1920x1200-animal-wallpaper.jpg'
}], (err, pictures) => {
  if (err) return console.log(err);
  console.log('Pictures added:', pictures);
});

Video.create([{
  tag: 'meditation',
  source: 'https://www.youtube.com/watch?v=8qMtsir0l9k'
}, {
  tag: 'music',
  source: 'https://www.youtube.com/watch?v=BIRJMESl4U8'
}], (err, videos) => {
  if (err) return console.log(err);
  console.log('Videos added:', videos);

  mongoose.connection.close();
});
