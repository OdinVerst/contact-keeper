import React, { Fragment, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../layout/Spiner';

const Contacts = () => {
	const contactContext = useContext(ContactContext);
	const { contacts, filtered, getContacts, loading } = contactContext;

	useEffect(() => {
		getContacts();
		// eslint-disable-next-line
	}, []);

	if (contacts !== null && contacts.length === 0 && !loading) {
		return <h4>Please add contacts</h4>;
	}

	return (
		<Fragment>
			{contacts !== null && !loading ? (
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
			) : (
				<Spinner />
			)}
		</Fragment>
	);
};

export default Contacts;
