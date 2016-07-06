define(['text!templates/register.html'], function(registerTpl) {
	var registerView = Backbone.View.extend({
		el: $('#content'),

		events: {
			'submit form': 'register'
		},

		render: function() {
			this.$el.html(registerTpl);
		},

		register: function() {
			var data = {
				name: this.$('input[name="name"]').val(),
				email: this.$('input[name="email"]').val(),
				password: this.$('input[name="password"]').val()
			}

			$.ajax({
				url: '/register',
				type: 'POST',
				data: data,
				success: function(data) {
					console.log(data);
				}
			});

			return false;
		}
	});

	return registerView;
});