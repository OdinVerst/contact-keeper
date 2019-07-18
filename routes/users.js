const experss = require('express');
const router = experss.Router();
const { check, validationResult } = require('express-validator');

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
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		res.send(req.body);
	}
);

module.exports = router;
