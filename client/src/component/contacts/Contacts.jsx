import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
	const contactContext = useContext(ContactContext);
	const { contacts, filtered } = contactContext;
	if (contacts.length === 0) {
		return <h4>Please add contacts</h4>;
	}

	return (
		<Fragment>
			{filtered !== null
				? filtered.map(item => <ContactItem key={item.id} contact={item} />)
				: contacts.map(item => <ContactItem key={item.id} contact={item} />)}
		</Fragment>
	);
};

export default Contacts;
