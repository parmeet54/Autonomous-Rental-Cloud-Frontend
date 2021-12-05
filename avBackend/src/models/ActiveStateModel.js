const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActiveState = new Schema({
  status: {
    type: String,
    required: true
  },
  booking_id: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("ActiveState", ActiveState);
