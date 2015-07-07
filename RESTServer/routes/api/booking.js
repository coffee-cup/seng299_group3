var mongoose = require('mongoose');
var Booking = require('../../models/booking');

module.exports.createBooking = function(req, res) {
    var booking = new Booking();

    booking.date = req.body.date;
    booking.cancelledStatus = req.body.cancelledStatus;
    booking.startTime = req.body.startTime;
    booking.endTime = req.body.endTime;

    booking.save(function(err) {
        if(err) return res.send(err);

        res.json({booking: booking});
    });
};

module.exports.getAllBookings = function(req, res) {
    Booking.find(function(err, bookings) {
        if(err) {
            res.send(err);
        }
        res.json({bookings: bookings});
    });
};
