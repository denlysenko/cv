'use strict';

var mongoose = require('mongoose'),
		About_ru = mongoose.model('About_ru'),
		About_en = mongoose.model('About_en'),
		_ = require('lodash');

exports.get = function(req, res) {
	// check current lang and save respective document
	switch(req.params.lang) {
		case 'en':
			About_en.find({}, function(err, about) {
				if(err) return res.status(500).json({message: 'Something went wrong'});
				res.send(about);
			});
			break;

		case 'ru':
			About_ru.find({}, function(err, about) {
				if(err) return res.status(500).json({message: 'Something went wrong'});
				res.send(about);
			});
			break;
	}
};

exports.add = function(req, res) {
	// check current lang and save respective document
	switch(req.params.lang) {
		case 'en':
			About_en.find({}, function(err, about) {
				if(err) return res.status(500).res.json({message: 'Something went wrong'});
				// if info already exists, update it
				if(about.length) {
					// method find returns array, but we needs an object
					var about = about[0];
					_.extend(about, req.body);
					about.save(function(err) {
						if(err) return res.status(500).json({message: 'Something went wrong!'});
						res.send(about);
					});
				} else {
					// if not exists create new one
					var about = new About_en(req.body);
					about.save(function(err) {
						if(err) return res.status(500).json({message: 'Something went wrong!'});
						res.send(about);
					});
				}
			});
			break;

		case 'ru':
			About_ru.find({}, function(err, about) {
				if(err) return res.status(500).res.json({message: 'Something went wrong'});
				// if info already exists, update it
				if(about.length) {
					// method find returns array, but we needs an object
					var about = about[0];
					_.extend(about, req.body);
					about.save(function(err) {
						if(err) return res.status(500).json({message: 'Something went wrong!'});
						res.send(about);
					});
				} else {
					// if not exists create new one
					var about = new About_ru(req.body);
					about.save(function(err) {
						if(err) return res.status(500).json({message: 'Something went wrong!'});
						res.send(about);
					});
				}
			});
			break;	
	}
};

exports.remove = function(req, res) {
	// check current lang and remove respective document
	switch(req.params.lang) {
		case 'en':
			About_en.findByIdAndRemove(req.params.id, function(err) {
				if(err) return res.status(500).json({message: 'Something went wrong'});
				res.end();
			});
			break;

		case 'ru':
			About_ru.findByIdAndRemove(req.params.id, function(err) {
				if(err) return res.status(500).json({message: 'Ошибка сервера'});
				res.end();
			});
			break;	
	}
};	