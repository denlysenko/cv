'use strict';

angular.module('core').factory('CheckAuth', ['$location', 'Authentication', function($location, Authentication) {
	return function() {
		// if unauthorized user trying to get this page, redirect to login page
		if(!Authentication.user) {
			$location.path('/signin');
		}
	};
}]);