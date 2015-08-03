'use strict';

angular.module('admin').factory('EducationService', ['$resource', function($resource) {
	return $resource('/api/admin/:lang/education/:id');
}]);