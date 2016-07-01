var express = require('express');
var app = express();
var port = 8005;

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('index.pug', {
		layout: false
	});
});

app.listen(port);
console.log('server start at port:', port);