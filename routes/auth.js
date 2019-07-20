const experss = require('express');
const router = experss.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');

const User = require('../models/User');

//@route    GET api/auth
//@desc     Get logged in user
//@access   Private
router.get('/', (res, req) => {
	req.send(`Register user`);
});

//@route    POST api/auth
//@desc     Auth user & get token
//@access   Public
router.post(
	'/',
	[
		check('email', 'Please enter valid email').isEmail(),
		check('password', 'Password is required!').exists()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ msg: 'Invalid Credentials' });
			}

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res.status(400).json({ msg: 'Invalid Credentials' });
			}

			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{
					expiresIn: 36000
				},
				(err, token) => {
					if (err) {
						throw err;
					}
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('500 Server Error!');
		}
	}
);

module.exports = router;
