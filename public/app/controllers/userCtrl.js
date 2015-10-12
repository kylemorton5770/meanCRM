console.log("initializing user Controller!")

angular.module ('userCtrl', ['userService', 'postService'])

//Inject USER factory
.controller ('userController', function (User, Post) {
	
	
	
	var vm = this;
	vm.processing = true;
	vm.processingPosts = true;
	
	vm.loadUsers = function(){
	//get all users from the userFactory
	User.all()
		.success(function(data) { //on success, bind data to controller
			vm.processing = false;
			vm.users = data;
		});
	};
	
	//used to retrieve all user posts in database
	vm.loadPosts = function(){
		Post.all()
			.success(function(data) {
				console.log("DATA: " + JSON.stringify(data));
				vm.processingPosts = false;
				vm.posts = data;
			});
	};
	
	//load users, posts on init
	vm.loadUsers();
	vm.loadPosts();
	
	vm.deleteUser = function(id) {
		vm.processing = true;
		
		//call User Factory to delete user
		User.delete(id)
			.success(function(data) {
				
				//user was deleted successfully
				//refetch user's list
				vm.loadUsers();
				
			});
		
	};
	

	
	
})

//controller only used for creating new users
.controller('userCreateController', function(User) {
	
	var vm = this;
	vm.type = "create";
	
	//create user
	vm.saveUser = function() {
		vm.processing = true;
		vm.message = '';
		
		console.log("Creating new user!");
		
		//use create function of User service
		//pass the userData object that contains the 
		//3 fields already from the form input binding
		User.create(vm.userData)
			.success(function(data) {
				
				console.log("Created New User!");
				
				//set proc, userData to defaults
				vm.processing = false;
				vm.userData = {};
				
				//display message returned by API
				vm.message = data.message;
				
			});	
		
	};
	
})


//$routeParams used to get id from the URL
.controller('userEditController', function($routeParams, User) {
	
	var vm = this;
	
	vm.type = "edit";
	
	//initialize form by getting user info for user with id passed in URL
	User.get($routeParams.user_id)
		.success(function(data){
			vm.userData = data; //initialize form with user data
		});
		
	vm.saveUser = function() {
		vm.processing = true;
		vm.message = '';
		
		//call User factory to update user in backend
		User.update($routeParams.user_id, vm.userData)
			.success(function(data) {
				// console.log("Called update with: " + $routeParams.user_id + "\n" + JSON.stringify(vm.userData) 
				// 				+ "\n" + JSON.stringify(data));
				
				vm.processing = false;
				vm.userData = {};
				vm.message = data.message;
			});
		
			
	};
	
});


