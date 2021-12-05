const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LidarModel = new Schema({
  frame: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  },
  horizontal_angle: {
    type: Number,
    required: true
  },
  channels: {
    type: Number,
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

module.exports = mongoose.model("LIDAR", LidarModel);
