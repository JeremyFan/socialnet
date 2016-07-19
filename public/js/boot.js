require.config({
	paths: {
		jquery: '/js/bower_components/jquery/dist/jquery',
		underscore: '/js/bower_components/underscore/underscore',
		backbone: '/js/bower_components/backbone/backbone',
		text: '/js/bower_components/text/text',
		templates: '../templates',

		'socialnet-view':'/js/socialnet-view'
	},

	shim: {
		'backbone': ['underscore', 'jquery'],
		'socialnet': ['backbone']
	}
});

require(['socialnet'], function(SocialNet) {
	SocialNet.initialize();
});