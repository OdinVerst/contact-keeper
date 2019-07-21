const experss = require('express');
const router = experss.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../midlleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact');

//@route    GET api/contacts
//@desc     Get all user contacts
//@access   Private
router.get('/', auth, async (req, res) => {
	try {
		const contacts = await Contact.find({ user: req.user.id }).sort({
			date: -1
		});
		res.send(contacts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('500 Server Error!');
	}
});

//@route    POST api/auth
//@desc     Add new contact
//@access   Private
router.post(
	'/',
	[
		auth,
		check('name', 'Name is required')
			.not()
			.isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, phone, type } = req.body;
		try {
			const newContact = new Contact({
				name,
				email,
				phone,
				type,
				user: req.user.id
			});

			const contact = await newContact.save();

			res.json(contact);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('500 Server Error!');
		}
	}
);

//@route    PUT api/auth/:id
//@desc     Update contact
//@access   Private
router.put('/:id', (res, req) => {
	req.send(`Update contact`);
});

//@route    DELETE api/auth/:id
//@desc     Delete contact
//@access   Private
router.delete('/:id', (res, req) => {
	req.send(`Delete contact`);
});

module.exports = router;
