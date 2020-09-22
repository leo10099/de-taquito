import React, { Suspense, lazy } from "react";

// Providers
import { AnimatedRoutes } from "providers";

// Public Routes
const Home = lazy(() => import("features/Home"));
const NotFound = lazy(() => import("features/NotFound"));
const SignUp = lazy(() => import("features/Auth/SignUp"));

const publicRoutes = [
	{ component: Home, path: "/", name: "Home" },
	{ component: SignUp, path: "/auth/signup", name: "SignUp" },
	{ component: NotFound, path: "*", name: "NotFound" },
];

export const Public = () => {
	return (
		<Suspense fallback={false}>
			<AnimatedRoutes exitBeforeEnter={true} routes={publicRoutes} />
		</Suspense>
	);
};
