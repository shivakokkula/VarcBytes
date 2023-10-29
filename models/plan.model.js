const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var planSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    services: {
      required: true,
      type: Array
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Plan", planSchema);