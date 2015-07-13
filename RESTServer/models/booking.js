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
    roomId: Number,
    room: Array,
    ipads: Number,
    mics: Number,
    equipment: Array
  });

var booking = mongoose.model('Booking', BookingSchema);

var roomAvailability = function (date, bookings) {
  queryDate = new Date(date);
  var bookingList = [];
  if ([0,5,6].indexOf(queryDate.getDay()) != -1){
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

  for(var slot in bookingList){
    for(var booking in bookings) {
      if (slot.time >= booking.startTime && slot.time <= booking.endTime){
        slot.booked = true;
        break;
      }
    }
  }


  return bookingList;
}
module.exports = {
  booking: booking,
  roomAvailability: roomAvailability
}

