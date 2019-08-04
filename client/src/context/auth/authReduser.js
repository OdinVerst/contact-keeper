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
		case USER_LOADED:
			return {
				...state,
				isAuthentificated: true,
				loading: false,
				user: action.payload
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthentificated: true,
				loading: false
			};
		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				user: null,
				isAuthentificated: false,
				loading: false,
				error: action.payload
			};
		case CLEAR_ERROR:
			return { ...state, error: null };
		default:
			return state;
	}
};
