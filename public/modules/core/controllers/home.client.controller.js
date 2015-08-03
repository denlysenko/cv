'use strict';


angular.module('core').controller('HomeController', ['$scope', '$rootScope', 'Authentication', '$http', 
	function($scope, $rootScope, Authentication, $http) {

		function getScope() {
			$http.get('/api/admin/' + $scope.lang + '/about').success(function(data) {
				$scope.about = data[0];
			});

			$http.get('/api/admin/' + $scope.lang + '/education').success(function(data) {
				$scope.educations = data;
			});

			$http.get('/api/admin/' + $scope.lang + '/experience').success(function(data) {
				$scope.works = data;
			});
		}

		getScope();

		// This provides Authentication context.
		$scope.authentication = Authentication;
		
		$rootScope.setLang = function(lang) {
			$rootScope.lang = lang;
			$rootScope.$broadcast('change:lang');
			// cancel anchor default behaviour
			return false;
		};

		// update scope after lang changed
		$scope.$on('change:lang', getScope);
	}
]);