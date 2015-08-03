'use strict';

angular.module('core').run(['$rootScope', 'CheckAuth', function($rootScope, CheckAuth) {
	// setting up English as default

	$rootScope.lang = 'en';

	// checking authorization when state changes
	$rootScope.$on('$stateChangeStart', function(event, stateTo) {
		if(stateTo.url.indexOf('admin') !== -1) {
			CheckAuth();
		}
	});
}]);