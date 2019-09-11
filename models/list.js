const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listScheme = new Schema({
  id: Number,
  value: String,
  color: String,    
});

module.exports = mongoose.model('List', listScheme);
