define(['text!templates/forgotpassword.html'], function(forgotpasswordTpl) {
	var forgotpasswordView = Backbone.View.extend({
		el: $('#content'),

		events: {
			'submit form': 'forgotpassword'
		},

		render: function() {
			this.$el.html(forgotpasswordTpl);
		},

		forgotpassword: function() {
			var data = {
				email: this.$('input[name="email"]')
			}
			$.ajax({
				url: '/forgotpassword',
				type: 'POST',
				data: data,
				success: function(data) {
					console.log(data);
				}
			});

			return false;
		}
	});

	return forgotpasswordView;
});