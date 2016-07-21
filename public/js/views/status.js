define(['socialnet-view', 'text!templates/status.html'], function(SocialNetView, statusTpl) {
	var StatusView = SocialNetView.extend({
		tagName: 'li',

		render: function() {
			var template = _.template(statusTpl);
			this.$el.html(template(this.model.toJSON()));
			return this;
		}
	});

	return StatusView;
});