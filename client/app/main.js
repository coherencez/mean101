'use strict'

const socket = io()
socket.on('connect', () => console.log(`socket connected`, socket))
socket.on('disconnect', () => console.log(`disconnected`))
angular
	.module('mean101', ['ngRoute'])
	.config(($routeProvider, $locationProvider) => {
		$routeProvider
			.when('/', {
				controller: 'MainCtrl',
				templateUrl: 'partials/main.html'
			})
			.when('/chat', {
				controller: 'ChatCtrl',
				templateUrl: 'partials/chat.html'
			})

			$locationProvider.html5Mode({
				enabled: true,
				requireBase: false,
			})
	})
	.controller('MainCtrl', function($scope, $http) {
		$http
			.get('/api/title')
			.then(({data: {title}}) => $scope.title = title)
			.catch(console.error)

	})
	.controller('ChatCtrl', function($scope, $http, $route) {
		$scope.title = 'Chat room'

		$scope.sendMessage = () => {
			const msg = {
					author: $scope.author,
					content: $scope.content
				}

		  if(socket.connected) {
				return socket.emit('postMessage', msg)
			}
			$http
				.post('/api/messages', msg)
				.then(() => $scope.messages.push(msg))
				.catch(console.error)
		}

		$http
			.get('/api/messages')
			.then(({data: {messages}}) => $scope.messages = messages)
			.catch(console.error)

		socket.on('newMessage', msg => {
			$scope.messages.push(msg)
			$scope.apply()
		})
	})
