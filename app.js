
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





var app = angular.module('myApp', [])

.controller('myCtrl', ['$scope', '$http', function ($scope, $http) {

	$scope.page = 0;
	$scope.photos = [];

	$scope.getResults = function(){

		$scope.page = $scope.page + 1;

		var params = {
			'method': 'flickr.photos.search',
			'page' : $scope.page,
			'tags': 'soccer',
			'text': 'soccer',
			'per_page':'10',
			'extras': 'url_o, url_s, url_n, url_z',
			'media': 'photos',
			'api_key': 'e8a09d2557f2dc06df1301a8fa31ca07',
			'format': 'json',
			'jsoncallback': 'JSON_CALLBACK'
		}


		var url = 'https://api.flickr.com/services/rest/' + Utils.getParams(params);

		$http.jsonp(url)
			.success(function(response) {

				var locPhotos = response.photos.photo || [];

				// console.log(locPhotos);

				$scope.photos = $scope.photos.concat(locPhotos);

		});
	};

    $scope.showOverlay = function(imgsrc){

    	var image = $('#overlay-image')[0];

    	// console.info('show overlay');
    	// console.info(imgsrc);
    	
    	image.src = imgsrc;
    	overlayLib.openOverlay('#overlay');

    };

    $scope.getResults();	


}])


.directive('whenScrolled', function() {
    return function(scope, elm, attr) {

        var elem = elm[0],
        	doc = elem.ownerDocument,
        	win = doc.defaultView || doc.parentWindow;
        

		$(window).scroll(function(){
			if  ($(window).scrollTop() == $(document).height() - $(window).height()){

			   	// console.info('get more!');
				scope.$apply(attr.whenScrolled);
			}
		}); 

    };
});


// bc of the infinite scroll, make sure we start from the top
$(window).unload(function() {
  this.scroll(0,0);
});
