'use strict';

angular.module('portfolio').config(['$stateProvider', function($stateProvider) {
	$stateProvider
		.state('portfolio', {
			url: '/portfolio',
			templateUrl: 'modules/portfolio/views/portfolio.html'
		});
}]);