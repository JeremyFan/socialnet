var express = require('express');
var app = express();
var port = 8005;

var nodemailer = require('nodemailer');
var mongoose = require('mongoose');
var session = require('express-session');

var Account = require('./models/account')(mongoose, nodemailer);

mongoose.connect('mongodb://localhost/socialnet');

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(session({
	secret: 'crazy world',
	resave: true,
	saveUninitialized: true
}));

app.get('/', function(req, res) {
	res.render('index.pug', {
		layout: false
	});
});

app.get('/account/authenticated', function(req, res) {
	if (req.session.loggedIn)
		res.sendStatus(200);
	else
		res.sendStatus(401);
});

app.listen(port);
console.log('server start at port:', port);