var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    username: { type: String},
    password: { type: String}

    // these seem to crash express with schema error. if this is only for me you can re-implement them.
    //username: { type: String, required: true, index: {unique: true}},
    //password: { type: String, required: true, select: false}
});

module.exports = mongoose.model('User', UserSchema);
