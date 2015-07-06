var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookingSchema = new Schema({
    date: Date,
    canceledStatus: Boolean
});
