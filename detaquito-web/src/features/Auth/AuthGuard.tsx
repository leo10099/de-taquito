import React, { useEffect, useMemo } from "react";

// Hooks
import { useDispatch, useSelector } from "react-redux";
import { useInterval } from "hooks";

// Auth slice
import Auth from "features/Auth/Auth.reducer";

// Components
import { Spinner } from "components";

// Selectors
import { selectAccessTokenExpiry, selectCurrentUser } from "features/Auth/Auth.selectors";

interface AuthGuardProps {
	children: React.ReactElement[];
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }: AuthGuardProps) => {
	// Hooks
	const dispatch = useDispatch();

	// Selectors
	const accessTokenExpiry = useSelector(selectAccessTokenExpiry);
	const currentUser = useSelector(selectCurrentUser);

	const aMinuteBeforeTokenExpiry = useMemo(
		() => (accessTokenExpiry ? accessTokenExpiry - 60 * 1000 : 0),
		[accessTokenExpiry]
	);

	// Effects
	useEffect(() => {
		if (!currentUser.id) {
			dispatch(Auth.actions.tryRefreshToken());
		}
	}, [dispatch, currentUser.id]);

	useInterval(() => {
		console.log("started interval...");
		if (accessTokenExpiry && accessTokenExpiry > 0) {
			console.log("entered interval...");
			dispatch(Auth.actions.tryRefreshToken());
		}
	}, aMinuteBeforeTokenExpiry);

	if (!currentUser.id) return <Spinner />;

	return <>{children}</>;
};

export default React.memo(AuthGuard);
