'use strict';

angular.module('admin').controller('AboutController', ['$scope', 'AboutService', function($scope, About) {

	About.query({lang: $scope.lang}, function(data) {
		if(data.length) {
			// as there is only one text info we send first element of fetched array
			$scope.about = data[0];
		} else {
			$scope.about = {};
		}
	});

	$scope.save = function() {
		$scope.success = $scope.error = null;
		About.save({lang: $scope.lang}, $scope.about, function(data) {
			$scope.success = 'added';
			$scope.about = data;
		}, function(error) {
			$scope.error = error;
		});
	};	

	$scope.remove = function(id) {
		$scope.success = $scope.error = null;

		About.remove({lang: $scope.lang, id: id}, 
			function() {
				$scope.about = {};
				$scope.success = 'removed';
			},
			function(error) {
				$scope.error = error;
			}
		)
	};
}]);