var mongoose = require('mongoose');
var Booking = require('../../models/booking');
var User = require('../../models/user');

module.exports.createBooking = function(req, res, id) {
    var booking = new Booking();
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();

    var noHoursToday = new Date(year,month,day);

    var twoWeeks = new Date(year,month,(day+14));

    //gets all bookings on specified date for specified room
    //add in ,room: req.body.room as parameter once have room objects set up
    Booking.find({date: req.body.date}, function(err, datesBookings) {
        if(err) {
          res.send(err);
        }

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

        
        //checks to ensure booking is within two weeks of todays date and is not before todays date
        if((booking.date > twoWeeks)){
            return res.json({success: false, message: "Booking must be within two weeks of today"});
        }
        
        if((booking.date <= noHoursToday)&&(booking.startTime < today.getHours())){
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
        //adds users username to booking
        User.findById(id, function(err, user) {
            if(err) {
                res.send(err)
            }
            //if user banned do not allow create booking
            if((user.banned) && (user.bannedUntil > today)) {
                return res.json({success: false, message: "User is banned" });
           
            }else {
                user.banned = false;
                user.bookings.push(booking);
            
                user.save(function(err) {
                    if(err) return res.send(err);

                });
           
                booking.username = user.username;
            }


            //save booking
            booking.save(function(err) {
                if(err) return res.send(err);

                res.json({success: true, booking: booking});
            });

        });
    });
};


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

module.exports.cancelBooking = function(req, res, user_id, booking_id){
    var today = new Date();
    var hours = today.getHours();
    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();


    Booking.findByIdAndRemove(booking_id, function(err, booking) {
            if(err) {
                res.send(err);
            }
            var bookDay = booking.date.getDate();
            var bookMonth = booking.date.getMonth();
            var bookYear = booking.date.getFullYear();

            //set booking canceledStatus and save booking
            booking.canceledStatus = true;

            booking.save(function(err) {
                if(err) return res.send(err);
            });

            //change canceled status of users booking
            User.findById(user_id, function(err, user) {
                if(err) {
                    res.send(err);
                }

                //ban user if cancel within 4 hours of booking startTime
                if((Math.abs((booking.startTime - hours)) <= 4)&&(bookYear == year)&&(bookMonth == month)&&(bookDay == day)){
                    user.banned = true;
                    user.bannedUntil = new Date(year, month, day, (hours+12));
                }
                user.bookings.splice(user.bookings.length-1, 1, booking);
                
                user.save(function(err) {
                    if(err) return res.send(err);

                });
            });
            
            res.sendStatus(200);
    });
};

module.exports.deleteBooking = function(req, res, id) {
    Booking.findByIdAndRemove(id, function(err, booking) {
        if(err) {
            res.send(err);
        }

        res.sendStatus(200);
    });
};
