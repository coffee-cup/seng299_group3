var mongoose = require('mongoose');
var Room = require('../../models/room');
var Equipment = require('../../models/equipment');

module.exports.filterOptions = function(req, res) {
  var test = {hello: 'world'};
  res.json(test);
};
