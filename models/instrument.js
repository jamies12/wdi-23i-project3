const mongoose  = require('mongoose');

const instrumentSchema = new mongoose.Schema({
  number: { type: String },
  source: { type: String}
});

module.exports = mongoose.model('Instruments', instrumentSchema);
