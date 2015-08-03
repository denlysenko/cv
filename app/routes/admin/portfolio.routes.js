'use strict';

module.exports = function(app) {
	var portfolio = require('../../../app/controllers/admin/portfolio.controller');
	var users = require('../../../app/controllers/users/users.authorization.server.controller');

	app.route('/api/admin/:lang/portfolio/:id?')
		.get(portfolio.get)
		.post(users.requiresLogin, portfolio.add)
		.delete(users.requiresLogin, portfolio.remove);
};