var db = require('../../config/db.config');

var Booking = function(booking){
    this.booking_id = booking.booking_id;
    this.username = booking.username;
    this.curr_location = booking.curr_location;
    this.destination = booking.destination;
    this.car_id = booking.car_id;
    this.trip_status = booking.trip_status;
    this.cost = booking.cost;
    
}

//get all bookings
Booking.getAllBookings = (result) => {
    db.query('SELECT * FROM bookings', (err, res) => {
        if(err){
            console.log('Error while fetching bookings', err);
            result(null, err);
        }
        else{
            console.log('Bookings fetched successfully');
            result(null, res);
        }
    })
}

// get booking by booking_id
Booking.getBooking = (booking_id, result) => {
    db.query('SELECT * FROM bookings WHERE booking_id=?', booking_id , (err, res) => {
        if(err){
            console.log('Error while fetching booking by booking_id', err);
            result(null, err);
        }
        else{
            console.log('Booking fetched successfully');
            result(null, res);
        }
    })
}

// get bookings by username
Booking.getUserBookings = (username, result) => {
    db.query('SELECT * FROM bookings WHERE username=?', username , (err, res) => {
        if(err){
            console.log('Error while fetching bookings by username', err);
            result(null, err);
        }
        else{
            console.log('Bookings for user fetched successfully');
            result(null, res);
        }
    })
}


// create new booking
Booking.createBooking = (bookingReqData, result) => {
    db.query('INSERT INTO bookings SET ?', bookingReqData, (err, res) => {
        if(err){
            console.log('Error while creating booking', err);
            result(null, err);
        }
        else{
            result(null, {status: true, message: 'Booking created'});
        }
    })
}


// update status by booking_id
Booking.updateStatus = (booking_id, bookingReqData, result) => {
    db.query('UPDATE bookings SET trip_status = ? WHERE booking_id=?', 
    [bookingReqData.trip_status,  booking_id], 
    (err, res) => {
        if(err){
            console.log('Error while updating booking trip status', err);
            result(null, err);
        }
        else{
            console.log("Booking Trip Status  updated successfully");
            result(null, {status: true, message:"Booking trip status udated"});
        }
    })
}


// update booking
Booking.updateBooking = (booking_id, bookingReqData, result) => {
    db.query('UPDATE bookings SET booking_id = ?, username = ?, car_id = ?, curr_location=?,destination=?, trip_status=?, cost=? WHERE booking_id=?', 
    [bookingReqData.booking_id , bookingReqData.username, bookingReqData.car_id, bookingReqData.curr_location, bookingReqData.destination, bookingReqData.trip_status, bookingReqData.cost, booking_id], 
    (err, res) => {
        if(err){
            console.log('Error while updating booking', err);
            result(null, err);
        }
        else{
            console.log("Booking  updated successfully");
            result(null, {status: true, message:"Booking udated"});
        }
    })
}


// Delete booking
Booking.deleteBooking = (booking_id, result) =>{
    db.query('DELETE FROM bookings WHERE booking_id = ? ', [booking_id], (err,res) =>{
        if(err){
            console.log('Error Deleting booking', err);
            result(null, err);
        }
        else{
            result(null, {status: true, message:"Booking deleted"});
        }
    });
}

module.exports = Booking;