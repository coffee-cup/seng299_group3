var mongoose = require('mongoose');
var Booking = require('../../models/booking');
var User = require('../../models/user');

module.exports.getAllBookings = function(req, res) {
    Booking.find(function(err, bookings) {
        if(err) {
            res.send(err);
        }
        res.json({success: true, bookings:bookings});
    });
};


module.exports.createBooking = function(req, res, id) {
    var booking = new Booking();
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();

    var twoWeeks = new Date(year,month,(day+14));

    //gets all bookings on specified date for specified room
    //add in ,room: req.body.room as parameter once have room objects set up
    Booking.find({date: req.body.date}, function(err, datesBookings) {
        if(err) {
          res.send(err);
        }

        //adds users username to booking
        User.findById(id, function(err, user) {
            if(err) {
                res.send(err)
            }
            booking.username = user.username;
        });

        //initializes booking
        booking.date = req.body.date;
        booking.numberOfPeople = req.body.numberOfPeople;
        booking.canceledStatus = false;
        booking.startTime = req.body.startTime;
        booking.endTime = req.body.endTime;
        
        //check to ensure null objects are not passed in
        //set to empty if object is null
        if(req.body.room != null){
            booking.room.push(req.body.room);
        }
        if(req.body.equipment != null){
            booking.equipment.push(req.body.equipment);
        }

        
        //checks to ensure booking is within two weeks of todays date
        if((booking.date > twoWeeks)){
            return res.json({success: false, message: "Booking must be within two weeks of today"});
        }
        else if(booking.date < today){
            return res.json({success: false, message: "Cannot book on past dates" });
        }

        //error messages if booking times are between a different booking
        for(var i=0; i<datesBookings.length; i++){
            
            //if new booking start time is between a previous booking start and end time return message
            if((booking.startTime >= datesBookings[i].startTime) && (booking.startTime < datesBookings[i].endTime)){
                return res.json({success: false, message: "Invalid. During current booking."});
            }

            //if new booking end time is between a previous booking start and end time return message
            if((booking.endTime > datesBookings[i].startTime) && (booking.endTime <= datesBookings[i].endTime)){
                return res.json({success: false, message: "Invalid. During current booking."});
            }
        }
        
        //save booking
        booking.save(function(err) {
            if(err) return res.send(err);

        });
            //add booking to users list of bookings
            User.findById(id, function(err, user) {
                if(err) {
                    res.send(err);
                }

                user.bookings.push(booking);
            
                user.save(function(err) {
                    if(err) return res.send(err);

                });
            });
        res.json({success: true, booking: booking});

    });
};


//was receiving erros on .getDate()

/*module.exports.getAllBookings = function(req, res) {
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
};*/

module.exports.getSingleBooking = function(req, res, id) {
    Booking.findById(id, function(err, booking) {
        if(err) {
            res.send(err);
        }
        if(booking == null){
            res.json({succes: false, message: "No booking with that ID"});
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
