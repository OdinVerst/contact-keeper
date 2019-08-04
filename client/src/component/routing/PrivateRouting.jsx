import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';

const PrivateRouting = ({ component: Component, ...rest }) => {
	const authContext = useContext(AuthContext);
	const { isAuthentificated, loading } = authContext;

	return (
		<Route
			{...rest}
			render={props =>
				!isAuthentificated && !loading ? (
					<Redirect to="/login" />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

export default PrivateRouting;
