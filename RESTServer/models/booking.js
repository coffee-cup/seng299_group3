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
  room: Array,
  equipment: Array
});

var booking = mongoose.model('Booking', BookingSchema);

var roomAvailability = function (date, bookings) {
  queryDate = new Date(date);
  var bookingList = [];
  //{$and : [{'date': { $gte : queryDate}}, {'date' : { $lte : queryDate.getDate() +1 }}]}

    // console.log(bookings);
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

