const experss = require('express');
const router = experss.Router();

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
router.post('/', (res, req) => {
	req.send(`Add new contact`);
});

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
