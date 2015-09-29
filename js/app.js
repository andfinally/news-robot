'use strict'

// http://testapi.metro.co.uk/twitter/articles.json?callback=ajaxfun

var app = angular.module('twitterServiceApp', []);

app.controller('TweetListCtrl', function ($scope, $http) {
	$http.get('js/test-data.json').success(function(data){
		$scope.tweets = data;
	});
});
