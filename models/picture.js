const mongoose  = require('mongoose');

const pictureSchema = new mongoose.Schema({
  pictures: [
    {dogs: [
      'http://www.telegraph.co.uk/content/dam/news/2016/06/01/corgi1-large_trans++I-LEe0XzRK5rzJRE4VRUy1Vse9JsN00kzbUr3IXHaGo.jpg',
      'https://i.ytimg.com/vi/9lF7F9XYCRE/maxresdefault.jpg']},
    {cats: [
      'https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg',
      'https://www.bluecross.org.uk/sites/default/files/assets/images/cat%20tick.jpg']}
  ]
});

module.exports = mongoose.model('Pictures', pictureSchema);
