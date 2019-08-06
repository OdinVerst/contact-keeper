import React, { useReducer } from 'react';
import axios from 'axios';

import ContactContext from './contactContext';
import contactReducer from './contactReduser';
import {
	GET_CONTACTS,
	ADD_CONTACT,
	DELETE_CONTACT,
	CONTACT_ERROR,
	CLEAR_CONTACTS,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACT,
	CLEAR_FILTER
} from '../types';

const ContactState = props => {
	const initialState = {
		contacts: null,
		current: null,
		filtered: null,
		errors: null
	};

	const [state, distpatch] = useReducer(contactReducer, initialState);

	const getContacts = async () => {
		try {
			const res = await axios.get('/api/contacts');
			distpatch({ type: GET_CONTACTS, payload: res.data });
		} catch (err) {
			distpatch({ type: CONTACT_ERROR, payload: err.response.data.msg });
		}
	};

	const addContact = async contact => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const res = await axios.post('/api/contacts', contact, config);
			distpatch({ type: ADD_CONTACT, payload: res.data });
		} catch (err) {
			distpatch({ type: CONTACT_ERROR, payload: err.response.data.msg });
		}
	};

	const deleteContact = async id => {
		try {
			await axios.delete(`/api/contacts/${id}`);
			distpatch({ type: DELETE_CONTACT, payload: id });
		} catch (err) {
			distpatch({ type: CONTACT_ERROR, payload: err.response.data.msg });
		}
	};

	const contactsClear = () => {
		distpatch({ type: CLEAR_CONTACTS });
	};

	const updateContact = async contact => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			await axios.put(`/api/contacts/${contact._id}`, contact, config);
			distpatch({ type: UPDATE_CONTACT, payload: contact });
		} catch (err) {
			distpatch({ type: CONTACT_ERROR, payload: err.response.data.msg });
		}
	};

	const setCurrent = contact => {
		distpatch({ type: SET_CURRENT, payload: contact });
	};

	const clearCurrent = contact => {
		distpatch({ type: CLEAR_CURRENT, payload: contact });
	};

	const filterContact = text => {
		distpatch({ type: FILTER_CONTACT, payload: text });
	};

	const filterClear = () => {
		distpatch({ type: CLEAR_FILTER });
	};

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				errors: state.errors,
				addContact,
				deleteContact,
				updateContact,
				setCurrent,
				clearCurrent,
				filterContact,
				filterClear,
				getContacts,
				contactsClear
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
