'use strict';

var mongoose = require('mongoose'),
		Portfolio_en = mongoose.model('Portfolio_en'),
		Portfolio_ru = mongoose.model('Portfolio_ru'),
		_ = require('lodash'),
		fs = require('fs'),
		async = require('async'),
		image = require('../../modules/image'),
		normalize = require('path').normalize;

exports.get = function(req, res) {
	// check current lang and save respective document
	switch(req.params.lang) {
		case 'en':
			Portfolio_en.find({}, function(err, portfolio) {
				if(err) return res.status(500).json({message: 'Something went wrong'});
				res.json(portfolio);
			});
			break;

		case 'ru':
			Portfolio_ru.find({}, function(err, portfolio) {
				if(err) return res.status(500).json({message: 'Ошибка сервера'});
				res.json(portfolio);
			});
			break;	
	}
};

exports.add = function(req, res) {
	// check current lang and save respective document
	switch(req.params.lang) {

		case 'en':
			Portfolio_en.findById(req.params.id, function(err, portfolio) {

				if(err) return res.status(500).res.json({message: err.message});
				// if info already exists, update it
				if(portfolio) {
					_.extend(portfolio, req.body);

					if(req.files.file) {
						async.series([
							function(done) {
								var path = normalize(__dirname + '../../../../public/' + portfolio.screenshot);
								image.remove(path, done);
							},
							function(done) {
								image.save(req.files.file.path, 'public/modules/portfolio/img/screenshots', done);
							}
						], function(err, results) {
							portfolio.screenshot = results[1];
							portfolio.save(function(err) {
								if(err) return res.status(500).json({message: 'Something went wrong'});
								res.json(portfolio);
							});
						});
						
					} else {
						portfolio.save(function(err) {
							if(err) return res.status(500).json({message: 'Something went wrong!'});
							res.json(portfolio);
						});
					}
					
				} else {
					// if not exists create new one
					var portfolio = new Portfolio_en(req.body);
					if(req.files.file) {
						image.save(req.files.file.path, 'public/modules/portfolio/img/screenshots', function(err, screenshot) {
							if(err) return res.status(500).json({message: 'Something went wrong'});
							portfolio.screenshot = screenshot;
							portfolio.save(function(err) {
								if(err) return res.status(500).json({message: 'Something went wrong'});
								res.json(portfolio);
							});
						});
					} else {
						portfolio.save(function(err) {
							if(err) return res.status(500).json({message: err.message});
							res.send(portfolio);
						});
					}
				}
			});
			break;

		case 'ru':
			Portfolio_ru.findById(req.params.id, function(err, portfolio) {

				if(err) return res.status(500).res.json({message: err.message});
				// if info already exists, update it
				if(portfolio) {
					_.extend(portfolio, req.body);

					if(req.files.file) {
						async.series([
							function(done) {
								var path = normalize(__dirname + '../../../../public/' + portfolio.screenshot);
								image.remove(path, done);
							},
							function(done) {
								image.save(req.files.file.path, 'public/modules/portfolio/img/screenshots', done);
							}
						], function(err, results) {
							portfolio.screenshot = results[1];
							portfolio.save(function(err) {
								if(err) return res.status(500).json({message: 'Something went wrong'});
								res.json(portfolio);
							});
						});
						
					} else {
						portfolio.save(function(err) {
							if(err) return res.status(500).json({message: 'Something went wrong!'});
							res.json(portfolio);
						});
					}
					
				} else {
					// if not exists create new one
					var portfolio = new Portfolio_ru(req.body);
					if(req.files.file) {
						image.save(req.files.file.path, 'public/modules/portfolio/img/screenshots', function(err, screenshot) {
							if(err) return res.status(500).json({message: 'Something went wrong'});
							portfolio.screenshot = screenshot;
							portfolio.save(function(err) {
								if(err) return res.status(500).json({message: 'Something went wrong'});
								res.json(portfolio);
							});
						});
					} else {
						portfolio.save(function(err) {
							if(err) return res.status(500).json({message: err.message});
							res.send(portfolio);
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
					Portfolio_en.findByIdAndRemove(req.params.id, done);
				},
				function(portfolio, done) {
					var path = normalize(__dirname + '../../../../public/' + portfolio.screenshot);
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
					Portfolio_ru.findByIdAndRemove(req.params.id, done);
				},
				function(portfolio, done) {
					var path = normalize(__dirname + '../../../../public/' + portfolio.screenshot);
					image.remove(path, done);
				}
			], function(err) {
				if(err) return res.status(500).json({message: err.message});
					res.end();
				});
			break;	
	}
};	