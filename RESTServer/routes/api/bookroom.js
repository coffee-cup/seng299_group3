var mongoose = require('mongoose');
var Room = require('../../models/room');
var Equipment = require('../../models/equipment');
var Booking = require('../../models/booking.js');

module.exports.filterOptions = function(req, res) {
  var test = {hello: 'world'};
  res.json(test);
};

module.exports.getAvailableEquipment = function(req, res) {

    var date = req.query.date ;
    Booking.booking.find({'date': { $gte : new Date(date)}, 'canceledStatus': false}, function(err, bookings) {
        console.log(bookings);
        if (err) {
            res.send(err);
        }


    var startTime = req.query.startTime ;
    var endTime = req.query.endTime ;
    var isMic = false; //false for iPad, true for Mic, iPad by default
    if(req.query.type == 'm'){isMic = true;}
	console.log(new Date(date));

    var sum = 10;
    var minSum = 10;
    var i;
    var j;
    var k;
    console.log('test');
    console.log(bookings.length);
    for(i = startTime; i < endTime; i++)
    {
        console.log('i = '); console.log(i);
        for (j=0; j < bookings.length; j++)
        {
            if(  ( bookings[j].startTime >= startTime && bookings[j].startTime < endTime ) || ( bookings[j].endTime >= startTime && bookings[j].endTime <= endTime )  )
            {
               console.log(isMic);
               if(isMic)
               {

                   for(k in bookings[j].equipment)
                   {
                       if(bookings[j].equipment[k].type == 'mic'){sum--;}
                   }
               }
               else
               {

                   for(k in bookings[j].equipment)
                   {
                       if(bookings[j].equipment[k].type == 'ipad'){sum--;}
                   }
               }
            }
        }
        if(sum < minSum){minSum = sum;}
        sum = 10;
    }
    if(isMic){ res.json({type: 'mic', numRemaining: minSum}); }
    else{ res.json({type: 'ipad', numRemaining: minSum}); }

    });

    //return minSum; //Number of available mics or ipads by busiest overlapping hour
};
