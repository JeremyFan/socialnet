var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('index.pug', {
		layout: false
	});
});

app.listen(8005);