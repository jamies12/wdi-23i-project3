const mongoose  = require('mongoose');

const journalSchema = new mongoose.Schema({
  title: { type: String },
  journalEntry: { type: String }
});

module.exports = mongoose.model('Journal', journalSchema);
