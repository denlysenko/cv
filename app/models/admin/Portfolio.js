'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var PortfolioSchema = new Schema({
	title: {
		type: String,
		trim: true
	},
	screenshot: {
		type: String
	},
	description: {
		type: String,
		trim: true
	}
});		

mongoose.model('Portfolio_en', PortfolioSchema);		
mongoose.model('Portfolio_ru', PortfolioSchema);		