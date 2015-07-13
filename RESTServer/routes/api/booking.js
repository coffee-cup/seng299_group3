var mongoose = require('mongoose');
var Booking = require('../../models/booking.js');
var User = require('../../models/user');
var Room = require('../../models/room');
var Equipment = require('../../models/equipment');

module.exports.getTest = function(req, res) {
  Booking.roomAvailability('07-13-2015',2);
  res.send('hello');
};

module.exports.createBooking = function(req, res, id) {
    var booking = new Booking.booking();
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();
    var hours = today.getHours();

    var noHoursToday = new Date(year,month,day);
    var twoWeeks = new Date(year,month,(day+14));

    Room.find({roomID: req.body.roomId}, function(err, room){
        if(err) {
            res.send(err);
        }
        if(req.body.numberOfPeople > room.size){
            return res.json({success: false, message: "Too many people for room size"});
        }
        if(room.size == 4){
            if(req.body.numberOfPeople <= (room.size-2)){
              return res.json({success: false, message: "Not enough people for this room"});
              }
        }
        if(room.size > 4){
            if(req.body.numberOfPeople <= (room.size-4)){
              return res.json({success: false, message: "Not enough people for this room"});
            }
        }
              Equipment.find({type: 'ipad'}, function(err, ipadObjs){
                             if(req.body.ipads != 0){
                                 var reqFullDate = new Date(req.body.date);
                                 reqFullDate.setHours(req.body.startTime);

                                 var retFullDate = new Date(req.body.date);
                                 retFullDate.setHours(req.body.endTime);

                                 ipadObjs.sort(function(a,b) {
                                               return a.equipment_id - b.equipment_id;
                                               });

                                 var ipadsAdded = 0;
                                 var i;

                                 for(i=0; i<ipadObjs.length; i++){
                                 if(ipadsAdded == req.body.ipads){
                                 break;
                                 }
                                 if((ipadObjs[i].outDate.getFullYear() == reqFullDate.getFullYear()) &&(ipadObjs[i].outDate.getDate() == reqFullDate.getDate())&&(ipadObjs[i].outDate.getMonth() == reqFullDate.getMonth())&&(ipadObjs[i].outDate.getHours() == reqFullDate.getHours())){
                                 //do nothing
                                 }else if((retFullDate.getFullYear() > reqFullDate.getFullYear()) &&(retFullDate.getDate() > reqFullDate.getDate())&&(retFullDate.getMonth() > reqFullDate.getMonth())&&(retFullDate.getHours() > reqFullDate.getHours())){
                                 //do nothing
                                 }
                                 else{
                                 booking.equipment.push(ipadObjs[i]);
                                 ipadObjs[i].outDate = reqFullDate;
                                 ipadObjs[i].inDate = retFullDate;
                                 ipadsAdded++;

                                 ipadObjs[i].save(function(err) {
                                                  if(err) return res.send(err);
                                                  });
                                 }
                                 }

                                 if(ipadsAdded == 0){
                                    return res.json({success: false, message: "No available iPads"});
                                 }
                             }

                             Equipment.find({type:'mic'},function(err, micObjs) {
                                            if(req.body.mics != 0){
                                                var reqFullDate = new Date(req.body.date);
                                                reqFullDate.setHours(req.body.startTime);

                                                var retFullDate = new Date(req.body.date);
                                                retFullDate.setHours(req.body.endTime);

                                                micObjs.sort(function(a,b) {
                                                             return a.equipment_id - b.equipment_id;
                                                             });

                                                var micsAdded = 0;
                                                var i;
                                                for(i=0; i<micObjs.length; i++){

                                                if(micsAdded == req.body.mics){
                                                break;
                                                }

                                                if((micObjs[i].outDate.getFullYear() == reqFullDate.getFullYear()) &&(micObjs[i].outDate.getDate() == reqFullDate.getDate())&&(micObjs[i].outDate.getMonth() == reqFullDate.getMonth())&&(micObjs[i].outDate.getHours() == reqFullDate.getHours())){
                                                //do nothing
                                                }else if((retFullDate.getFullYear() > reqFullDate.getFullYear()) &&(retFullDate.getDate() > reqFullDate.getDate())&&(retFullDate.getMonth() > reqFullDate.getMonth())&&(retFullDate.getHours() > reqFullDate.getHours())){
                                                //do nothing
                                                }
                                                else{
                                                booking.equipment.push(micObjs[i]);
                                                micObjs[i].outDate = reqFullDate;
                                                micObjs[i].inDate = retFullDate;
                                                micsAdded++;

                                                micObjs[i].save(function(err) {
                                                                if(err) return res.send(err);
                                                                });
                                                }
                                                }
                                                if(micsAdded == 0){
                                                return res.json({success: false, message: "No available microphones"});
                                                }
                                            }


        //gets all bookings on specified date for specified room
        Booking.booking.find({date: req.body.date, room: room}, function(err, datesBookings) {
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
            //booking.date.setHours(booking.startTime);
            
            //checks to ensure booking is within two weeks of todays date and is not before todays date
            if((booking.date > twoWeeks)){
                return res.json({success: false, message: "Booking must be within two weeks of today"});
            }

            if((booking.date <= noHoursToday)&&(booking.startTime < hours)){
                return res.json({success: false, message: "Cannot book on past dates" });
            }

            //error messages if booking times are between a different booking
            for(var i=0; i<datesBookings.length; i++){
                console.log('test');
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


    Booking.booking.findByIdAndRemove(booking_id, function(err, booking) {
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

            User.findById(user_id, function(err, user) {
                if(err) {
                    res.send(err);
                }

                //ban user if cancel within 4 hours of booking startTime
                if((Math.abs((booking.startTime - hours)) <= 4)&&(bookYear == year)&&(bookMonth == month)&&(bookDay == day)){
                    user.banned = true;
                    user.bannedUntil = new Date(year, month, day, (hours+12));
                }

                user.save(function(err) {
                    if(err) return res.send(err);

                });
            });

            res.json({success: true, message: 'Successfully Cancelled booking'});
    });
};

module.exports.findBookingsForUser = function(req, res, id) {
    User.findById(id, function(err, user) {
        if (!user) {
            return res.json({success: false, message: 'No user with that id'});
        }
        var past_bookings = new Array();
        var current_bookings = [];
        var today = new Date();

        Booking.booking.find({username: user.username}, function(err, bookings){
            var i;
            for(i=0; i<bookings.length; i++){
                bookings[i].date.setHours(bookings[i].startTime);

                if((bookings[i].date) > today) {
                    current_bookings.push(bookings[i]);
                }else {
                    past_bookings.push(bookings[i]);
                }
            }

        res.json({past_bookings: past_bookings, current_bookings: current_bookings});
        });

    });
};

module.exports.deleteBooking = function(req, res, id) {
  Booking.booking.findByIdAndRemove(id, function(err, booking) {
    if(err) {
      res.send(err);
    }

    res.sendStatus(200);
  });
};
