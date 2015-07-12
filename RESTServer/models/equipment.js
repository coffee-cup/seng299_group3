var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EquipmentSchema = new Schema({
    equiptment_id: String,
    type: String
    // bookingID: Number,
    //availability: wasn't sure what type for availablitity
});

// check if the extra 10 ipads and microphones are in the database
// if not, add them

var Equipment = mongoose.model('Equipment', EquipmentSchema);
Equipment.find(function(err, ments) {
  if (err) {
    console.log(err);
    return;
  }

  if (ments.length == 0) {

    // add 10 ipads
    var i;
    for(i=1;i<=10;i++) {
      var e = new Equipment({
        equiptment_id: i,
        type: 'ipad'
      });
      e.save();
    }

    // add 10 mics
    for(i=1;i<=10;i++) {
      var e = new Equipment({
        equiptment_id: 10 + i,
        type: 'mic'
      });
      e.save();
    }

    console.log('adding base 10 ipads and mics');
  }
});

module.exports = Equipment;
