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

module.exports = mongoose.model('Booking', BookingSchema);
