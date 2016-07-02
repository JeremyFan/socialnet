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

	var user = new Account({
		mail: 'vdx14@126.com',
		password: '123',
		name: 'jeremy',
		photoUrl: 'http://www.baidu.com'
	});

	user.save();

	console.log('saved');
};