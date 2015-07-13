var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Room = require('./room');
var Equipment = require('./equipment');

var BookingSchema = new Schema({
    username: String,
    numberOfPeople: Number,
    date: Date,
    canceledStatus: Boolean,
    startTime: Number, //temporarily set to number
    endTime: Number,    //temporarily set to number
    room: [Room],
    equipment: Array
});

module.exports = mongoose.model('Booking', BookingSchema);

function roomAvailability(date, roomid) {
  Booking.find({'date':date, 'room.roomID':roomid}, function(err, bookings) {
    if(err) {
      res.send(err);
    }
    var bookingList = [];
    if ([0,5,6].indexOf(req.query.date.getDay()) != -1){
      for(i = 14; i < 27; i++) {
        bookingList.push({
          "booked": false,
          "time"  : i
        });
      }

    } else {
      for(i = 16; i < 26; i++) {
        bookingList.push({
          "booked": false,
          "time"  : i
        });
      }
    }
    bookings.sort({'startTime': 1}).toArray(function(err, bookings) {
      if(err) {
        res.send(err);
      }
      for(var slot in bookingList){
          for(var booking in bookings) {
              if (slot.time >= booking.startTime && slot.time <= booking.endTime){
              slot.booked = true;
              break;
              }
          }
      }
      return bookingList;
    });
  });
}
