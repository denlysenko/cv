'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var EduSchema = new Schema({
	institution: {
		type: String,
		trim: true,
		default: ''
	},
	specialty: {
		type: String,
		trim: true,
		default: ''
	},
	from: {
		type: Date
	},
	to: {
		type: Date
	},
	comments: {
		type: String,
		default: ''
	}
});		


mongoose.model('Edu_en', EduSchema);
mongoose.model('Edu_ru', EduSchema);