'use strict';

module.exports = function(app) {
	var education = require('../../../app/controllers/admin/education.controller');
	var users = require('../../../app/controllers/users/users.authorization.server.controller');

	app.route('/api/admin/:lang/education/:id?')
		.get(education.get)
		.post(users.requiresLogin, education.add)
		.delete(users.requiresLogin, education.remove);
};