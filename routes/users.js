const experss = require('express');
const router = experss.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

//@route    POST api/users
//@desc     Registr a user
//@access   Public
router.post(
	'/',
	[
		check('name', 'Name is requiered!')
			.not()
			.isEmpty(),
		check('email', 'Email include valid email').isEmail(),
		check('password', 'Please enter valid password').isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ msg: 'User alredy exists' });
			}

			user = new User({
				name,
				email,
				password
			});

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			res.send('User saved!');
		} catch (err) {
			console.error(err.message);
			res.status(500).send('500 Server Error!');
		}
	}
);

module.exports = router;
