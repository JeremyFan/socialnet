define(['views/index', 'views/register', 'views/login', 'views/forgotpassword'], function(IndexView, RegisterView, LoginView, ForgotPasswordView) {
	var SocialRouter = Backbone.Router.extend({
		currentView: null,

		routes: {
			'index': 'index',
			'register': 'register',
			'login': 'login',
			'forgotpassword': 'forgotpassword'
		},

		changeView: function(view) {
			if (null != this.currentView)
				this.currentView.undelegateEvents();

			this.currentView = view;
			this.currentView.render();
		},

		index: function() {
			this.changeView(new IndexView);
		},

		register: function() {
			this.changeView(new RegisterView);
		},

		login: function() {
			this.changeView(new LoginView);
		},

		forgotpassword: function() {
			this.changeView(new ForgotPasswordView);
		}
	});

	return new SocialRouter;
});