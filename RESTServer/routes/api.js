var express = require('express');
var router = express.Router();

var posts = require('./api/post');
var users = require('./api/user');
var bookings = require('./api/booking');

/* Posts routes */
router.route('/posts')
	.post(function(req,res) { posts.addPost(req,res) })
	.get(function(req,res) { posts.getAllPosts(req,res) });

/* Single post routes */
router.route('/posts/:post_id')
	.get(function(req, res) { posts.getSinglePost(req, res, req.params.post_id) })
	.put(function(req, res) { posts.updatePost(req, res, req.params.post_id) })
	.delete(function(req, res) { posts.deletePost(req, res, req.params.post_id) });

/* Users routes */
router.route('/users')
    .post(function(req,res) { users.addUser(req,res) })
    .get(function(req,res) { users.getAllUsers(req,res) });

/* Single user routes */
router.route('/users/:user_id')
    .get(function(req, res) { users.getSingleUser(req, res, req.params.user_id) })
    .put(function(req, res) { users.updateUser(req, res, req.params.user_id) })
    .delete(function(req, res) { users.deleteUser(req, res, req.params.user_id) });

/* Login route*/
router.route('/users/login')
    .post(function(req,res) { users.validateUser(req,res) });

/* Booking routes */
router.route('/bookings')
    .post(function(req, res) { bookings.createBooking(req,res) })
    .get(function(req, res) { bookings.getAllBookings(req,res) });

/* Single booking routes */
router.route('/bookings/:booking_id')
    .get(function(req, res) { bookings.getSingleBooking(req, res, req.params.booking_id) })
    .delete(function(req, res) { bookings.deleteBooking(req, res, req.params.booking_id) });

module.exports = router;
