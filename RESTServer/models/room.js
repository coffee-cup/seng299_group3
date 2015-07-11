var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoomSchema = new Schema({
    roomID: Number,
    name: String,
    size: Number,
    price: Number,
    baseIPads: Number,
    baseMics: Number
});

module.exports = mongoose.model('Room', RoomSchema);
