'use strict';

angular.module('admin').config(['$stateProvider', function($stateProvider) {
	$stateProvider
		.state('admin page', {
			url: '/admin',
			templateUrl: 'modules/admin/views/admin.html',
			controller: 'MainAdminController'
		})
		.state('admin work experience info', {
			url: '/admin/experience',
			templateUrl: 'modules/admin/views/work.experience.html',
			controller: 'ExperienceController'
		})
		.state('admin education info', {
			url: '/admin/education',
			templateUrl: 'modules/admin/views/education.html',
			controller: 'EducationController'
		})
		.state('admin profile page', {
			url: '/admin/profile',
			templateUrl: 'modules/admin/views/profile.html',
			controller: 'ProfileController'
		})
		.state('admin about page', {
			url: '/admin/about',
			templateUrl: 'modules/admin/views/about.html',
			controller: 'AboutController'
		})
		.state('admin portfolio page', {
			url: '/admin/portfolio',
			templateUrl: 'modules/admin/views/portfolio.html',
			controller: 'PortfController'
		});
}]);