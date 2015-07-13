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

var roomAvailability = function (date, roomid, callback) {
  queryDate = new Date(date);
  nextDate = new Date(queryDate);
  nextDate.setDate(nextDate.getDate()+1);
  var bookingList = [];
  var availabilityList = [];
  booking.find({'date': { $gte : queryDate, $lt : nextDate}, 'room.roomID' : roomid}, function(err, bookings) {
    if(err) {
      console.log(err);
    }
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
      for(var currentBooking in bookings) {
        if (bookingList[slot].time >= bookings[currentBooking].startTime && bookingList[slot].time <= bookings[currentBooking].endTime){
          bookingList[slot].booked = true;
          break;
        }
      }
      availabilityList.push(bookingList[slot]);
    }
  callback(availabilityList, roomid);
  });
}

module.exports = {
  booking: booking,
  roomAvailability: roomAvailability
}

