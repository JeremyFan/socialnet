module.exports = function(mongoose, nodemailer) {
	var crypto = require('crypto');

	var Status = new mongoose.Schema({
		name: {
			type: String
		},
		status: {
			type: String
		}
	});

	var AccountSchema = new mongoose.Schema({
		email: {
			type: String,
			unique: true
		},
		password: {
			type: String
		},
		name: {
			type: String
		},
		birthday: {
			day: {
				type: Number,
				min: 1,
				max: 31,
				required: false
			},
			month: {
				type: Number,
				min: 1,
				max: 12,
				required: false
			},
			year: {
				type: Number
			}
		},
		photoUrl: {
			type: String
		},
		biography: {
			type: String
		},
		// 自己的状态
		status: [Status],
		// 朋友圈状态
		activity: [Status]
	});

	var Account = mongoose.model('Account', AccountSchema);


	/**
	 * 修改密码
	 * @param  {[type]} accountId   [description]
	 * @param  {[type]} newPassword [description]
	 * @return {[type]}             [description]
	 */
	var changePassword = function(accountId, newPassword) {
		var shaSum = crypto.createHash('sha256');
		shaSum.update(newPassword);

		var hashedPassword = shaSum.digest('hex');
		Account.update({
			_id: accountId
		}, {
			$set: {
				password: hashedPassword
			}
		}, {
			// 只更新存在的条目
			upsert: false
		}, function(err) {
			console.log('Change password done for account ' + accountId);
		});
	}

	/**
	 * 忘记密码
	 * @param  {[type]}   email            [description]
	 * @param  {[type]}   resetPasswordUrl [description]
	 * @param  {Function} callback         [description]
	 * @return {[type]}                    [description]
	 */
	var forgotPassword = function(email, resetPasswordUrl, callback) {
		var user = Account.findOne({
			email: email
		}, function(err, doc) {
			if (err) {
				callback(false);
			} else {
				var conf = require('../conf/mail');
				var transporter = nodemailer.createTransport(conf);

				resetPasswordUrl += '?account=' + doc._id;
				var mailOptions = {
					from: conf.auth.user,
					to: doc.email,
					subject: 'SocialNet Password Request',
					html: 'Click <a href="' + resetPasswordUrl + '" target="_blank">here</a> to reset your password: ' + '<a href="' + resetPasswordUrl + '" target="-blank">' + resetPasswordUrl + '</a>'
				}

				var mailCallback = function(err, info) {
					callback(!err);

					console.log(err);
					if (info) console.log(info.response);
				}


				transporter.sendMail(mailOptions, mailCallback);
			}
		});
	}

	/*
	 * 登录
	 * @param  {[type]}   email    邮箱
	 * @param  {[type]}   password 密码
	 * @param  {Function} callback 验证完登录的回调
	 * @return {[type]}            [description]
	 */
	var login = function(email, password, callback) {
		var shaSum = crypto.createHash('sha256');
		shaSum.update(password);

		Account.findOne({
			email: email,
			password: shaSum.digest('hex')
		}, function(err, doc) {
			callback(null != doc);
		});
	}

	/**
	 * 注册回调函数
	 * @param  {[type]} err [description]
	 * @return {[type]}     [description]
	 */
	var registerCallback = function(err) {
		if (err)
			return console.log(err);

		return console.log('Account was created');
	}

	/**
	 * 注册
	 * @param  {[type]} email    注册邮箱
	 * @param  {[type]} password 注册密码
	 * @param  {[type]} name     用户名
	 * @return {[type]}          [description]
	 */
	var register = function(email, password, name) {
		var shaSum = crypto.createHash('sha256');
		shaSum.update(password);

		console.log('Registering ' + email);

		var user = new Account({
			email: email,
			password: shaSum.digest('hex'),
			name: name
		});

		user.save(registerCallback);
		console.log('Save command was sent');
	}

	var findById = function(accountId, callback) {
		Account.findOne({
			_id: accountId
		}, function(err, doc) {
			callback(doc);
		});
	}

	return {
		findById: findById,
		login: login,
		register: register,
		changePassword: changePassword,
		forgotPassword: forgotPassword,
		Account: Account
	}
};