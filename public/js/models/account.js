define(['models/status-collection'], function(StatusCollection) {
	var Account = Backbone.Model.extend({
		// Specify a urlRoot if you're using a model outside of a collection, to enable the default url function to generate URLs based on the model id. "[urlRoot]/id"
		urlRoot: '/accounts',

		initialize: function() {
			this.status = new StatusCollection;
			this.status.url = '/accounts/' + this.id + '/status';

			this.activity = new StatusCollection;
			this.activity.url = '/accounts/' + this.id + '/activity';
		}
	});

	return Account;
});