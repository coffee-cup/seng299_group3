var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoomSchema = new Schema({
    roomID: Number,
    name: String,
    size: Number
    //availability: wasn't sure what type for availablitity
});

module.exports = mongoose.model('Room', RoomSchema);
