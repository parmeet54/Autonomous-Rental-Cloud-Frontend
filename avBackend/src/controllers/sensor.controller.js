const ActiveStateModel = require("../models/ActiveStateModel");
const CollisionModel = require("../models/CollisionModel");
const LaneInvasionModel = require("../models/LaneInvasionModel");
const LidarModel = require("../models/LidarModel");
const LocationModel = require("../models/LocationModel");
const MovementModel = require("../models/MovementModel");
const ObstacleModel = require("../models/ObstacleModel");

// methods to get current sensor values for booking
exports.getCurrentLocation = (req, res) => {
  if (!req.params.booking_id) {
    return res.status(400).send("Error. Missing booking id param.");
  }

  LocationModel.findOne({ booking_id: req.params.booking_id })
    .sort({ date: -1 })
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => {
      console.error(err);
      return res.status(400);
    });
};

exports.getCurrentCollision = (req, res) => {
  if (!req.params.booking_id) {
    return res.status(400).send("Error. Missing booking id param.");
  }

  CollisionModel.findOne({ booking_id: req.params.booking_id })
    .sort({ date: -1 })
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => {
      console.error(err);
      return res.status(400);
    });
};

exports.getCurrentLaneInvasion = (req, res) => {
  if (!req.params.booking_id) {
    return res.status(400).send("Error. Missing booking id param.");
  }

  LaneInvasionModel.findOne({ booking_id: req.params.booking_id })
    .sort({ date: -1 })
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => {
      console.error(err);
      return res.status(400);
    });
};

exports.getCurrentLidar = (req, res) => {
  if (!req.params.booking_id) {
    return res.status(400).send("Error. Missing booking id param.");
  }

  LidarModel.findOne({ booking_id: req.params.booking_id })
    .sort({ date: -1 })
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => {
      console.error(err);
      return res.status(400);
    });
};

exports.getCurrentMovement = (req, res) => {
  if (!req.params.booking_id) {
    return res.status(400).send("Error. Missing booking id param.");
  }

  MovementModel.findOne({ booking_id: req.params.booking_id })
    .sort({ date: -1 })
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => {
      console.error(err);
      return res.status(400);
    });
};

exports.getCurrentObstacle = (req, res) => {
  if (!req.params.booking_id) {
    return res.status(400).send("Error. Missing booking id param.");
  }

  ObstacleModel.findOne({ booking_id: req.params.booking_id })
    .sort({ date: -1 })
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => {
      console.error(err);
      return res.status(400);
    });
};

exports.getCurrentActiveState = (req, res) => {
  if (!req.params.booking_id) {
    return res.status(400).send("Error. Missing booking id param.");
  }

  ActiveStateModel.findOne({ booking_id: req.params.booking_id })
    .sort({ date: -1 })
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => {
      console.error(err);
      return res.status(400);
    });
};

// methods to get all sensor values for booking
exports.getAllLocation = (req, res) => {
  if (!req.params.booking_id) {
    return res.status(400).send("Error. Missing booking id param.");
  }

  LocationModel.find({ booking_id: req.params.booking_id })
    .sort({ date: -1 })
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => {
      console.error(err);
      return res.status(400);
    });
};

exports.getAllCollision = (req, res) => {
  if (!req.params.booking_id) {
    return res.status(400).send("Error. Missing booking id param.");
  }

  CollisionModel.find({ booking_id: req.params.booking_id })
    .sort({ date: -1 })
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => {
      console.error(err);
      return res.status(400);
    });
};

exports.getAllLaneInvasion = (req, res) => {
  if (!req.params.booking_id) {
    return res.status(400).send("Error. Missing booking id param.");
  }

  LaneInvasionModel.find({ booking_id: req.params.booking_id })
    .sort({ date: -1 })
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => {
      console.error(err);
      return res.status(400);
    });
};

exports.getAllLidar = (req, res) => {
  if (!req.params.booking_id) {
    return res.status(400).send("Error. Missing booking id param.");
  }

  LidarModel.find({ booking_id: req.params.booking_id })
    .sort({ date: -1 })
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => {
      console.error(err);
      return res.status(400);
    });
};

exports.getAllMovement = (req, res) => {
  if (!req.params.booking_id) {
    return res.status(400).send("Error. Missing booking id param.");
  }

  MovementModel.find({ booking_id: req.params.booking_id })
    .sort({ date: -1 })
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => {
      console.error(err);
      return res.status(400);
    });
};

exports.getAllObstacle = (req, res) => {
  if (!req.params.booking_id) {
    return res.status(400).send("Error. Missing booking id param.");
  }

  ObstacleModel.find({ booking_id: req.params.booking_id })
    .sort({ date: -1 })
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => {
      console.error(err);
      return res.status(400);
    });
};

exports.getAllActiveState = (req, res) => {
  if (!req.params.booking_id) {
    return res.status(400).send("Error. Missing booking id param.");
  }

  ActiveStateModel.find({ booking_id: req.params.booking_id })
    .sort({ date: -1 })
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => {
      console.error(err);
      return res.status(400);
    });
};
