import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

const Navbar = ({ title, icon }) => {
	const authContext = useContext(AuthContext);
	const contactContext = useContext(ContactContext);

	const { isAuthentificated, user, logout } = authContext;
	const { contactsClear } = contactContext;

	const onLogout = () => {
		logout();
		contactsClear();
	};

	const authLink = (
		<Fragment>
			<li>Hello {user && user.name}</li>
			<li>
				<a href="#!" onClick={onLogout}>
					<i className="fas fa-sign-out-alt" />{' '}
					<span className="hide-sm">Logot</span>
				</a>
			</li>
		</Fragment>
	);

	const guestLink = (
		<Fragment>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</Fragment>
	);

	return (
		<header className="navbar bg-primary">
			<h1>
				<i className={icon} /> {title}
			</h1>
			<ul>{isAuthentificated ? authLink : guestLink}</ul>
		</header>
	);
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string
};

Navbar.defaultProps = {
	title: 'Contact Keeper',
	icon: 'fas fa-id-card-alt'
};

export default Navbar;
