var mongoose = require('mongoose');
var Room = require('../../models/room');
var Equipment = require('../../models/equipment');
var Booking = require('../../models/booking');

function filterRoomsForPeople() {

}

module.exports.filterOptions = function(req, res) {
  var date = new Date(req.body.date);
  var num_people = req.body.num_people;

};
