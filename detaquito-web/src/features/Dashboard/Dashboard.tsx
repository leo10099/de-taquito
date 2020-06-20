import React from 'react';

// Hooks
import { useSelector } from 'react-redux';

// Selectors
import { selectCurrentUser } from 'features/Auth/Auth.selectors';

export const Dashboard: React.FC = () => {
	const user = useSelector(selectCurrentUser);

	return <h2>HOLA {user.alias} !</h2>;
};
