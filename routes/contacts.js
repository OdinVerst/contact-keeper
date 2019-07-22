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
router.put('/:id', auth, async (req, res) => {
	const { name, email, phone, type } = req.body;

	const contactFileds = {};
	if (name) contactFileds.name = name;
	if (email) contactFileds.email = email;
	if (phone) contactFileds.phone = phone;
	if (type) contactFileds.type = type;

	try {
		let contact = await Contact.findById(req.params.id);

		if (!contact) res.status(404).json({ msg: 'Contact not fount' });

		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Not authorized' });
		}

		contact = await Contact.findByIdAndUpdate(
			req.params.id,
			{ $set: contactFileds },
			{ new: true }
		);

		res.json(contact);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('500 Server Error!');
	}
});

//@route    DELETE api/auth/:id
//@desc     Delete contact
//@access   Private
router.delete('/:id', auth, async (req, res) => {
	try {
		let contact = await Contact.findById(req.params.id);

		if (!contact) res.status(404).json({ msg: 'Contact not fount' });

		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Not authorized' });
		}

		await Contact.findByIdAndRemove(req.param.id);

		res.json({ msg: 'Contact deleted' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('500 Server Error!');
	}
});

module.exports = router;
