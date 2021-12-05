const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/booking.controller');

// get all bookings
/**
 * GET /bookings
 */
router.get('/',bookingController.getBookingsList);

// get booking by booking_id
/**
 * GET /bookings/{booking_id}
 */
router.get('/:booking_id', bookingController.getBooking);

// get bookings by username
/**
 * GET /bookings/userbookings/:username
 */
 router.get('/userbookings/:username', bookingController.getUserBookings);

// create new booking
/**
 * POST /bookings
 */
router.post('/', bookingController.createBooking);

// delete booking by booking_id
/**
 * DELETE /bookings/{booking_id}
 */
 router.delete('/:booking_id', bookingController.deleteBooking);


// update booking status by booking_id
/**
 * PUT /bookings/status/(booking_id)
 */
 router.put("/status/:booking_id", bookingController.updateStatus);


 // update booking by booking_id
/**
 * PUT /bookings/(booking_id)
 */
router.put('/:booking_id', bookingController.updateBooking);

module.exports = router;