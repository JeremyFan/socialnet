define(['views/index', 'views/register', 'views/login', 'views/forgotpassword', 'views/profile', 'models/account', 'models/status-collection'],
	function(IndexView, RegisterView, LoginView, ForgotPasswordView, ProfileView, Account, StatusCollection) {
		var SocialRouter = Backbone.Router.extend({
			currentView: null,

			routes: {
				'index': 'index',
				'register': 'register',
				'login': 'login',
				'forgotpassword': 'forgotpassword',
				'profile/:id': 'profile'
			},

			changeView: function(view) {
				if (null != this.currentView)
					this.currentView.undelegateEvents();

				this.currentView = view;
				this.currentView.render();
			},

			index: function() {
				// this.changeView(new IndexView);
				var statusCollection = new StatusCollection;
				statusCollection.url = '/accounts/me/activity';
				this.changeView(new IndexView({
					collection: statusCollection
				}));
			},

			register: function() {
				this.changeView(new RegisterView);
			},

			login: function() {
				this.changeView(new LoginView);
			},

			forgotpassword: function() {
				this.changeView(new ForgotPasswordView);
			},

			profile: function(id) {
				var model = new Account({
					id: id
				});
				this.changeView(new ProfileView({
					model: model
				}));
				model.fetch();
			}
		});

		return new SocialRouter;
	});