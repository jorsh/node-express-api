var mongoose = require('mongoose');

TasksSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Tasks', TasksSchema);
