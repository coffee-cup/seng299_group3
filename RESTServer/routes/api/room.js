var mongoose = require('mongoose');
var Room = require('../../models/room');
var Booking = require('../../models/booking.js');

module.exports.addRoom = function(req, res) {
  var room = new Room();

    //set attributes of the room
    room.name = req.body.name;
    room.roomID = req.body.roomID;
    room.size = req.body.size;
    room.price = req.body.price;
    room.baseIPads = req.body.baseIPads;
    room.baseMics = req.body.baseMics;
    room.isDown = req.body.isDown;

    room.save(function(err) {
      if(err) {
        res.send(err);
      }
        // this returns the room so that after the room has been created, the data can be used in the view
        res.json({room: room});
      });
  };

  module.exports.getAllRooms = function(req, res) {
    var search = {
      isDown: false
    }
    if (req.query.isDown == 'true') {
      search.isDown = true
    }
    Room.find(search, null, function(err, rooms) {
      if (err) {
        res.send(err);
      }
      res.json({rooms: rooms});
    });
  };

  module.exports.getSingleRoom = function(req, res) {
    Room.findById(req.params.room_id, function(err, room) {
      if (err) {
        res.send(err);
      }
      res.json({room: room});
    });
  };

  module.exports.updateRoom = function(req, res) {
    Room.findById(req.params.room_id, function(err, room) {
      if (err) {
        res.send(err);
      }
        //only updates values present in the request
        if(req.body.name) room.name = req.body.name;

        if(req.body.roomID) room.roomID = req.body.roomID;

        if(req.body.size) room.size = req.body.size;

        if(req.body.price) room.price = req.body.price;

        if(req.body.baseIPads) room.baseIPads = req.body.baseIPads;

        if(req.body.baseMics) room.baseMics = req.body.baseMics;

        if(req.body.isDown) room.isDown = req.body.isDown;

        //save the room
        room.save(function(err) {
          if(err) res.send(err);

            //return a message
            res.json({room: room});
          });
      });
  };

  module.exports.getRoomAvailability = function(req, res) {
    Room.find({ isDown: false }, null, {sort: {roomID: 1}}, function(err, rooms) {
      if (err) {
        res.send(err);
      }

        //var size = 0;
        var size = req.query.num_people;
        var date = req.query.date;
        var roomIds;
        if (size == 0) {
          size = 12;
        } else if (size == 1 || size == 2) {
          roomIds = [1,2]
        } else if (size >= 3 && size <= 4) {
          roomIds = [3,4,5]
        } else if (size >= 5 && size <= 8) {
          roomIds = [6,7,8]
        } else if (size >= 9) {
          roomIds = [9,10]
        }

        var posRooms = [];
        function returnRooms(){
          var sorted = posRooms.sort(function(a, b) {
            return a.roomID - b.roomID;
          });
          return res.json({rooms: sorted});
        }
        var numThreads = 0;
        console.log(roomIds);
        for( var i in roomIds ) {
          numThreads++;
          Booking.roomAvailability(date, roomIds[i], function(times, roomid){
            Room.find({roomID: roomid}, null, {sort: {roomID: 1}}, function(err, room) {
              if (room.length > 0) {
                var roomInstance = {
                  times: times,
                  name: room[0].name,
                  size: room[0].size,
                  roomID: roomid,
                  date: date,
                  people: size,
                  baseMics: room[0].baseMics,
                  baseIPads: room[0].baseIPads,
                  price: room[0].price
                }
                console.log(roomInstance);
                posRooms.push(roomInstance);
                console.log(posRooms);
                numThreads--;
                if(numThreads == 0){
                  returnRooms();
                }
              }
            });
          });
        }
      });
};
