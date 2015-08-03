'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var ProfileSchema = new Schema({
	name: {
		type: String,
		required: 'First Name must be provided'
	},
	lastName: {
		type: String,
		required: 'Last Name must be provided'
	},
	photo: {
		type: String,
		default: ''
	},
	position: {
		type: String,
		required: 'Position must be provided'
	},
	about: {
		type: String,
		default: ''
	},
	location: {
		type: String,
		default: ''
	},
	phone: {
		type: String,
		default: ''
	},
	email: {
		type: String,
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	skills: {
		type: String,
		default: ''
	}
});		

mongoose.model('Profile_en', ProfileSchema);
mongoose.model('Profile_ru', ProfileSchema);