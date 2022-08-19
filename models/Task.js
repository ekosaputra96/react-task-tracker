const mongoose = require("mongoose");

const taskSSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  reminder: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("task", taskSSchema);
