'use strict'

angular
	.module('mean101', ['ngRoute'])
	.config($routeProvider => 
		$routeProvider
			.when('/', {
				controller: 'MainCtrl',
				templateUrl: 'partials/main.html'
			})
			.when('/chat', {
				controller: 'ChatCtrl',
				templateUrl: 'partials/chat.html'
			})
	)
	.controller('MainCtrl', function($scope, $http) {
		$http
			.get('/api/title')
			.then(data => $scope.title = data.data.title)

	})
	.controller('ChatCtrl', function($scope, $http) {
		$scope.title = 'Chat room'
		$scope.messages = [
			{author: 'john', content:'hello'},
			{author: 'jill', content:'heya'},
			{author: 'john', content:'backatya'},
			{author: 'jill', content:'nou'},
			{author: 'scott', content:'get a room'},
		]
	})
