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

	Account.login(email, password, function(doc) {
		if (doc == null) {
			res.sendStatus(401);
			return;
		}

		req.session.loggedIn = true;
		req.session.accountId = doc._id;

		console.log('login was successful');
		res.sendStatus(200);
	});
});

app.post('/forgotpassword', function(req, res) {
	var hostname = req.headers.host;
	var resetPasswordUrl = 'http://' + hostname + '/resetPassword';
	var email = req.body.email || null;
	if (null == email || email.length < 1) {
		res.sendStatus(400);
		return;
	}

	Account.forgotPassword(email, resetPasswordUrl, function(success) {
		var statusCode = success ? 200 : 404;
		res.sendStatus(statusCode);
	});
});

app.get('/resetPassword', function(req, res) {
	var accountId = req.query.account || null;

	res.render('resetpassword.pug', {
		accountId: accountId
	});
});

app.post('/resetPassword', function(req, res) {
	var accountId = req.body.accountId || null;
	var password = req.body.password || null;

	if (null != accountId && null != password)
		Account.changePassword(accountId, password);

	res.render('resetpassword-success.pug');
});

app.get('/accounts/:id', function(req, res) {
	var accountId = req.params.id == 'me' ? req.session.accountId : req.params.id;

	// FIXME: use findById
	Account.findById({
		_id: accountId
	}, function(account) {
		res.send(account);
	});
});

app.get('/accounts/:id/status', function(req, res) {
	var accountId = req.params.id == 'me' ? req.session.accountId : req.params.id;
	Account.findById(accountId, function(account) {
		res.send(account.status);
	});
});

app.post('/accounts/:id/status', function(req, res) {
	var accountId = req.params.id == 'me' ? req.session.accountId : req.params.id;

	Account.findById(accountId, function(account) {
		var status = {
			name: account.name,
			status: req.body.status || ''
		};
		account.status.push(status);

		account.activity.push(status);
		account.save(function(err) {
			if (err)
				console.log('Error saving account: ' + err);
			else
				res.send(status);
		});
	});
});

app.get('/accounts/:id/activity', function(req, res) {
	var accountId = req.params.id == 'me' ? req.session.accountId : req.params.id;
	Account.findById(accountId, function(account) {
		res.send(account.activity);
	});
});

app.listen(port);
console.log('server start at port:', port);