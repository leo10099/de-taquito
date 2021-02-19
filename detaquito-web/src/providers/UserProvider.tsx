import React, { useEffect } from "react";

// Hooks
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

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
	const location = useLocation();

	// Selectors
	const currentUser = useSelector(selectCurrentUser);

	// Effects
	useEffect(() => {
		const isPrivateRotue = location.pathname.includes("/app");
		if (isPrivateRotue && !currentUser.id) {
			dispatch(Auth.actions.tryRefreshToken());
		}
	}, [dispatch, currentUser.id, location.pathname]);

	return <>{children}</>;
};

export default React.memo(AuthGuard);
