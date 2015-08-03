'use strict';

angular.module('sidebar').controller('SidebarController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http){

	function getScope() {
		$http.get('/api/admin/' + $scope.lang + '/profile').success(function(data) {
			// server send an array
			$scope.profile = data[0];
		});
	}

	getScope();

	$scope.$on('change:lang', getScope);

	
}]);