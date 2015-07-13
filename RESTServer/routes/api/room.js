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

        if(req.body.isDown) room.isDown = req.body.isDown;
        
        //save the room
        room.save(function(err) {
            if(err) res.send(err);

            //return a message
            res.json({message: 'Room updated'});
        });
    });
};

module.exports.getRoomAvailability = function(req, res) {
    Room.find({ isDown: false }, function(err, rooms) {
        if (err) {
            res.send(err);
        }

        //var size = 0;
        var size = req.query.num_people;
        var date = req.query.date;

        var posRooms = [];
	var roomInstance =
        {
            times: [
                {
                    booked: Boolean,
                    time: Number
                }
            ],
            date: Date,
            people: Number,
            name: String,
            baseMics: Number,
            baseIPads: Number
        };         
            	   
        var i = 0;

        if (size == 0)
        {          
            	   
            for(i = 0; i < rooms.length; i++)
            {
                roomInstance.times = Booking.roomAvailability(date, roomInstance.room_id);
                roomInstance.date = date;
                roomInstance.people = size;
                roomInstance.name = rooms[i].name;
                roomInstance.baseMics = rooms[i].baseMics;
                roomInstance.baseIPads = rooms[i].baseIPads;
                posRooms.push(roomInstance);
            }
        }

        var allBookedUp = true;
        switch (true) {
        case (size == 1 || size == 2):
            //Return Fox Double - 2 - 2 rooms
            for(i = 0; i < rooms.length; i++)
            {
                if(rooms[i].size == 2)
                {
                    roomInstance.times = Booking.roomAvailability(date, roomInstance.room_id);
                    roomInstance.date = date;
                    roomInstance.people = size;
                    roomInstance.name = rooms[i].name;
                    roomInstance.baseMics = rooms[i].baseMics;
                    roomInstance.baseIPads = rooms[i].baseIPads;
                    posRooms.push(roomInstance);
                    var t;
                    for (t in roomInstance.times)
                    {
                        if(roomInstance.times[t].booked != false)
                        {
                            allBookedUp == false
                        }
                    }
                }
            }
            console.log(allBookedUp);
            if(allBookedUp == false){ break;}

        case (size == 3 || size == 4):
            //Return Fox Quad - 4 - 3 rooms
            for(i = 0; i < rooms.length; i++)
            {
                if(rooms[i].size == 4)
                {
                    roomInstance.times = Booking.roomAvailability(date, roomInstance.room_id);
                    roomInstance.date = date;
                    roomInstance.people = size;
                    roomInstance.name = rooms[i].name;
                    roomInstance.baseMics = rooms[i].baseMics;
                    roomInstance.baseIPads = rooms[i].baseIPads;
                    posRooms.push(roomInstance);
                    var t;
                    for (t in roomInstance.times)
                    {
                        if(roomInstance.times[t].booked != false)
                        {
                            allBookedUp == false
                        }
                    }
                }
            }
            if(allBookedUp == false){ break;}

        case (size > 4 && size < 9):
            //Return Fox Grande - 8 - 3 rooms
            for(i = 0; i < rooms.length; i++)
            {
                if(rooms[i].size == 8)
                {
                    roomInstance.times = Booking.roomAvailability(date, roomInstance.room_id);
                    roomInstance.date = date;
                    roomInstance.people = size;
                    roomInstance.name = rooms[i].name;
                    roomInstance.baseMics = rooms[i].baseMics;
                    roomInstance.baseIPads = rooms[i].baseIPads;
                    posRooms.push(roomInstance);
                    var t;
                    console.log(roomInstance.times);
                    for (t in roomInstance.times)
                    {
                        if(roomInstance.times[t].booked != false)
                        {
                            allBookedUp == false
                        }
                    }
                }
            }
            if(allBookedUp == false){ break;}

        case (size > 8 && size < 13):
            //Return Fox Enorme - 12 - 2 rooms
            for(i = 0; i < rooms.length; i++)
            {
                if(rooms[i].size == 12)
                {
                    roomInstance.times = Booking.roomAvailability(date, roomInstance.room_id);
                    roomInstance.date = date;
                    roomInstance.people = size;
                    roomInstance.name = rooms[i].name;
                    roomInstance.baseMics = rooms[i].baseMics;
                    roomInstance.baseIPads = rooms[i].baseIPads;
                    posRooms.push(roomInstance);
                    var t;
                    for (t in roomInstance.times)
                    {
                        if(roomInstance.times[t].booked != false)
                        {
                            allBookedUp == false
                        }
                    }
                }
            }
            if(allBookedUp == false){ break;}

        case (size >= 13): //Also the house is full
            console.log('hit case 13');
          return  res.json({rooms: []});  //If size of party >12 send no rooms
        }
        res.json({rooms: posRooms});
    });
};
