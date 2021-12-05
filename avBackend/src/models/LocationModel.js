const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationModel = new Schema({
  frame: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  altitude: {
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

module.exports = mongoose.model("Location", LocationModel);
