var express = require('express');
var router = express.Router();

var posts = require('./api/post');
var users = require('./api/user');
var bookings = require('./api/booking');
var rooms = require('./api/room');
var bookroom = require('./api/bookroom');

/* Bookroom routes */
router.route('/bookroom')
  .post(function(req, res) {bookroom.filterOptions(req, res) });

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
    .get(function(req, res) { bookings.getAllBookings(req,res) });

/* Single booking routes */
router.route('/bookings/:booking_id')
    .get(function(req, res) { bookings.getSingleBooking(req, res, req.params.booking_id) })

/* Cancel Booking Route */
router.route('/users/:user_id/bookings/:booking_id')
    .delete(function(req, res) { bookings.cancelBooking(req, res, req.params.user_id, req.params.booking_id) });

/* Create booking route */
router.route('/users/:user_id/bookings')
    .get(function(req, res) {bookings.findBookingsForUser(req, res, req.params.user_id) })
    .post(function(req, res) { bookings.createBooking(req,res, req.params.user_id) });

/* Single Room routes */
router.route('/rooms/:room_id')
    .get(function(req, res) { rooms.getSingleRoom(req,res) })
    .put(function(req, res) { rooms.updateRoom(req,res) });

/* Multi Room routes */
router.route('/rooms')
    .post(function(req, res) { rooms.addRoom(req,res) })
    .get(function(req, res) { rooms.getAllRooms(req,res) });

module.exports = router;
