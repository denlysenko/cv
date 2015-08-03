'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var AboutSchema = new Schema({
	info: String
});		

mongoose.model('About_en', AboutSchema);
mongoose.model('About_ru', AboutSchema);