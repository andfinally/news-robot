'use strict';

var app = angular.module('newsRobotApp', ['ngRoute', 'LocalStorageModule', 'angularMoment']);

app.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'partials/main.html'
			}).
			when('/:category', {
				templateUrl: 'partials/list.html',
				controller : 'ListCtrl'
			});
	}
]);

app.run(function ($rootScope, $routeParams, localStorageService) {
	if (localStorageService.get('dark') === true) {
		$rootScope.dark = true;
	}
	$rootScope.toggleDark = function () {
		$rootScope.dark = !$rootScope.dark;
		if ($rootScope.dark) {
			localStorageService.set('dark', true);
		} else {
			localStorageService.remove('dark');
		}
	}
	$rootScope.getNavClass = function (path) {
		if ($routeParams.category === path) {
			return 'active';
		} else {
			return '';
		}
	}
});

// Controller refreshes list every 10 seconds

app.controller('ListCtrl', ['$scope', '$rootScope', '$routeParams', '$http', '$location', '$timeout', 'localStorageService', 'ApiService', 'amMoment', function ($scope, $rootScope, $routeParams, $http, $location, $timeout, localStorageService, ApiService, amMoment) {
	$scope.getData = function () {
		ApiService.request().then(function (response) {
			$scope.links = response.data;
		});
	}

	// Function to replicate setInterval using $timeout service.
	$scope.interval = function () {
		$timeout(function () {
			$scope.getData();
			$scope.interval();
		}, 10000)
	};

	// Get initial data and kick off the interval
	$scope.getData();
	$scope.interval();
}]);

app.factory('ApiService', ['$http', '$routeParams', function ($http, $routeParams) {
	return {
		request: function () {
			var url = '';
			switch ($routeParams.category) {
				case 'news':
					url = 'http://ec2-46-137-98-108.eu-west-1.compute.amazonaws.com/twitter/articles.json?callback=JSON_CALLBACK';
					break;
				case 'sport':
					url = 'http://ec2-54-195-125-39.eu-west-1.compute.amazonaws.com/twitter/articles.json?callback=JSON_CALLBACK';
					break;
				case 'entertainment':
					url = 'http://ec2-54-216-239-238.eu-west-1.compute.amazonaws.com/twitter/articles.json?callback=JSON_CALLBACK';
					break;
				case 'lifestyle':
					url = 'http://ec2-54-216-230-28.eu-west-1.compute.amazonaws.com/twitter/articles.json?callback=JSON_CALLBACK';
					break;
				default:
					url = 'http://api.metro.co.uk/twitter/articles.json?callback=JSON_CALLBACK';
			}
			return $http.jsonp(url);
		}
	}
}]);
