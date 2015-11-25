// function TodoCtrl($scope) {
//     $scope.todos = [
//         {text:'Learn AngularJS', done:false},
//         {text:'Build an app', done:false}
//     ];

//     $scope.getTotalTodos = function () {
//         return $scope.todos.length;
//     };

//     $scope.clearCompleted = function () {
//         $scope.todos = _.filter($scope.todos, function(todo){
//             return !todo.done;
//         });
//     };

//     $scope.addTodo = function () {
//         $scope.todos.push({text:$scope.formTodoText, done:false});
//         $scope.formTodoText = '';
//     };



// }

// angular.callbacks._0(responseData);


var Utils = function(){

	function getParams(str){

		var params = "?" + Object.keys(str).map(function(prop) {
  			return [prop, str[prop]].map(encodeURIComponent).join("=");
		}).join("&");

		return params;
	}

	return {
		getParams : getParams
	};
}();


function FeedApp($scope, $http){

	$scope.test = 'test';


	// var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&tags=soccer&api_key=e8a09d2557f2dc06df1301a8fa31ca07&format=json&jsoncallback=JSON_CALLBACK';


	var params = {
		'method': 'flickr.photos.search',
		'tags': 'soccer',
		'per_page':'10',
		'api_key': 'e8a09d2557f2dc06df1301a8fa31ca07',
		'format': 'json',
		'jsoncallback': 'JSON_CALLBACK'
	}


	var url = 'https://api.flickr.com/services/rest/' + Utils.getParams(params);

    $http.jsonp(url)
    	.success(function(response) {


			console.info(response);


			$scope.photos = response.photos.photo || [];
    	});


}


function responseData(response){

	




}

// var app = angular.module('myApp', []);


// app.controller('FeedApp', function($scope, $http) {


	


// });