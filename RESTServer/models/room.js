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

var Room = mongoose.model('Room', RoomSchema);

// check if the base 10 rooms are in the database
Room.find(function(err, rooms) {
  if (err) {
    console.log(err);
    return;
  }

  // if there are no rooms in the database
  // add them
  if (rooms.length == 0) {
    var room1 = new Room({
      "name": "Fox Double",
      "roomID": 1,
      "size": 2,
      "price": 12,
      "baseIPads": 1,
      "baseMics": 1
    });

    var room2 = new Room({
      "name": "Fox Double",
      "roomID": 2,
      "size": 2,
      "price": 12,
      "baseIPads":1,
      "baseMics": 1
    });

    var room3 = new Room({
      "name": "Fox Quad",
      "roomID": 3,
      "size": 4,
      "price": 20,
      "baseIPads":2,
      "baseMics": 2
    });

    var room4 = new Room({
      "name": "Fox Quad",
      "roomID": 4,
      "size": 4,
      "price": 20,
      "baseIPads":2,
      "baseMics": 2
    });

    var room5 = new Room({
      "name": "Fox Quad",
      "roomID": 5,
      "size": 4,
      "price": 20,
      "baseIPads":2,
      "baseMics": 2
    });

    var room6 = new Room({
      "name": "Fox Grande",
      "roomID": 6,
      "size": 8,
      "price": 30,
      "baseIPads":4,
      "baseMics": 4
    });

    var room7 = new Room({
      "name": "Fox Grande",
      "roomID": 7,
      "size": 8,
      "price": 30,
      "baseIPads":4,
      "baseMics": 4
    });

    var room8 = new Room({
      "name": "Fox Grande",
      "roomID": 8,
      "size": 8,
      "price": 30,
      "baseIPads":4,
      "baseMics": 4
    });

    var room9 = new Room({
      "name": "Fox Enorme",
      "roomID": 9,
      "size": 8,
      "price": 45,
      "baseIPads":6,
      "baseMics": 6
    });

    var room10 = new Room({
      "name": "Fox Enorme",
      "roomID": 10,
      "size": 8,
      "price": 45,
      "baseIPads":6,
      "baseMics": 6
    });

    // save all the rooms to mongo
    room1.save();
    room2.save();
    room3.save();
    room4.save();
    room5.save();
    room6.save();
    room7.save();
    room8.save();
    room9.save();
    room10.save();

    console.log('Adding base 10 rooms to database');
  }
});

module.exports = Room;
