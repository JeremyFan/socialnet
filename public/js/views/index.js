define(['socialnet-view', 'text!templates/index.html', 'views/status', 'models/status'],
	function(SocialNetView, indexTpl, StatusView, Status) {
		var IndexView = Backbone.View.extend({
			el: $('#content'),

			events: {
				'submit form': 'updateStatus'
			},

			initialize: function() {
				this.collection.on('add', this.addOneStatus, this);
				this.collection.on('reset', this.resetStatus, this);
			},

			addOneStatus: function(status) {
				var statusView = new StatusView({
					model: status
				});
				var statusHtml = statusView.render().el;
				$(statusHtml).prependTo('.status-list').hide().fadeIn('slow');
			},

			resetStatus: function(collection) {
				collection.each(_.bind(function(model) {
					this.addOneStatus(model);
				}, this));
			},

			updateStatus: function() {
				var statusText = this.$('input[name=status]').val();
				var statusCollection = this.collection;

				$.post('/accounts/me/status', {
					status: statusText
				}, function(data) {
					var statusModel = new Status({
						status: statusText
					});
					statusCollection.add(statusModel);
				});

				return false;
			},

			render: function() {
				this.$el.html(indexTpl);
			}
		});

		return IndexView;
	});