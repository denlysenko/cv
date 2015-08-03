'use strict';

angular.module('portfolio').controller('PortfolioController', ['$scope', '$http', function($scope, $http) {
	function getScope() {
		$http.get('/api/admin/' + $scope.lang + '/portfolio').success(function(data) {
			$scope.portfolio = data;
			$scope.totalItems = $scope.portfolio.length;
			$scope.itemsPerPage = 1;
			$scope.currentPage = 1;

			$scope.$watch('currentPage + itemsPerPage', function() {
	      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
	        end = begin + $scope.itemsPerPage;

	      $scope.documents = $scope.portfolio.slice(begin, end);
	    });
		});
	}
	
	getScope();
	$scope.$on('change:lang', getScope);
}]);