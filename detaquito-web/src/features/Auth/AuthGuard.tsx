import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import jsonwebtoken from 'jsonwebtoken';

// Components
import { Loader } from 'components/Loader';

// Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from 'hooks';

// Auth slice
import Auth from 'features/Auth/Auth.reducer';

// Selectors
import { selectAccessToken, selectAccessTokenExpiry } from 'features/Auth/Auth.selectors';

// Types
import { DecodedUserToken } from 'typings';

// Styles
import { centeredOnFullHeight } from 'utils';

export const AuthGuard: React.FC = ({ children }) => {
	// Hooks
	const dispatch = useDispatch();

	// Selectors
	const accessToken = useSelector(selectAccessToken);
	const accessTokenExpiry = useSelector(selectAccessTokenExpiry);

	// Helpers
	const aMinuteBeforeTokenExpiry = useMemo(
		() => accessTokenExpiry && accessTokenExpiry - 60 * 1000,
		[accessTokenExpiry]
	);

	// Effects
	useEffect(() => {
		if (accessToken) {
			const userInfo = jsonwebtoken.decode(accessToken) as DecodedUserToken;
			dispatch(Auth.actions.setUserInfo(userInfo));
		} else {
			dispatch(Auth.actions.tryRefreshToken());
		}
	}, [dispatch, accessToken]);

	useInterval(() => {
		console.log('started interval...');
		if (accessTokenExpiry && accessTokenExpiry > 0) {
			console.log('entered interval...');
			dispatch(Auth.actions.tryRefreshToken());
		}
	}, aMinuteBeforeTokenExpiry ?? 60000000);

	if (!accessToken)
		return (
			<div style={centeredOnFullHeight}>
				<Loader />
			</div>
		);

	return <>{children} </>;
};

AuthGuard.propTypes = { children: PropTypes.node.isRequired };
