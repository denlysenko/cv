'use strict';

angular.module('admin').factory('ProfileService', ['$resource', function($resource) {
	return $resource('/api/admin/:lang/profile/:id');
}]);