define(['text!templates/index.html'], function(indexTpl) {
	var indexView = Backbone.View.extend({
		el: $('#content'),

		render: function() {
			this.$el.html(indexTpl);
		}
	});

	return new indexView;
});