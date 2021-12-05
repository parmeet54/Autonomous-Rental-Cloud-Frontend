const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovementModel = new Schema({
  frame: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  },
  accelerometer: {
    type: String,
    required: true
  },
  gyroscope: {
    type: String,
    required: true
  },
  compass: {
    type: Number,
    required: true
  },
  booking_id: {
    type: Number,
    required: true
  },
  speed: {
    type: Number,
    required: true
  },
  gear: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("Movement", MovementModel);
