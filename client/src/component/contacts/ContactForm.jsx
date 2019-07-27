import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
	const [contact, setContact] = useState({
		name: '',
		phone: '',
		email: '',
		type: 'personal'
	});

	const contactContext = useContext(ContactContext);

	const { addContact, updateContact, clearCurrent, current } = contactContext;

	useEffect(() => {
		if (current !== null) {
			setContact(current);
		} else {
			setContact({
				name: '',
				phone: '',
				email: '',
				type: 'personal'
			});
		}
	}, [contactContext, current]);

	const { name, phone, email, type } = contact;

	const onChange = e => {
		setContact({ ...contact, [e.target.name]: e.target.value });
	};

	const onSubmit = e => {
		e.preventDefault();
		if (current === null) {
			addContact(contact);
		} else {
			updateContact(contact);
		}
		clearAll();
	};

	const clearAll = () => {
		clearCurrent();
	};

	return (
		<form onSubmit={onSubmit}>
			<h2 className="text-primary">
				{current ? 'Edit Contact' : 'Add Contact'}
			</h2>
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
				<input
					type="submit"
					className="btn btn-primary btn-block"
					value={current ? 'Update Contact' : 'Add Contact'}
				/>
			</div>
			{current && (
				<div>
					<button className="btn btn-light btn-block" onClick={clearAll}>
						Cancel
					</button>
				</div>
			)}
		</form>
	);
};

export default ContactForm;
