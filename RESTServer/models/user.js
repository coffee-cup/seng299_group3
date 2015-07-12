var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var Booking = require('./booking');

var UserSchema = new Schema({
    name: String,
    isAdmin: {type: Boolean},
    //username: { type: String},
    //password: { type: String},
    banned: {type: Boolean},

    // these seem to crash express with schema error. if this is only for me you can re-implement them.
    username: { type: String, required: true, index: {unique: true}},
    password: { type: String, required: true},
    bookings: Array
    //bookings: [{ type: Schema.ObjectId, ref: 'Booking'}]    
});

//hash password before user is saved
UserSchema.pre('save', function(next) {
    var user = this;

    //hash password only if password has been changed or is new
    if(!user.isModified('password'))
        return next();

    //generate the hash
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if(err) return next(err);

        //change password to hashed version
        user.password = hash;
        next();
    });
});

//method to compare a given password with the database hash
UserSchema.methods.comparePassword = function(password) {
    var user = this;

    return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);
