import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alerts/alertsContext';
import AuthContext from '../../context/auth/authContext';

const Register = () => {
	const alertsContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	useEffect(() => {
		if (authContext.error === 'User alredy exists') {
			alertsContext.setAlert(authContext.error, 'danger');
			authContext.clearErrors();
		}
	}, [alertsContext, authContext, authContext.error]);

	const { name, email, password, password2 } = user;

	const onChange = e => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const onSubmit = e => {
		e.preventDefault();
		if (name === '' || email === '' || password === '' || password2 === '') {
			alertsContext.setAlert('Please enter all fileds', 'danger');
		} else if (password !== password2) {
			alertsContext.setAlert('Password don`t match', 'danger');
		} else {
			console.log({
				name,
				email,
				password
			});
			authContext.register({
				name,
				email,
				password
			});
		}
		console.log('Register');
	};

	return (
		<div className="form-container">
			<h1>
				Account <span className="text-primary">Registrer</span>
			</h1>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input type="text" name="name" value={name} onChange={onChange} />
				</div>
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
				<div className="form-group">
					<label htmlFor="password2">Confirm password</label>
					<input
						type="password"
						name="password2"
						value={password2}
						onChange={onChange}
					/>
				</div>
				<input
					type="submit"
					value="Register"
					className="btn btn-primary btn-block"
				/>
			</form>
		</div>
	);
};

export default Register;
