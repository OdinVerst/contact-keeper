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
import setAuthToken from '../../utils/setAuthToken';

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthentificated: null,
		loading: true,
		user: null,
		error: null
	};

	const [state, distpatch] = useReducer(authReducer, initialState);

	const loadUser = async () => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		try {
			const res = await axios.get('/api/auth');

			distpatch({ type: USER_LOADED, payload: res.data });
		} catch (err) {
			distpatch({ type: AUTH_ERROR });
		}
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
		loadUser();
	};

	const login = async formData => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const res = await axios.post('/api/auth', formData, config);
			distpatch({ type: LOGIN_SUCCESS, payload: res.data });
		} catch (err) {
			distpatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
		}
		loadUser();
	};

	const clearErrors = () => {
		distpatch({ type: CLEAR_ERROR });
	};

	const logout = () => {
		distpatch({ type: LOGOUT });
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthentificated: state.isAuthentificated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				login,
				register,
				clearErrors,
				loadUser,
				logout
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
