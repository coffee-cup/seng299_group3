var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EquipmentSchema = new Schema({
    equiptment_id: String,
    type: String,
    bookingID: Number,
    //availability: wasn't sure what type for availablitity
});

module.exports = mongoose.model('Equipment', RoomSchema);
