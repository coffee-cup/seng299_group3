var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Room = require('./room');

var BookingSchema = new Schema({
    date: Date,
    canceledStatus: Boolean,
    startTime: Number, //temporarily set to number
    endTime: Number,    //temporarily set to number
    room: [Room],
    equipment: [Equipment]
});

module.exports = mongoose.model('Booking', BookingSchema);
