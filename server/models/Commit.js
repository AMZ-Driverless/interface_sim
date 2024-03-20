const mongoose = require('mongoose');

const commitSchema = new mongoose.Schema({
  message: String,
  author: String,
  commitId: String,
});

const Commit = mongoose.model('Commit', commitSchema);

module.exports = Commit;
