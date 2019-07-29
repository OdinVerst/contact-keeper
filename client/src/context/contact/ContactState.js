import React, { useReducer } from 'react';
import uuid from 'uuid';

import ContactContext from './contactContext';
import contactReducer from './contactReduser';
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACT,
	CLEAR_FILTER
} from '../types';

const ContactState = props => {
	const initialState = {
		contacts: [
			{
				id: 1,
				name: 'Jhon Doe',
				email: 'jhon@gmail.com',
				phone: '444-444-444',
				type: 'personal'
			},
			{
				id: 2,
				name: 'Brad Travis',
				email: 'brad@gmail.com',
				phone: '555-444-444',
				type: 'professional'
			},
			{
				id: 3,
				name: 'Tom Hard',
				email: 'tom@gmail.com',
				phone: '444-222-444',
				type: 'personal'
			}
		],
		current: null,
		filtered: null
	};

	const [state, distpatch] = useReducer(contactReducer, initialState);

	const addContact = contact => {
		contact.id = uuid.v4();
		distpatch({ type: ADD_CONTACT, payload: contact });
	};

	const deleteContact = id => {
		distpatch({ type: DELETE_CONTACT, payload: id });
	};

	const updateContact = contact => {
		distpatch({ type: UPDATE_CONTACT, payload: contact });
	};

	const setCurrent = contact => {
		distpatch({ type: SET_CURRENT, payload: contact });
	};

	const clearCurrent = contact => {
		distpatch({ type: CLEAR_CURRENT, payload: contact });
	};

	const filterContact = text => {
		distpatch({ type: FILTER_CONTACT, payload: text });
	}

	const filterClear = text => {
		distpatch({ type: CLEAR_FILTER });
	}

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				addContact,
				deleteContact,
				updateContact,
				setCurrent,
				clearCurrent,
				filterContact,
				filterClear
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
