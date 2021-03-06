define(['socialnet-view', 'text!templates/profile.html', 'models/status', 'views/status'],
	function(SocialNetView, profileTpl, Status, StatusView) {
		var profileView = SocialNetView.extend({
			el: $('#content'),

			initialize: function() {
				this.model.on('change', this.render, this);
			},

			render: function() {
				var template = _.template(profileTpl);
				this.$el.html(template(this.model.toJSON()));

				var statusCollection = this.model.get('status');
				if (null != statusCollection) {
					_.each(statusCollection, function(statusJson) {
						var statusModel = new Status(statusJson);
						var statusView = new StatusView({
							model: statusModel
						});
						var statusHtml = statusView.render().el;
						$(statusHtml).prependTo('.status-list').hide().fadeIn('slow');
					});
				}
			}
		});

		return profileView;
	});