import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

// Components
import { FullScreenSpinner } from 'components';

// Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from 'hooks';

// Auth slice
import Auth from 'features/Auth/Auth.reducer';

// Selectors
import { selectAccessTokenExpiry, selectCurrentUser } from 'features/Auth/Auth.selectors';

export const AuthGuard: React.FC = ({ children }) => {
	// Hooks
	const dispatch = useDispatch();

	// Selectors
	const accessTokenExpiry = useSelector(selectAccessTokenExpiry);
	const currentUser = useSelector(selectCurrentUser);

	// Helpers
	const aMinuteBeforeTokenExpiry = useMemo(
		() => accessTokenExpiry && accessTokenExpiry - 60 * 1000,
		[accessTokenExpiry]
	);

	// Effects
	useEffect(() => {
		if (!currentUser.id) {
			dispatch(Auth.actions.tryRefreshToken());
		}
	}, [dispatch, currentUser.id]);

	useInterval(() => {
		console.log('started interval...');
		if (accessTokenExpiry && accessTokenExpiry > 0) {
			console.log('entered interval...');
			dispatch(Auth.actions.tryRefreshToken());
		}
	}, aMinuteBeforeTokenExpiry ?? 60000000);

	if (!currentUser.id) return <FullScreenSpinner />;

	return <>{children} </>;
};

AuthGuard.propTypes = { children: PropTypes.node.isRequired };
