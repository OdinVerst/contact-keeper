import React, { useContext } from 'react';
import AlertsContext from '../../context/alerts/alertsContext';

const Alerts = () => {
	const alertsContext = useContext(AlertsContext);

	return (
		alertsContext.alerts.length > 0 &&
		alertsContext.alerts.map(alert => (
			<div key={alert.id} className={`alert alert-${alert.type}`}>
				<i className="fas fa-info-circle" /> {alert.msg}
			</div>
		))
	);
};

export default Alerts;
