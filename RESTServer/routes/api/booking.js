var mongoose = require('mongoose');
var Booking = require('../../models/booking');
var User = require('../../models/user');
var Room = require('../../models/room');

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

    var noHoursToday = new Date(year,month,day);

    var twoWeeks = new Date(year,month,(day+14));

    Room.find({roomID: req.body.roomId}, function(err, room){
        if(err) {
            res.send(err);
        }

        //gets all bookings on specified date for specified room
        Booking.find({date: req.body.date, room: room}, function(err, datesBookings) {
            if(err) {
            res.send(err);
            }

            //initializes booking
            booking.date = req.body.date;
            booking.numberOfPeople = req.body.numberOfPeople;
            booking.canceledStatus = false;
            booking.startTime = req.body.startTime;
            booking.endTime = req.body.endTime;
            booking.room = room;
        
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
    });
};

module.exports.getAllBookings = function(req, res) {
    var roomsize = 0;
    switch (req.query.people) {
        case 1:
            roomsize = 2;
            break;
        case 2:
            roomsize = 2;
            break;
        case 3:
            roomsize = 4;
            break;
        case 4:
            roomsize = 4;
            break;
        case 5:
            roomsize = 8;
            break;
        case 6:
            roomsize = 8;
            break;
        case 7:
            roomsize = 8;
            break;
        case 8:
            roomsize = 8;
            break;
        case 9:
            roomsize = 12;
            break;
        case 10:
            roomsize = 12;
            break;
        case 11:
            roomsize = 12;
            break;
        case 12:
            roomsize = 12;
            break;
    }
    Booking.find({'date':req.query.date, 'people':roomsize}, function(err, bookings) {
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
        for(var booking in bookings) {

        }
        res.json({bookings: bookings});
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

module.exports.findBookingsForUser = function(req, res, id) {
    User.findById(id, function(err, user) {
        if (!user) {
            return res.json({success: false, message: 'No user with that id'});
        }
        var past_bookings = [];
        var current_bookings = [];
        var today = new Date();

        user.bookings.forEach(function(b) {
        if (b.date > today) {
            current_bookings.push(b);
        } else {
            past_bookings.push(b);
        }
        });

        return res.json({past_bookings: past_bookings, current_bookings: current_bookings});
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
