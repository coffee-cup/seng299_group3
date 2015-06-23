var mongoose = require('mongoose');
var Post = require('../../models/post');

module.exports.addPost = function(req, res) {
	var post = new Post(req.body.post);
	post.save(function(err) {
		if (err) {
			res.send(err);
		}
		res.json({post: post});
	});
};

module.exports.getAllPosts = function(req, res) {
	Post.find(function(err, posts) {
		if (err) {
			res.send(err);
		}
		res.json({posts: posts});
	});
};

module.exports.getSinglePost = function(req, res, id) {
	Post.findById(id, function(err, post) {
		if (err) {
			res.send(err);
		}
		res.json({post: post});
	});
};

module.exports.updatePost = function(req, res, id) {
	Post.findByIdAndUpdate(id, {$set: req.body.post}, function(err, post) {
		if (err) {
			res.send(err);
		}
		res.json({post: post});
	});
};

module.exports.deletePost = function(req, res, id) {
	Post.findByIdAndRemove(id, function(err) {
		if (err) {
			res.send(err);
		}
		res.sendStatus(200);
	});
};