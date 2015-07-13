var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EquipmentSchema = new Schema({
    equipment_id: Number,
    type: String,
    checkedOut: Boolean,
    outDate: Date,
    inDate: Date
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
        equipment_id: i,
        type: 'ipad',
        checkedOut: false,
        outDate: new Date(),
        inDate: new Date()
      });
      e.save();
    }

    // add 10 mics
    for(i=1;i<=10;i++) {
      var e = new Equipment({
        equipment_id: 10 + i,
        type: 'mic',
        checkedOut: false,
        outDate: new Date()
      });
      e.save();
    }

    console.log('adding base 10 ipads and mics');
  }
});

module.exports = Equipment;
