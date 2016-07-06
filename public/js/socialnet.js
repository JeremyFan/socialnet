define(['router'], function(router) {
	var initialize = function() {
		checkLogin(runApplication);
	}

	var checkLogin = function(callback){
		$.ajax({
			url:'/account/authenticated',
			type:'GET',
			success:function(){
				return callback(true);
			},
			error:function(){
				return callback(false);
			}
		});
	}

	var runApplication = function(authenticated){
		window.location.hash = authenticated ? 'index':'login';
		Backbone.history.start();		
	}

	return {
		initialize: initialize
	};
});