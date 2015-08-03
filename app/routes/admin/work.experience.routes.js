'use strict';

module.exports = function(app) {
	var work = require('../../../app/controllers/admin/work.experience.controller');
	var users = require('../../../app/controllers/users/users.authorization.server.controller');

	app.route('/api/admin/:lang/experience/:id?')
		.get(work.get)
		.post(users.requiresLogin, work.add)
		.delete(users.requiresLogin, work.remove);
};