import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alerts/alertsContext';
import AuthContext from '../../context/auth/authContext';

const Login = props => {
	const alertsContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	const [user, setUser] = useState({
		email: '',
		password: ''
	});

	const { email, password } = user;
	const { error, clearErrors, login, isAuthentificated } = authContext;
	const { setAlert } = alertsContext;

	useEffect(() => {
		if (isAuthentificated) {
			props.history.push('/');
		}
		if (error === 'Invalid Credentials') {
			setAlert(error, 'danger');
			clearErrors();
		}
		// eslint-disable-next-line
	}, [error, isAuthentificated, props.history]);

	const onChange = e => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const onSubmit = e => {
		e.preventDefault();
		if (email === '' || password === '') {
			setAlert('Please fill all filleds', 'danger');
		} else {
			login({
				email,
				password
			});
		}
	};

	return (
		<div className="form-container">
			<h1>
				Account <span className="text-primary">Login</span>
			</h1>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="name">Email</label>
					<input type="email" name="email" value={email} onChange={onChange} />
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						value={password}
						onChange={onChange}
					/>
				</div>
				<input
					type="submit"
					value="Login"
					className="btn btn-primary btn-block"
				/>
			</form>
		</div>
	);
};

export default Login;
