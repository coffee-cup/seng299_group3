var mongoose = require('mongoose');
var User = require('../../models/user');

module.exports.addUser = function(req, res) {
    var user = new User();
    
    //set atrributes of the user
    user.name = req.body.name;
    user.username = req.body.username;
    user.password = req.body.password;

    user.save(function(err) {
        if(err) {
            //duplicate entry
            if(err.code == 11000)
                return res.json({ success: false, messsage: 'A user with that username already exists. '
                });
            else
                return res.send(err);
            }
        res.json({user: user});
    });
};

module.exports.getAllUsers = function(req, res) {
    User.find(function(err, users) {
        if (err) {
            res.send(err);
        }
        res.json({users: users});
    });
};

module.exports.getSingleUser = function(req, res, id) {
    User.findById(id, function(err, user) {
        if (err) {
            res.send(err);
        }
        res.json({user: user});
    });
};

module.exports.updateUser = function(req, res, id) {
    User.findByIdAndUpdate(id, {$set: req.body.user}, function(err, user) {
        if (err) {
            res.send(err);
        }
        res.json({user: user});
    });
};

module.exports.deleteUser = function(req, res, id) {
    User.findByIdAndRemove(id, function(err) {
        if (err) {
            res.send(err);
        }
        res.sendStatus(200);
    });
};