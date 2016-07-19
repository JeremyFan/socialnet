define(function() {
	var Status = Backbone.Model.extend({
		urlRoot: '/account' + this.accountId + '/status'
	});

	return Status;
});