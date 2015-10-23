'use strict';

// http://testapi.metro.co.uk/twitter/articles.json?callback=ajaxfun

var app = angular.module('twitterServiceApp', ['ngRoute', 'LocalStorageModule', 'angularMoment']);

app.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'partials/tweet-list.html',
				controller : 'TweetListCtrl'
			})
	}
]);

app.run(function ($rootScope, localStorageService) {
	if (localStorageService.get('dark') === true) {
		$rootScope.dark = true;
	}
});

// Controller refreshes list every 10 seconds

app.controller('TweetListCtrl', ['$scope', '$rootScope', '$http', '$timeout', 'localStorageService', 'amMoment', function ($scope, $rootScope, $http, $timeout, localStorageService, amMoment) {
	var url = 'http://api.metro.co.uk/twitter/articles.json?callback=JSON_CALLBACK';

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
