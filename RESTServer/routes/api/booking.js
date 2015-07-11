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
  Booking.find({'date':req.query.date, 'people':req.query.people}, function(err, bookings) {
    if(err) {
      res.send(err);
    }
    var bookingList = [];
    if ([0,5,6].indexOf(req.query.date.getDay()) != -1){
      for(i = 14; i < 25; i++) {
        bookingList.push({
          "booked": false,
          "time"  : i
        });
      }
      for(i = 1; i < 3; i++) {
        bookingList.push({
          "booked": false,
          "time"  : i
        });
      }

    } else {
      for(i = 16; i < 25; i++) {
        bookingList.push({
          "booked": false,
          "time"  : i
        });
      }
      bookingList.push({
        "booked": false,
        "time"  : i
      });
    }
    bookings.sort({'startTime': 1}).toArray(function(err, bookings) {
      if(err) {
        res.send(err);
      }

      // FOR LOOP DOES NOT WORK IN JS
      // for(booking b : bookings) {

      // }
      res.json({bookings: bookings});
    });
  });
};

module.exports.getSingleBooking = function(req, res, id) {
    Booking.findById(id, function(err, booking) {
        if(err) {
            res.send(err);
        }
        res.json({success: true, booking: booking});
    });
};

module.exports.deleteBooking = function(req, res, id) {
    Booking.findByIdAndRemove(id, function(err) {
        if(err) {
            res.send(err);
        }
        res.sendStatus(200);
    });
};
