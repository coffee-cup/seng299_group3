var mongoose = require('mongoose');
var User = require('../../models/user');
var jwt = require('jsonwebtoken');
var superSecret = 'ilovescotchscotchyscotchscotch'; //secret part to make JWT. from MEAN machine, can change if want

module.exports.addUser = function(req, res) {
    var user = new User();

    // check if request has attributes
    if (!req.body.username || !req.body.password || !req.body.name) {
      res.json({status: false, message: 'all attributes not provided'});
      return;
    }

    //set atrributes of the user
    user.name = req.body.name;
    user.username = req.body.username;
    user.password = req.body.password;
    user.banned = false;

    user.save(function(err) {
        if(err) {
            //duplicate entry
            if(err.code == 11000)
                return res.json({ success: false, message: 'A user with that username already exists. '
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

        if(req.body.banned) user.banned = req.body.banned;

        //save the user
        user.save(function(err) {
            if(err) res.send(err);

            //return a message
            res.json({message: 'User updated'}); //normally, successful api calls return a status of 200 or the requested object, failed requests return a specific error or a status of 400
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
/*module.exports.validateUser = function(req, res) {
    User.find({ username: req.body.username }, function(err, user) {
        if (err) {
            res.send(err);
        }
        res.json({user: user});
    });
};*/

module.exports.validateUser = function(req, res) {
    User.findOne({ username: req.body.username}).select('name username password').exec(function(err, user) {
        if (err) throw err;

        //no user with that username found
        if(!user) {
            res.json({success: false, message: 'Authentication failed. User not found'});

        }else if(user) {
            //check if password matches
            var validPassword = user.comparePassword(req.body.password);
            if(!validPassword) {
                res.json({success: false, message: 'Authentication failed. Wrong password.'});

            }else {
                //if user is found and password is correct, create token
                var token = jwt.sign({ name: user.name, username: user.username}, superSecret, { expiresInMinutes: 360});

                //token expires in 6 hours

                //return the information including token as JSON
                res.json({ success: true, token: token});
            }
        }
    });
};


