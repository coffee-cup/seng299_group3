var mongoose = require('mongoose');
var Room = require('../../models/room');
var Equipment = require('../../models/equipment');


module.exports.addRoom = function(req, res) {
    var room = new Room();

    //set attributes of the room
    room.name = req.body.name;
    room.roomID = req.body.roomID;
    room.size = req.body.size;
    room.price = req.body.price;
    room.baseIPads = req.body.baseIPads;
    room.baseMics = req.body.baseMics;

    room.save(function(err) {
        if(err) {
            //duplicate entry
            if(err.code == 11000)
                return res.json({ success: false, messsage: 'A room with that name already exists.'});
            else
                return res.send(err);
            }
        // this returns the room so that after the room has been created, the data can be used in the view
        res.json({room: room}); // why does this return the room? shouldnt it just return a 200?
    });
};

module.exports.getAllRooms = function(req, res) {
    Room.find(function(err, rooms) {
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

        //save the room
        room.save(function(err) {
            if(err) res.send(err);

            //return a message
            res.json({message: 'Room updated'});
        });
    });
};
