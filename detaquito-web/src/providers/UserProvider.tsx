import React, { useEffect } from "react";

// Hooks
import { useDispatch, useSelector } from "react-redux";

// Auth slice
import Auth from "features/Auth/Auth.reducer";

// Selectors
import { selectCurrentUser } from "features/Auth/Auth.selectors";

interface AuthGuardProps {
	children: React.ReactElement;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }: AuthGuardProps) => {
	// Hooks
	const dispatch = useDispatch();

	// Selectors
	const currentUser = useSelector(selectCurrentUser);

	console.log("here");

	// Effects
	useEffect(() => {
		if (!currentUser.id) {
			dispatch(Auth.actions.tryRefreshToken());
		}
	}, [dispatch, currentUser.id]);

	return <>{children}</>;
};

export default React.memo(AuthGuard);
