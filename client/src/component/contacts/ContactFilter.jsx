import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
	const contactContext = useContext(ContactContext);
	const text = useRef('');

	const { filterContact, filterClear, filtered } = contactContext;

	useEffect(() => {
		if (filtered === null) {
			text.current.value = '';
		}
	});

	const onChange = e => {
		if (text.current.value !== '') {
			filterContact(e.target.value);
		} else {
			filterClear();
		}
	};

	return (
		<form>
			<input
				ref={text}
				type="text"
				onChange={onChange}
				placeholder="Contact Filter"
			/>
		</form>
	);
};

export default ContactFilter;
