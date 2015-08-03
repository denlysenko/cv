'use strict';

angular.module('admin').controller('ProfileController', ['$scope', 'ProfileService', 'Upload', function($scope, Profile, Upload) {

	function getScope() {
		Profile.query({lang: $scope.lang}, function(data) {
			if(data.length) {
				// as there is only one text info we send first element of fetched array
				$scope.profile = data[0];
			} else {
				$scope.profile = {};
			}
		});
	}
	
	getScope();

	$scope.$on('change:lang', function() {
		getScope();
	});

	$scope.save = function(form) {
		$scope.success = $scope.error = null;
      Upload.upload({
        url: '/api/admin/' + $scope.lang + '/profile/',
        method: 'POST',
        file: $scope.photo,
        fields: form.profile
      }).success(function(data) {
        // clear form's fields
        $scope.profile = data;
        $scope.success = 'added';
      })
      .error(function(error) {
        $scope.error = error;
      });
	};	

	$scope.remove = function(id) {
		$scope.success = $scope.error = null;

		Profile.remove({lang: $scope.lang, id: id}, 
			function() {
				$scope.profile = {};
				$scope.success = 'removed';
			},
			function(error) {
				$scope.error = error;
			}
		)
	};
}]);