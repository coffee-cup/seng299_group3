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
        // this returns the user so that after the user has been created, the data can be used in the view
        res.json({user: user}); // why does this return the user? shouldnt it just return a 200?
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

module.exports.updateUser = function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if (err) {
            res.send(err);
        }
        //only updates values present in the request
        if(req.body.name) user.name = req.body.name;

        if(req.body.username) user.username = req.body.username;

        if(req.body.password) user.password = req.body.password;

        //save the user
        user.save(function(err) {
            if(err) res.send(err);

            // return the user so the updated user can be used
            res.json(user); //normally, successful api calls return a status of 200 or the requested object, failed requests return a specific error or a status of 400
        });
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

// TODO: implement validation for validateUser (login function)
module.exports.validateUser = function(req, res) {
    User.find({ username: req.body.username }, function(err, user) {
        if (err) {
            res.send(err);
        }
        res.json({user: user});
    });
};
