var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EquipmentSchema = new Schema({
    name: String,
    type: String,
    roomID: Number,
    date: Date,
    startTime: Number,
    endTime: Number,

    //availability: wasn't sure what type for availablitity
});

module.exports = mongoose.model('Equipment', RoomSchema);
