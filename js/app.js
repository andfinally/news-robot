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

app.run(function ($rootScope, localStorageService) {
	if (localStorageService.get('dark') === true) {
		$rootScope.dark = true;
	}
});

// Controller refreshes list every 10 seconds

app.controller('ListCtrl', ['$scope', '$rootScope', '$routeParams', '$http', '$location', '$timeout', 'localStorageService', 'ApiService', function ($scope, $rootScope, $routeParams, $http, $location, $timeout, localStorageService, ApiService) {

	var category;

	switch ($routeParams.category) {
		case 'news':
			category = 'news';
			break;
		case 'sport':
			category = 'sport';
			break;
	}

	$rootScope.getNavClass = function (path) {
		if (category === path) {
			return 'active';
		} else {
			return '';
		}
	}

	$scope.getData = function () {
		ApiService.request().then(function (response) {
			$scope.links = response.data;
		});
	}

	// Function to replicate setInterval using $timeout service.
	$scope.interval = function () {
		$timeout(function () {
			$scope.interval();
		}, 10000)
	};

	$scope.toggleDark = function () {
		$rootScope.dark = !$rootScope.dark;
		if ($rootScope.dark) {
			localStorageService.set('dark', true);
		} else {
			localStorageService.remove('dark');
		}
	}

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
					url = 'http://api.metro.co.uk/twitter/articles.json?callback=JSON_CALLBACK';
					break;
				case 'sport':
					url = 'http://ec2-54-170-206-69.eu-west-1.compute.amazonaws.com/twitter/articles.json?callback=JSON_CALLBACK';
					break;
				default:
					url = 'http://api.metro.co.uk/twitter/articles.json?callback=JSON_CALLBACK';
			}
			return $http.jsonp(url);
		}
	}
}]);
