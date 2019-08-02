import React, { useReducer } from 'react';
import axios from 'axios';

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

	const loadUser = () => {
		console.log('User load');
	};

	const register = async formData => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const res = await axios.post('/api/users', formData, config);
			distpatch({ type: REGISTER_SUCCESS, payload: res.data });
		} catch (err) {
			distpatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
		}
	};

	const clearErrors = () => {
		distpatch({ type: CLEAR_ERROR });
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthentificated: state.isAuthentificated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				register,
				clearErrors
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
