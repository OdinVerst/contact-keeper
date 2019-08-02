import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERROR
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case REGISTER_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				...action.payload,
				isAutheticated: true,
				loading: false
			};
		case REGISTER_FAIL:
			console.log('Error');
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				user: null,
				isAutheticated: false,
				loading: false,
				error: action.payload
			};
		case CLEAR_ERROR:
			return { ...state, error: null };
		default:
			return state;
	}
};
