'use strict';

// http://testapi.metro.co.uk/twitter/articles.json?callback=ajaxfun

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

app.controller('ListCtrl', ['$scope', '$rootScope', '$routeParams', '$http', '$timeout', 'localStorageService', 'amMoment', function ($scope, $rootScope, $routeParams, $http, $timeout, localStorageService, amMoment) {

	var url;
		
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
	
	$scope.getData = function () {
		$http.jsonp(url).
			success(function (data, status) {
				$scope.links = data;
			});
	};

	// eg service twitterArticles
	// twitterArticles.getData().then(()=>

	// Function to replicate setInterval using $timeout service.
	$scope.interval = function () {
		$timeout(function () {
			$scope.getData();
			$scope.interval();
		}, 10000)
	};

	$scope.toggleDark = function() {
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
