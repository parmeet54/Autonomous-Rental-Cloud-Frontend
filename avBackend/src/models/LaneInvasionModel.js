const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LaneInvasionModel = new Schema({
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
  crossed_lane_markings: {
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

module.exports = mongoose.model("LaneInvasion", LaneInvasionModel);
