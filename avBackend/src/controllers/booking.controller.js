const BookingModel = require('../models/booking.model')


// get all bookings 
exports.getBookingsList = (req, res) =>{
    //console.log("All bookings list");
    BookingModel.getAllBookings((err, bookings) => {
        console.log('Bookings here');
        if(err)
        res.send(err);
    
        console.log('Bookings:', bookings)
        res.send(bookings)
    })
}

// get booking by booking_id
exports.getBooking = (req, res) =>{
    BookingModel.getBooking(req.params.booking_id, (err,booking) => {
        if(err)
        res.send(err);

        console.log('Booking by booking_id: ', booking)
        res.send(booking)
    })
}

// get bookings by username
exports.getUserBookings = (req, res) =>{
    BookingModel.getUserBookings(req.params.username, (err,bookings) => {
        if(err)
        res.send(err);

        console.log('Bookings by username: ', bookings)
        res.send(bookings)
    })
}

// create booking
exports.createBooking = (req, res) => {
    const bookingReqData= new BookingModel(req.body);

    BookingModel.createBooking(bookingReqData, (err,booking) => {
        if(err)
        res.send(err);

        console.log('Booking Created successfully', booking)
        res.send(booking)
    })
    console.log("Request Data", req.body);
}


// update status by booking_id
exports.updateStatus = (req, res) => {
    const bookingReqData= new BookingModel(req.body);
    console.log("bookingReqData update", bookingReqData);

    BookingModel.updateStatus(req.params.booking_id, bookingReqData, (err,booking) => {
        if(err)
        res.send(err);

        console.log('Booking Status updated successfully', booking)
        res.send(booking)
    })
    console.log("Request Data", req.body);
}


// update booking by booking_id
exports.updateBooking = (req, res) => {
    const bookingReqData= new BookingModel(req.body);
    console.log("bookingReqData update", bookingReqData);

    BookingModel.updateBooking(req.params.booking_id, bookingReqData, (err,booking) => {
        if(err)
        res.send(err);

        console.log('Booking Updated successfully', booking)
        res.send(booking)
    })
    console.log("Request Data", req.body);
}


// delete booking by booking_id
exports.deleteBooking = (req, res) => {
    BookingModel.deleteBooking(req.params.booking_id, (err, booking) =>{
        if(err)
        res.send(err);

        res.json({success: true, message: "Booking deleted"});
    });
}