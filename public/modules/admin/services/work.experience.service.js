'use strict';

angular.module('admin').factory('ExperienceService', ['$resource', function($resource) {
	return $resource('/api/admin/:lang/experience/:id');
}]);