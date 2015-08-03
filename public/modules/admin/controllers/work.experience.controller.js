'use strict';

angular.module('admin').controller('ExperienceController', ['$scope', 'ExperienceService', function($scope, Experience) {
	
	$scope.addOneMore = function() {
		$scope.forms.push({})
	};

	function getScope() {
		Experience.query({lang: $scope.lang}, function(data) {
			if(data.length) {
				// as there is only one text info we send first element of fetched array
				$scope.forms = data;
			} else {
				$scope.forms = [{}];
			}
		});
	}

	getScope();

	$scope.save = function(form) {
		$scope.success = $scope.error = null;
		var id = form.form._id || '';

		Experience.save({lang: $scope.lang, id: id}, form.form, function() {
			$scope.success = 'added';
		}, function(error) {
			$scope.error = error;
		});
	};	

	$scope.remove = function(id) {
		$scope.success = $scope.error = null;

		Experience.remove({lang: $scope.lang, id: id}, 
			function() {
				var index = $scope.forms.indexOf(id);
				$scope.forms.splice(index, 1);
				$scope.success = 'removed';
			},
			function(error) {
				$scope.error = error;
			}
		)
	};

	$scope.$on('change:lang', getScope);
}]);