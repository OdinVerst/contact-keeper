import React, { useReducer } from 'react';
import uuid from 'uuid';

import AlertsContext from './alertsContext';
import alertsReducer from './alertsReduser';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertsState = props => {
	const initialState = [];

	const [state, distpatch] = useReducer(alertsReducer, initialState);

	const setAlert = (msg, type, time = 5000) => {
		const id = uuid.v4();

		distpatch({ type: SET_ALERT, payload: { msg, type, id } });

		setTimeout(() => {
			distpatch({ type: REMOVE_ALERT, payload: id });
		}, time);
	};

	return (
		<AlertsContext.Provider
			value={{
				alerts: state,
				setAlert
			}}
		>
			{props.children}
		</AlertsContext.Provider>
	);
};

export default AlertsState;
