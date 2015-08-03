'use strict';

angular.module('admin').controller('PortfController', ['$scope', 'PortfolioService', 'Upload', function($scope, Portfolio, Upload) {
	$scope.portfolios = [{}];
	$scope.addOneMore = function() {
		$scope.portfolios.push({})
	};

	function getScope() {
		Portfolio.query({lang: $scope.lang}, function(data) {
			if(data.length) {
				// as there is only one text info we send first element of fetched array
				$scope.portfolios = data;
			} else {
				$scope.portfolios = [{}];
			}
		});
	}

	getScope();

	$scope.save = function(form) {
		$scope.success = $scope.error = null;
		var id = form.portfolio._id || '';
      Upload.upload({
        url: '/api/admin/' + $scope.lang + '/portfolio/' + id,
        method: 'POST',
        file: form.screenshot,
        fields: form.portfolio
      }).success(function(data) {
        $scope.success = 'added';
      })
      .error(function(error) {
        $scope.error = error;
      });
	};	

	$scope.remove = function(id) {
		$scope.success = $scope.error = null;

		Portfolio.remove({lang: $scope.lang, id: id}, 
			function() {
				var index = $scope.portfolios.indexOf(id);
				$scope.portfolio = $scope.portfolios.splice(index, 1);
				$scope.success = 'removed';
			},
			function(error) {
				$scope.error = error;
			}
		)
	};

	$scope.$on('change:lang', getScope);
}]);