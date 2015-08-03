'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var WorkSchema = new Schema({
	company: {
		type: String,
		default: '',
		trim: true
	},
	position: {
		type: String,
		default: '',
		trim: true
	},
	from: {
		type: Date
	},
	to: {
		type: Date
	},
	duties: {
		type: String,
		default: ''
	}
});

mongoose.model('Work_en', WorkSchema);
mongoose.model('Work_ru', WorkSchema);