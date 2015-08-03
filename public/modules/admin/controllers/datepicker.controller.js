'use strict';

angular.module('admin').controller('DatePickerController', ['$scope', function($scope) {
	$scope.info = {};
	$scope.info.from = new Date();
	$scope.info.to = new Date();

  $scope.clear = function () {
    $scope.dt = null;
  };

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

   $scope.format = 'dd-MM-yyyy';
}]);