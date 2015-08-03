'use strict';

module.exports = function(app) {
	var profile = require('../../../app/controllers/admin/profile.controller');
	var users = require('../../../app/controllers/users/users.authorization.server.controller');

	app.route('/api/admin/:lang/profile/:id?')
		.get(profile.get)
		.post(users.requiresLogin, profile.add)
		.delete(users.requiresLogin, profile.remove);
};