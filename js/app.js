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

app.controller('TweetListCtrl', ['$scope', '$http', function ($scope, $http) {
	var url = 'http://testapi.metro.co.uk/twitter/articles.json?callback=JSON_CALLBACK';
	$http.jsonp(url).
		success(function (data, status) {
			$scope.tweets = data;
		});
}]);
