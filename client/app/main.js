'use strict'

angular
	.module('mean101', [])
	.controller('main', function($scope, $http) {

		$http.get('http://localhost:3000/api/title')
			.then(data => $scope.title = data.data.title)
			
	})
