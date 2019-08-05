import {
	GET_CONTACTS,
	ADD_CONTACT,
	DELETE_CONTACT,
	CONTACT_ERROR,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACT,
	CLEAR_FILTER,
	CLEAR_CONTACTS
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_CONTACTS:
			return { ...state, contacts: action.payload, loading: false };
		case ADD_CONTACT:
			return {
				...state,
				contacts: [...state.contacts, action.payload],
				loading: false
			};
		case DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter(
					contact => contact.id !== action.payload
				),
				loading: false
			};
		case CONTACT_ERROR:
			return { ...state, errros: action.payload, loading: false };
		case UPDATE_CONTACT:
			return {
				...state,
				contacts: state.contacts.map(contact =>
					contact.id !== action.payload.id ? contact : action.payload
				),
				loading: false
			};
		case CLEAR_CONTACTS:
			return {
				...state,
				contact: null,
				filter: null,
				current: null,
				errros: null
			};
		case SET_CURRENT:
			return { ...state, current: action.payload };
		case CLEAR_CURRENT:
			return { ...state, current: null };
		case FILTER_CONTACT:
			return {
				...state,
				filtered: state.contacts.filter(contact => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return contact.name.match(regex) || contact.email.match(regex);
				})
			};
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null
			};
		default:
			return state;
	}
};
