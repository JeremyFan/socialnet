module.exports = function(mongoose, nodemailer) {
	var crypto = require('crypto');

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
		}
	});

	var Account = mongoose.model('Account', AccountSchema);

	var registerCallback = function(err) {
		if (err)
			return console.log(err);

		return console.log('Account was created');
	}

	var changePassword = function(accountId, newPassword) {

	}

	var forgetPassword = function(email, resetPasswordUrl, callback) {

	}

	var login = function(email, password, callback) {

	}

	var register = function(email, password, name) {

	}
};