'use strict';

angular.module('admin').factory('AboutService', ['$resource', function($resource) {
	return $resource('/api/admin/:lang/about/:id');
}]);