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


// var FeedApp = function($scope, $http){

// 	$scope.test = 'test';

// 	$scope.page = 1;
// 	$scope.photos = [];



// 		$scope.nextPage = function(){

// 			$scope.page = $scope.page+1;
// 			$scope.getResults();

// 		};


// 		$scope.prevPage = function(){

// 			$scope.page = $scope.page-1;
// 			$scope.getResults();

// 		};



//     	$scope.getResults = function(){


//     		var params = {
// 				'method': 'flickr.photos.search',
// 				'page' : $scope.page,
// 				// 'tags': 'soccer',
// 				'text': 'soccer',
// 				'per_page':'10',
// 				'extras': 'url_o, url_s, url_n',
// 				'media': 'photos',
// 				'api_key': 'e8a09d2557f2dc06df1301a8fa31ca07',
// 				'format': 'json',
// 				'jsoncallback': 'JSON_CALLBACK'
// 			}


//     		var url = 'https://api.flickr.com/services/rest/' + Utils.getParams(params);

//     		$http.jsonp(url)
//     			.success(function(response) {


// 					// console.info(response);


// 					var locPhotos = response.photos.photo || [];

// 					console.log(locPhotos);

// 					$scope.photos = $scope.photos.concat(locPhotos);

// 					// console.dir($scope.photos);

//     		});
//     	};

//     $scope.getResults();

// }




// $(window).scroll(function(){
// 	if  ($(window).scrollTop() == $(document).height() - $(window).height()){
//     	// run our call for pagination

//     	// console.info('lets make');
//     	// FeedApp.getResults();
//     }
// }); 


var app = angular.module('myApp', [])

.controller('myCtrl', ['$scope', '$http', function ($scope, $http) {


// app.controller('FeedCtrl', function($scope, $http) {


	$scope.test = 'test';

	$scope.page = 0;
	$scope.photos = [];


	// var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&tags=soccer&api_key=e8a09d2557f2dc06df1301a8fa31ca07&format=json&jsoncallback=JSON_CALLBACK';

		$scope.nextPage = function(){

			$scope.page = $scope.page+1;
			$scope.getResults();

		};


		$scope.prevPage = function(){

			$scope.page = $scope.page-1;
			$scope.getResults();

		};



    	$scope.getResults = function(){

    		$scope.page = $scope.page + 1;

    		var params = {
				'method': 'flickr.photos.search',
				'page' : $scope.page,
				// 'tags': 'soccer',
				'text': 'soccer',
				'per_page':'10',
				'extras': 'url_o, url_s, url_n',
				'media': 'photos',
				'api_key': 'e8a09d2557f2dc06df1301a8fa31ca07',
				'format': 'json',
				'jsoncallback': 'JSON_CALLBACK'
			}


    		var url = 'https://api.flickr.com/services/rest/' + Utils.getParams(params);

    		$http.jsonp(url)
    			.success(function(response) {


					// console.info(response);


					var locPhotos = response.photos.photo || [];

					console.log(locPhotos);

					$scope.photos = $scope.photos.concat(locPhotos);

					// console.dir($scope.photos);

    		});
    	};

    $scope.getResults();	


}])


.directive('whenScrolled', function() {
    return function(scope, elm, attr) {

    	console.info('when scrolled');

        var elem = elm[0];

        var doc = elem.ownerDocument;
		var win = doc.defaultView || doc.parentWindow;
        
        // elm.bind('scroll', function() {

        // 	console.info('scroll');

        // 	console.info(raw.scrollTop + raw.offsetHeight);

        //     if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
        //         scope.$apply(attr.whenScrolled);
        //     }
        // });

		$(window).scroll(function(){
			if  ($(window).scrollTop() == $(document).height() - $(window).height()){
			    	// run our call for pagination

			    	console.info('lets make');
			    	// FeedApp.getResults();
			    	 scope.$apply(attr.whenScrolled);
			}
		}); 

    };
});

