import React, { useState, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
	const [contact, setContact] = useState({
		name: '',
		phone: '',
		email: '',
		type: 'personal'
	});

	const contactContext = useContext(ContactContext);

	const { name, phone, email, type } = contact;

	const onChange = e => {
		setContact({ ...contact, [e.target.name]: e.target.value });
	};

	const onSubmit = e => {
		e.preventDefault();
		contactContext.addContact(contact);
		setContact({
			name: '',
			phone: '',
			email: '',
			type: 'personal'
		});
	};

	return (
		<form onSubmit={onSubmit}>
			<h2 className="text-primary">Add Contact</h2>
			<input
				type="text"
				placeholder="Name"
				name="name"
				value={name}
				onChange={onChange}
			/>
			<input
				type="email"
				placeholder="Email"
				name="email"
				value={email}
				onChange={onChange}
			/>
			<input
				type="text"
				placeholder="Phone"
				name="phone"
				value={phone}
				onChange={onChange}
			/>
			<h5>Contact Type</h5>
			<label>
				<input
					type="radio"
					name="type"
					value="personal"
					checked={type === 'personal'}
					onChange={onChange}
				/>
				{' Personal '}
			</label>
			<label>
				<input
					type="radio"
					name="type"
					value="professional"
					checked={type === 'professional'}
					onChange={onChange}
				/>
				{' Professional '}
			</label>
			<div>
				<button type="submit" className="btn btn-primary btn-block">
					Add contact
				</button>
			</div>
		</form>
	);
};

export default ContactForm;
