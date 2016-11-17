const mongoose  = require('mongoose');

const videoSchema = new mongoose.Schema({
  tag: { type: String },
  source: { type: String }

});

module.exports = mongoose.model('Videos', videoSchema);
