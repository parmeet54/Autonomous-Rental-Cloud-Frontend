const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollisionModel = new Schema({
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
  normal_impulse: {
    type: String,
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

module.exports = mongoose.model("Collision", CollisionModel);
