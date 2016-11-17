const mongoose  = require('mongoose');

const pictureSchema = new mongoose.Schema({
  tag: { type: String },
  source: { type: String }

});

module.exports = mongoose.model('Pictures', pictureSchema);
