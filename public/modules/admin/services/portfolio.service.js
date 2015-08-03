'use strict';

angular.module('admin').factory('PortfolioService', ['$resource', function($resource) {
	return $resource('/api/admin/:lang/portfolio/:id');
}]);