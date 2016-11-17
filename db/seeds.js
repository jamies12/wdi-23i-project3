const mongoose = require('mongoose');
const db = require('../config/db');

mongoose.connect(db.uri);

const User = require('../models/user');
const Picture = require('../models/picture');

User.collection.drop();
Picture.collection.drop();


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
  password: 'jimJam',
  passwordConfirmation: 'jimJam'
}, (err, user1) => {
  if (err) return console.log(err);
  console.log('User 1 Added!', user1);
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
  mongoose.connection.close();
});
