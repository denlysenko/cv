'use strict';

var mongoose = require('mongoose'),
		Work_en = mongoose.model('Work_en'),
		Work_ru = mongoose.model('Work_ru'),
		_ = require('lodash');

exports.get = function(req, res) {
	// check current lang and save respective document
	switch(req.params.lang) {
		case 'en':
			Work_en.find({}, function(err, docs) {
				if(err) return res.status(500).json({message: 'Something went wrong'});
				res.json(docs);
			});
			break;

		case 'ru':
			Work_ru.find({}, function(err, docs) {
				if(err) return res.status(500).json({message: 'Ошибка сервера'});
				res.json(docs);
			});
			break;	
	}
};

exports.add = function(req, res) {
	// check current lang and save respective document
	switch(req.params.lang) {

		case 'en':
			Work_en.findById(req.params.id, function(err, doc) {

				if(err) return res.status(500).res.json({message: err.message});
				// if info already exists, update it
				if(doc) {
					_.extend(doc, req.body);
					doc.save(function(err) {
						if(err) return res.status(500).json({message: 'Something went wrong'});
						res.end();
					});
					
				} else {
					// if not exists create new one
					var doc = new Work_en(req.body);
					doc.save(function(err) {
						if(err) return res.status(500).json({message: err.message});
						res.end();
					});
				}
			});
			break;

		case 'ru':
			Work_ru.findById(req.params.id, function(err, doc) {

				if(err) return res.status(500).res.json({message: err.message});
				// if info already exists, update it
				if(doc) {
					_.extend(doc, req.body);
					doc.save(function(err) {
						if(err) return res.status(500).json({message: 'Something went wrong'});
						res.end();
					});
					
				} else {
					// if not exists create new one
					var doc = new Work_ru(req.body);
					doc.save(function(err) {
						if(err) return res.status(500).json({message: err.message});
						res.end();
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
			Work_en.findByIdAndRemove(req.params.id, function(err) {
				if(err) return res.status(500).json({message: 'Something went wrong'});
				res.end();
			});

			break;

		case 'ru':
			Work_ru.findByIdAndRemove(req.params.id, function(err) {
				if(err) return res.status(500).json({message: 'Ошибка сервера'});
				res.end();
			});
			break;	
	}
};	