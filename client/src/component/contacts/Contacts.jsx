import React, { Fragment, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Contacts = () => {
	const contactContext = useContext(ContactContext);

	useEffect(() => {
		contactContext.getContacts();
		// eslint-disable-next-line
	}, []);

	const { contacts, filtered } = contactContext;
	if (contacts.length === 0) {
		return <h4>Please add contacts</h4>;
	}

	return (
		<Fragment>
			<TransitionGroup>
				{filtered !== null
					? filtered.map(item => (
							<CSSTransition key={item._id} timeout={500} classNames="item">
								<ContactItem contact={item} />
							</CSSTransition>
					  ))
					: contacts.map(item => (
							<CSSTransition key={item._id} timeout={500} classNames="item">
								<ContactItem contact={item} />
							</CSSTransition>
					  ))}
			</TransitionGroup>
		</Fragment>
	);
};

export default Contacts;
