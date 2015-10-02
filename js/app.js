'use strict';

// http://testapi.metro.co.uk/twitter/articles.json?callback=ajaxfun

var app = angular.module('twitterServiceApp', ['ngRoute']);

app.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'partials/tweet-list.html',
				controller : 'TweetListCtrl'
			});
	}
]);

// Controller refreshes list every 10 seconds

app.controller('TweetListCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
	var url = 'http://testapi.metro.co.uk/twitter/articles.json?callback=JSON_CALLBACK';

	$scope.getData = function () {
		$http.jsonp(url).
			success(function (data, status) {
				$scope.tweets = data;
			});
	};

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
