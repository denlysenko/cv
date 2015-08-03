'use strict';

var mongoose = require('mongoose'),
		Profile_en = mongoose.model('Profile_en'),
		Profile_ru = mongoose.model('Profile_ru'),
		_ = require('lodash'),
		fs = require('fs'),
		async = require('async'),
		image = require('../../modules/image'),
		normalize = require('path').normalize;

exports.get = function(req, res) {
	// check current lang and save respective document
	switch(req.params.lang) {
		case 'en':
			Profile_en.find({}, function(err, profile) {
				if(err) return res.status(500).json({message: 'Something went wrong'});
				res.json(profile);
			});
			break;

		case 'ru':
			Profile_ru.find({}, function(err, profile) {
				if(err) return res.status(500).json({message: 'Ошибка сервера'});
				res.json(profile);
			});
			break;	
	}
};

exports.add = function(req, res) {
	// check current lang and save respective document
	switch(req.params.lang) {

		case 'en':
			Profile_en.find({}, function(err, profile) {
				if(err) return res.status(500).res.json({message: err.message});
				// if info already exists, update it
				if(profile.length) {
					// method find returns array, but we need an object
					var profile = profile[0];
					_.extend(profile, req.body);

					if(req.files.file) {
						async.series([
							function(done) {
								var path = normalize(__dirname + '../../../../public/' + profile.photo);
								image.remove(path, done);
							},
							function(done) {
								image.save(req.files.file.path, 'public/modules/sidebar/img/photo', done);
							}
						], function(err, results) {
							profile.photo = results[1];
							profile.save(function(err) {
								if(err) return res.status(500).json({message: 'Something went wrong'});
								res.json(profile);
							});
						});
						
					} else {
						profile.save(function(err) {
							if(err) return res.status(500).json({message: 'Something went wrong!'});
							res.json(profile);
						});
					}
					
				} else {
					// if not exists create new one
					var profile = new Profile_en(req.body);
					if(req.files.file) {
						image.save(req.files.file.path, 'public/modules/sidebar/img/photo', function(err, photo) {
							if(err) return res.status(500).json({message: 'Something went wrong'});
							profile.photo = photo;
							profile.save(function(err) {
								if(err) return res.status(500).json({message: 'Something went wrong'});
								res.json(profile);
							});
						});
					} else {
						profile.save(function(err) {
							if(err) return res.status(500).json({message: err.message});
							res.send(profile);
						});
					}
				}
			});
			break;

		case 'ru':
			Profile_ru.find({}, function(err, profile) {
				if(err) return res.status(500).res.json({message: err.message});
				// if info already exists, update it
				if(profile.length) {
					// method find returns array, but we need an object
					var profile = profile[0];
					_.extend(profile, req.body);

					if(req.files.file) {
						async.series([
							function(done) {
								var path = normalize(__dirname + '../../../../public/' + profile.photo);
								image.remove(path, done);
							},
							function(done) {
								image.save(req.files.file.path, 'public/modules/sidebar/img/photo', done);
							}
						], function(err, results) {
							profile.photo = results[1];
							profile.save(function(err) {
								if(err) return res.status(500).json({message: 'Something went wrong'});
								res.json(profile);
							});
						});
						
					} else {
						profile.save(function(err) {
							if(err) return res.status(500).json({message: 'Something went wrong!'});
							res.json(profile);
						});
					}
					
				} else {
					// if not exists create new one
					var profile = new Profile_ru(req.body);
					if(req.files.file) {
						image.save(req.files.file.path, 'public/modules/sidebar/img/photo', function(err, photo) {
							if(err) return res.status(500).json({message: 'Something went wrong'});
							profile.photo = photo;
							profile.save(function(err) {
								if(err) return res.status(500).json({message: 'Something went wrong'});
								res.json(profile);
							});
						});
					} else {
						profile.save(function(err) {
							if(err) return res.status(500).json({message: err.message});
							res.send(profile);
						});
					}
				}
			});
			break;	
	}
};

exports.remove = function(req, res) {
	// check current lang and remove respective document
	switch(req.params.lang) {
		case 'en':
			async.waterfall([
				function(done) {
					Profile_en.findByIdAndRemove(req.params.id, done);
				},
				function(profile, done) {
					var path = normalize(__dirname + '../../../../public/' + profile.photo);
					image.remove(path, done);
				}
			], function(err) {
				if(err) return res.status(500).json({message: err.message});
					res.end();
				});

			break;

		case 'ru':
			async.waterfall([
				function(done) {
					Profile_ru.findByIdAndRemove(req.params.id, done);
				},
				function(profile, done) {
					var path = normalize(__dirname + '../../../../public/' + profile.photo);
					image.remove(path, done);
				}
			], function(err) {
				if(err) return res.status(500).json({message: err.message});
					res.end();
				});
			break;	
	}
};	