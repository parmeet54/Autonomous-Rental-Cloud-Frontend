const express = require("express");
const router = express.Router();
const sensorController = require("../controllers/sensor.controller");

// gets current sensor values for booking id
router.get(
  "/location/current/:booking_id",
  sensorController.getCurrentLocation
);

router.get(
  "/collision/current/:booking_id",
  sensorController.getCurrentCollision
);

router.get(
  "/obstacle/current/:booking_id",
  sensorController.getCurrentObstacle
);

router.get(
  "/lane_invasion/current/:booking_id",
  sensorController.getCurrentLaneInvasion
);

router.get(
  "/movement/current/:booking_id",
  sensorController.getCurrentMovement
);

router.get("/lidar/current/:booking_id", sensorController.getCurrentLidar);

router.get(
  "/active_state/current/:booking_id",
  sensorController.getCurrentActiveState
);

// get sensor values for booking id
router.get("/location/booking/:booking_id", sensorController.getAllLocation);

router.get("/collision/booking/:booking_id", sensorController.getAllCollision);

router.get("/obstacle/booking/:booking_id", sensorController.getAllObstacle);

router.get(
  "/lane_invasion/booking/:booking_id",
  sensorController.getAllLaneInvasion
);

router.get("/movement/booking/:booking_id", sensorController.getAllMovement);

router.get("/lidar/booking/:booking_id", sensorController.getAllLidar);

router.get(
  "/active_state/booking/:booking_id",
  sensorController.getAllActiveState
);

module.exports = router;
