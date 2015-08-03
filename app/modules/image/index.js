'use strict';

var fs = require('fs'),
		async = require('async');

exports.save = function(file, path, callback) {
	// creating new path for storing files
	var img = file.replace('upload', path);
	fs.rename(file, img, function(err) {
		if(err) return callback(err);
		var index = img.indexOf('public') + 6;
		// removing part of path starting from index
		var newPath = img.substr(index);
		callback(null, newPath);
	});
};	

exports.remove = function(path, callback) {
	if(path) return callback();
	fs.unlink(path, callback);
};	