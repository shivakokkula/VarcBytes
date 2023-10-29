const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var feedbackSchema = new Schema({
  feedback:{type:Object}
},{
  timestamps: true,
});
module.exports = mongoose.model("Feedback", feedbackSchema);
