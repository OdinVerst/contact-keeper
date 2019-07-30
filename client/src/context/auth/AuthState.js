import React, { useReducer } from 'react';

import AuthContext from './authContext';
import authReducer from './authReduser';
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

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthentificated: null,
		loading: true,
		user: null,
		error: null
	};

	const [state, distpatch] = useReducer(authReducer, initialState);

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthentificated: state.isAuthentificated,
				loading: state.loading,
				user: state.user,
				error: state.error
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
