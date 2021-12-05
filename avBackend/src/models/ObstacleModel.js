const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ObstacleModel = new Schema({
  frame: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  },
  actor: {
    type: String,
    required: true
  },
  other_actor: {
    type: String,
    required: true
  },
  distance: {
    type: Number,
    require: true
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

module.exports = mongoose.model("Obstacle", ObstacleModel);
