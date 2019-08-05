import React, { useReducer } from 'react';
import axios from 'axios';

import ContactContext from './contactContext';
import contactReducer from './contactReduser';
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	CONTACT_ERROR,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACT,
	CLEAR_FILTER
} from '../types';

const ContactState = props => {
	const initialState = {
		contacts: [],
		current: null,
		filtered: null,
		errors: null
	};

	const [state, distpatch] = useReducer(contactReducer, initialState);

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
				filterClear
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
