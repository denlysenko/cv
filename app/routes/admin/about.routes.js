'use strict';

module.exports = function(app) {
	var about = require('../../../app/controllers/admin/about.controller');
	var users = require('../../../app/controllers/users/users.authorization.server.controller');
	app.route('/api/admin/:lang/about/:id?')
		.get(about.get)
		.post(users.requiresLogin, about.add)
		.delete(users.requiresLogin, about.remove);
};