define(['socialnet-view', 'text!templates/status.html'], function(SocialNetView, statusTpl) {
	var StatusView = SocialNetView.extend({
		tagName: 'li',

		render: function() {
			this.$el.html(_.template(statusTpl, this.model.toJSON()));
			return this;
		}
	});

	return StatusView;
});