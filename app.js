var express = require('express');
var app = express();
var port = 8005;

var nodemailer = require('nodemailer');
var mongoose = require('mongoose');
var session = require('express-session');
var bodyParser = require('body-parser');


var Account = require('./models/account')(mongoose, nodemailer);

mongoose.connect('mongodb://localhost/socialnet');

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(session({
	secret: 'crazy world',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

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

app.post('/register', function(req, res) {
	var name = req.body.name || 'noname',
		email = req.body.email || null,
		password = req.body.password || null;

	if (null == email || null == password) {
		res.sendStatus(400);
		return;
	}

	Account.register(email, password, name);
	res.sendStatus(200);
});

app.post('/login', function(req, res) {
	console.log('login request');

	var email = req.body.email || null,
		password = req.body.password || null;

	if (null == email || email.length < 1 || null == password || password.length < 1) {
		res.sendStatus(400);
		return;
	}

	Account.login(email, password, function(success) {
		if (!success) {
			res.sendStatus(401);
			return;
		}

		req.session.loggedIn = true;
		console.log('login was successful');
		res.sendStatus(200);
	});
});


app.listen(port);
console.log('server start at port:', port);