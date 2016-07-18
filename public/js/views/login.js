define(['text!templates/login.html'], function(loginTpl) {
	var loginView = Backbone.View.extend({
		el: $('#content'),

		events: {
			"submit form": 'login'
		},

		render: function() {
			this.$el.html(loginTpl);
			this.$('#error').hide();
		},

		login: function() {
			var data = {
				email: this.$('input[name="email"]').val(),
				password: this.$('input[name="password"]').val()
			}
			var self = this;

			$.ajax({
				url: '/login',
				type: 'POST',
				data: data,
				success: function(data) {
					console.log(data);
					// todo: maybe handle session?
					// handle session in node
					
					self.$('#error').text('Unable to login').slideUp();
				},
				error: function() {
					self.$('#error').text('Unable to login').slideDown();
				}
			});

			return false;
		}
	});

	return loginView;
});