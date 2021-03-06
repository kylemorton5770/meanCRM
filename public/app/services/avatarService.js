//used to upload, retrieve files from node js backend
angular.module('avatarService', []) 

	//inject $http for API calls
	.factory('Avatar', function($http){
		
		var avatarFactory = {};
		
		avatarFactory.upload = function(file){
			return $http.post('/api/avatar', file);
		};
		
		avatarFactory.find = function(userId){
			return $http.get('/api/avatar/' + userId);
		};
		
		return avatarFactory;
	});